import React, { useState } from 'react';

type JobItemProps = {
  job: { id: number; name: string; status: string };
  delJob: (id: number) => void;
  editJob: (id: number, updatedJob: { name: string; status: string }) => void;
};

const JobItem: React.FC<JobItemProps> = ({ job, delJob, editJob }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState({ name: job.name, status: job.status });

  const handleSave = () => {
    editJob(job.id, editedJob);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedJob.name}
            onChange={(e) => setEditedJob({ ...editedJob, name: e.target.value })}
          />
          <input
            type="text"
            value={editedJob.status}
            onChange={(e) => setEditedJob({ ...editedJob, status: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{job.name}</h3>
          <p>Status: {job.status}</p>
          <button onClick={() => delJob(job.id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};


export default JobItem;

