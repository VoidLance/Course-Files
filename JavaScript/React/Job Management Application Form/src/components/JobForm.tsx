import React, { useEffect, useMemo, useState } from 'react';
import './AppForm.css'

export type JobDetailsInput = {
  name: string;
  status: "todo" | "inprogress" | "completed" | "";
  notes: string;
};

type JobFormProps = {
  onAdd: (title: string, status: "todo" | "inprogress" | "completed", notes: string) => void;
  onAddDetailed?: (details: JobDetailsInput) => void;
  onUpdateDetailed?: (details: JobDetailsInput & { id: number }) => void;
  editingJob?: (JobDetailsInput & { id: number }) | null;
  onCancelEdit?: () => void;
};

const emptyJobDetails: JobDetailsInput = {
  name: "",
  status: "",
  notes: "",
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

  const isFormComplete = useMemo(
    () => Object.values(jobDetails).every((value) => value.trim() !== ""),
    [jobDetails]
  );

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(jobDetails);
    setFormError("");
    setSuccessMessage("");

    if (!isFormComplete) {
      setFormError("Please fill in all fields before submitting.");
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
      onAdd(jobDetails.name, jobDetails.status, jobDetails.notes);
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
        </div>
        <div className="job-form-actions">
          <button
            type="submit"
            className="submit-data"
            disabled={!isFormComplete || hasFieldErrors}
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
