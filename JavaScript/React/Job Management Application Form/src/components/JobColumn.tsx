import React from 'react';
import './JobColumns.css'

export const JobColumn = ({ title, image, alt, children }) => {
  return (
    <div className="job-column">
        <img src={image} alt={alt} className="status-image" />
      <h2 className="heading-status">
        {title}
      </h2>
      {/* Add content for job items here */}
      {children}
    </div>
  );
};

