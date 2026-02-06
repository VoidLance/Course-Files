import React from 'react';
import JobItem from './JobItem';


type JobListProps = {
  jobs: { id: number; name: string; status: string }[];
  delJob: (id: number) => void;
  editJob: (id: number, updatedJob: { name: string; status: string }) => void;
  filterStatus: string | null;
  updateFilter: (status: string | null) => void;
};

const JobList: React.FC<JobListProps> = ({ jobs, delJob, editJob, filterStatus, updateFilter }) => {
  // Filter jobs based on the filterStatus
  const filteredJobs = filterStatus
    ? jobs.filter((job) => job.status === filterStatus)
    : jobs;

  return (
    <div>
      {/* Filter Dropdown */}
      <div>
        <label htmlFor="filter">Filter by Status:</label>
        <select
          id="filter"
          value={filterStatus || ''}
          onChange={(e) => updateFilter(e.target.value || null)}
        >
          <option value="">All</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Render Filtered Jobs */}
      {filteredJobs.map((job) => (
        <JobItem key={job.id} job={job} delJob={delJob} editJob={editJob} />
      ))}
    </div>
  );
};

export default JobList;

