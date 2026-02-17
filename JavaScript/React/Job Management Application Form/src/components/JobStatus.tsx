import React, { useState } from 'react';
import type { ReactNode } from 'react';
import deleteIcon from '../images/deleteicon.png';
import './JobStatus.css';
import {FormButton} from './FormButton'


interface JobStatusProps {
  item: { id: number };
  value: string;
  notes?: string;
  categories?: string[];
  statusLabel?: string;
  deleteJob: (id: number) => void;
  children?: ReactNode;
}


export const JobStatus = ({
  item,
  value,
  notes,
  categories = [],
  statusLabel,
  deleteJob,
  children,
}: JobStatusProps) => {
  const [showNotes, setShowNotes] = useState(false);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text/plain', item.id.toString());
    event.dataTransfer.effectAllowed = 'move';
    console.log(`Dragging: ${item.id}`)
  };

  return (
    <div draggable="true" className="jobBox" onDragStart={handleDragStart}>
    <div className="jobStatBox">
    <article className="jobStateArt">
    <FormButton value={value}/>
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
          {showNotes ? "Hide notes" : "Show notes"}
        </button>
        {showNotes ? <p className="jobNotes">{notes}</p> : null}
      </div>
    ) : null}
    </div>
      <div className="job-actions">
        {children}
        <div className="jobDelete">
    <img onClick={() => deleteJob(item.id)} src={deleteIcon} alt="delete item" />
    </div>
    </div>
    </div>
  );
};
