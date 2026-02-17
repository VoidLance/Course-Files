import React from 'react';
import './JobColumns.css';

interface JobColumnProps {
  title: string;
  status: string;
  image: string;
  alt: string;
  onDrop: (itemId: number, targetColumnId: string) => void;
  children: React.ReactNode;
}

export const JobColumn = ({
  status,
  title,
  image,
  alt,
  onDrop,
  children,
}: JobColumnProps) => {
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const itemId = parseInt(event.dataTransfer.getData('text/plain'), 10);
    onDrop(itemId, status);
    console.log(`Dropped ${itemId} on ${status}`);
  };
  return (
    <div className="job-column" onDragOver={handleDragOver} onDrop={handleDrop}>
      <img src={image} alt={alt} className="status-image" />
      <h2 className="heading-status">{title}</h2>
      {children}
    </div>
  );
};
