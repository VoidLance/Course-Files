import React from 'react';
import type { ReactNode } from 'react'; // Use type-only import
import deleteIcon from '../images/deleteicon.png';
import './JobStatus.css';
import {FormButton} from './FormButton'


interface JobStatusProps {
  item: object;
  value: string;
  deleteJob: (id: number) => void;
  children?: ReactNode; // Add children prop
}


export const JobStatus = ({item, value, deleteJob, children }: JobStatusProps) => {

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text/plain', item.id.toString()); // Store the job ID in the dataTransfer object
    event.dataTransfer.effectAllowed = 'move'; // Indicate the drag action is a move
    console.log(`Dragging: ${item.id}`)
  };

  return (
    <div draggable="true" className="jobBox" onDragStart={handleDragStart}>
    <div className="jobStatBox">
    <article className="jobStateArt">
    <FormButton value={value}/>
    </article>
    </div>
      <div className="job-actions">
        {children} {/* Render children here */}
        <div className="jobDelete">
    <img onClick={() => deleteJob(item.id)} src={deleteIcon} alt="delete item" />
    </div>
    </div>
    </div>
  );
};
