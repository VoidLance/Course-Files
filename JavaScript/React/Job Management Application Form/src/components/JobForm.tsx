import React, { useEffect, useMemo, useState } from 'react';
import './AppForm.css'
import { FormButton } from './FormButton';
import { useCategorySelection } from './useCategorySelection';

type JobCategory = "Read Emails" | "Send Emails" | "Parse Web";

const CATEGORY_OPTIONS: JobCategory[] = ["Read Emails", "Send Emails", "Parse Web"];

export type JobDetailsInput = {
  name: string;
  status: "todo" | "inprogress" | "completed" | "";
  notes: string;
  categories: JobCategory[];
};

type JobFormProps = {
  onAdd: (
    title: string,
    status: "todo" | "inprogress" | "completed",
    notes: string,
    categories: JobCategory[]
  ) => void;
  onAddDetailed?: (details: JobDetailsInput) => void;
  onUpdateDetailed?: (details: JobDetailsInput & { id: number }) => void;
  editingJob?: (JobDetailsInput & { id: number }) | null;
  onCancelEdit?: () => void;
};

const emptyJobDetails: JobDetailsInput = {
  name: "",
  status: "",
  notes: "",
  categories: [],
};

export const JobForm: React.FC<JobFormProps> = ({
  onAdd,
  onAddDetailed,
  onUpdateDetailed,
  editingJob,
  onCancelEdit,
}) => {
  const [jobDetails, setJobDetails] = useState<JobDetailsInput>(emptyJobDetails);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof JobDetailsInput, string>>>({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = categorySearch.trim().toLowerCase();
    if (!query) {
      return CATEGORY_OPTIONS;
    }
    return CATEGORY_OPTIONS.filter((category) => category.toLowerCase().includes(query));
  }, [categorySearch]);

  const setSelectedCategories = (
    updater: JobCategory[] | ((prev: JobCategory[]) => JobCategory[])
  ) => {
    setJobDetails((prev) => {
      const nextCategories =
        typeof updater === "function" ? updater(prev.categories) : updater;
      return { ...prev, categories: nextCategories };
    });
  };

  const {
    handleCategoryToggle,
    clearCategories,
    isSelected,
    canSelectMore,
    maxSelected,
  } = useCategorySelection({
    selectedCategories: jobDetails.categories,
    setSelectedCategories,
    maxSelected: 3,
  });

  const isFormComplete = useMemo(() => {
    return (
      jobDetails.name.trim() !== "" &&
      jobDetails.status.trim() !== "" &&
      jobDetails.notes.trim() !== ""
    );
  }, [jobDetails]);

  const hasCategories = jobDetails.categories.length > 0;

  const hasFieldErrors = useMemo(
    () => Object.values(fieldErrors).some(Boolean),
    [fieldErrors]
  );

  useEffect(() => {
    if (editingJob) {
      setJobDetails({
        name: editingJob.name,
        status: editingJob.status,
        notes: editingJob.notes,
        categories: editingJob.categories ?? [],
      });
      setFieldErrors({});
      setFormError("");
      setSuccessMessage("");
    }
  }, [editingJob]);

  const resetForm = () => {
    setJobDetails(emptyJobDetails);
    setFieldErrors({});
    setFormError("");
  };

  const getFieldError = (field: keyof JobDetailsInput, value: string) => {
    if (field === "name" && value.trim().length > 0 && value.trim().length < 3) {
      return "Job title must be at least 3 characters long.";
    }
    return "";
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setJobDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    const fieldName = name as keyof JobDetailsInput;
    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: getFieldError(fieldName, value),
    }));
  };

  const selectCategory = (cat: JobCategory) => {
    if (jobDetails.categories.some((item) => item === cat))
      handleCategoryToggle(cat);
    else {
      if (!canSelectMore) {
        setFormError(`You can select up to ${maxSelected} categories.`);
        return;
      }
      handleCategoryToggle(cat);
    }
    setFormError("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(jobDetails);
    setFormError("");
    setSuccessMessage("");

    if (!isFormComplete) {
      setFormError("Please fill in all fields before submitting.");
      return;
    }

    if (!hasCategories) {
      setFormError("Please select at least one category before submitting.");
      return;
    }

    if (hasFieldErrors) {
      setFormError("Please fix the errors before submitting.");
      return;
    }

    if (editingJob && onUpdateDetailed) {
      onUpdateDetailed({ ...jobDetails, id: editingJob.id });
      setSuccessMessage("Job updated successfully.");
      if (onCancelEdit) {
        onCancelEdit();
      }
      resetForm();
      return;
    }

    if (jobDetails.status) {
      onAdd(jobDetails.name, jobDetails.status, jobDetails.notes, jobDetails.categories);
    }
    if (onAddDetailed) {
      onAddDetailed(jobDetails);
    }
    setSuccessMessage("Job added successfully.");
    resetForm();
  };

  return (
    <div className="form-header">
      <form onSubmit={handleSubmit}>
        {successMessage && <div className="form-success">{successMessage}</div>}
        {formError && <div className="form-error">{formError}</div>}
        <div className="form-grid">
          <div className="form-field">
            <input
              type="text"
              className="bot-input"
              name="name"
              placeholder="Enter the job to add"
              value={jobDetails.name}
              onChange={handleInputChange}
              required
            />
            {fieldErrors.name && <div className="field-error">{fieldErrors.name}</div>}
          </div>
          <div className="form-field">
            <select
              className="bot-input"
              name="status"
              value={jobDetails.status}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="form-field">
            <textarea
              className="bot-input"
              name="notes"
              placeholder="Notes"
              value={jobDetails.notes}
              onChange={handleInputChange}
              rows={3}
              required
            />
          </div>
          <div className="form-field">
            <input
              type="text"
              className="bot-input category-search"
              placeholder="Search categories..."
              value={categorySearch}
              onChange={(event) => setCategorySearch(event.target.value)}
            />
            <div className="category-list">
              {filteredCategories.map((category) => (
                <FormButton
                  key={category}
                  value={category}
                  selectCategory={selectCategory}
                  isSelected={isSelected(category)}
                  disabled={!isSelected(category) && !canSelectMore}
                />
              ))}
            </div>
            {jobDetails.categories.length > 0 && (
              <div className="category-summary">
                <div className="category-summary-title">Selected categories:</div>
                <div className="category-tags">
                  {jobDetails.categories.map((category) => (
                    <span key={category} className="category-tag">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="category-actions">
              <button
                type="button"
                className="category-clear"
                onClick={() => {
                  clearCategories();
                  setFormError("");
                }}
                disabled={jobDetails.categories.length === 0}
              >
                Clear Categories
              </button>
              <div className="category-limit">Max {maxSelected} selections</div>
            </div>
          </div>
        </div>
        <div className="job-form-actions">
          <button
            type="submit"
            className="submit-data"
            disabled={!isFormComplete || !hasCategories || hasFieldErrors}
          >
            {editingJob ? "Update Job" : "Add to To Do"}
          </button>
          {editingJob && (
            <button
              type="button"
              className="cancel-edit"
              onClick={() => {
                if (onCancelEdit) {
                  onCancelEdit();
                }
                resetForm();
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
