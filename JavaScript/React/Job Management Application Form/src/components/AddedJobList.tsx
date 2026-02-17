import React, { useState } from 'react';
import type { JobDetailsInput } from './JobForm';
import './AddedJobList.css';

type JobStatusValue = 'todo' | 'inprogress' | 'completed';

type AddedJob = JobDetailsInput & { id: number; status: JobStatusValue };

type AddedJobListProps = {
  jobs: AddedJob[];
  onUpdate: (job: AddedJob) => void;
  onDelete: (id: number) => void;
};

export const AddedJobList: React.FC<AddedJobListProps> = ({
  jobs,
  onUpdate,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<AddedJob | null>(null);
  const [error, setError] = useState('');

  const startEdit = (job: AddedJob) => {
    setEditingId(job.id);
    setDraft({ ...job });
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(null);
    setError('');
  };

  const handleDraftChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (!draft) {
      return;
    }

    const { name, value } = event.target;
    setDraft((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSave = () => {
    if (!draft) {
      return;
    }

    if (draft.name.trim().length < 3) {
      setError('Job title must be at least 3 characters long.');
      return;
    }

    if (!draft.status) {
      setError('Please choose a status before saving.');
      return;
    }

    onUpdate(draft);
    setEditingId(null);
    setDraft(null);
    setError('');
  };

  if (jobs.length === 0) {
    return null;
  }

  return (
    <div className="added-job-list">
      <h3 className="added-job-heading">Added Jobs</h3>
      <ul className="added-job-items">
        {jobs.map((job) => (
          <li key={job.id} className="added-job-item">
            {editingId === job.id && draft ? (
              <div className="added-job-edit">
                {error && <div className="added-job-error">{error}</div>}
                <input
                  type="text"
                  className="added-job-input"
                  name="name"
                  value={draft.name}
                  onChange={handleDraftChange}
                />
                <select
                  className="added-job-input"
                  name="status"
                  value={draft.status}
                  onChange={handleDraftChange}
                >
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <textarea
                  className="added-job-input"
                  name="notes"
                  value={draft.notes}
                  onChange={handleDraftChange}
                  rows={2}
                />
                <div className="added-job-actions">
                  <button
                    type="button"
                    className="added-job-button"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="added-job-button"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="added-job-view">
                <div className="added-job-title">{job.name}</div>
                <div className="added-job-notes">{job.notes}</div>
                <div className="added-job-actions">
                  <button
                    type="button"
                    className="added-job-button"
                    onClick={() => startEdit(job)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="added-job-button"
                    onClick={() => onDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
