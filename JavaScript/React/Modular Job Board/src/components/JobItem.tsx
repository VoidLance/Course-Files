import React from 'react';

const JobItem = ({ job, delJob }: { job: { id: number; name: string; status: string }; delJob: (id: number) => void;  }) => {
  // Conditional class based on job status
  const statusClass = job.status === 'completed' ? 'job-completed' : job.status === 'running' ? 'job-running' : job.status === 'stopped' ? 'job-stopped' : 'job-pending';


  return (
    <div className={`job-item ${statusClass}`}>
      <h3>{job.name}</h3>
      <p>Status: {job.status}</p>
      <button onClick={() => delJob(job.id)}>Delete</button>
    </div>
  );
};

export default JobItem;

