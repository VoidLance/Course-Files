import React from 'react';
import './JobColumns.css'

interface JobColumnProps {
  title: string; // Add an ID to identify the column
  status: string;
  image: string;
  alt: string;
  onDrop: (itemId: number, targetColumnId: string) => void; // Callback to handle the drop
  children: React.ReactNode;
}

export const JobColumn = ({ status, title, image, alt, onDrop, children }: JobColumnProps) => {
const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Allow dropping by preventing the default behavior
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const itemId = parseInt(event.dataTransfer.getData('text/plain'), 10); // Retrieve the job ID
    onDrop(itemId, status); // Call the onDrop callback with the job ID and target column ID
    console.log(`Dropped ${itemId} on ${status}`)
  };
  return (
    <div className="job-column" onDragOver={handleDragOver} onDrop={handleDrop}>
        <img src={image} alt={alt} className="status-image" />
      <h2 className="heading-status">
        {title}
      </h2>
      {children}
    </div>
  );
};

