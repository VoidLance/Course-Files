import React, { useState } from 'react';
import type { ReactNode } from 'react';
import deleteIcon from '../images/deleteicon.png';
import './JobStatus.css';
import { FormButton } from './FormButton';

interface JobStatusProps {
  item: { id: number };
  value: string;
  notes?: string;
  categories?: string[];
  statusLabel?: string;
  deleteJob: (id: number) => void;
  timestamp?: number;
  children?: ReactNode;
}
export const JobStatus = ({
  item,
  value,
  notes,
  categories = [],
  statusLabel,
  deleteJob,
  timestamp,
  children,
}: JobStatusProps) => {
  const [showNotes, setShowNotes] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(value);
  const [editNotes, setEditNotes] = useState(notes || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text/plain', item.id.toString());
    event.dataTransfer.effectAllowed = 'move';
    console.log(`Dragging: ${item.id}`);
  };

  return (
    <div draggable="true" className="jobBox" onDragStart={handleDragStart}>
      <div className="jobStatBox">
        <article className="jobStateArt">
          {timestamp && (
            <div className="job-timestamp">
              <small>
                {new Date(timestamp).toLocaleString()}
              </small>
            </div>
          )}
          {editing ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="job-edit-title"
              />
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="job-edit-notes"
                rows={2}
              />
              <button
                type="button"
                className="job-edit-save"
                onClick={() => {
                  setEditing(false);
                  // TODO: Call update handler from parent
                }}
              >
                Save
              </button>
              <button
                type="button"
                className="job-edit-cancel"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="job-title-btn"
                onClick={() => setShowNotes((prev) => !prev)}
              >
                {value}
              </button>
              <button
                type="button"
                className="job-edit"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            </>
          )}
        </article>
        {statusLabel ? (
          <span className="jobStatusTag">{statusLabel}</span>
        ) : null}
        {categories.length > 0 ? (
          <div className="jobCategories">
            {categories.map((category) => (
              <span key={category} className="jobCategoryTag">
                {category}
              </span>
            ))}
          </div>
        ) : null}
        {notes ? (
          <div className="jobNotesWrap">
            <button
              type="button"
              className="jobNotesToggle"
              onClick={() => setShowNotes((prev) => !prev)}
            >
              {showNotes ? 'Hide notes' : 'Show notes'}
            </button>
            {showNotes ? <p className="jobNotes">{notes}</p> : null}
          </div>
        ) : null}
      </div>
      <div className="job-actions">
        {children}
        <div className="jobDelete">
          {showDeleteConfirm ? (
            <div className="job-delete-confirm">
              <span>Are you sure you want to delete this job?</span>
              <button
                type="button"
                className="job-delete-yes"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  deleteJob(item.id);
                }}
              >
                Yes
              </button>
              <button
                type="button"
                className="job-delete-no"
                onClick={() => setShowDeleteConfirm(false)}
              >
                No
              </button>
            </div>
          ) : (
            <img
              onClick={() => setShowDeleteConfirm(true)}
              src={deleteIcon}
              alt="delete item"
            />
          )}
        </div>
      </div>
    </div>
  );
};
