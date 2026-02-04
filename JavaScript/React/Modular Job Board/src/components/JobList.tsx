import React from 'react';
import JobItem from './JobItem';

const JobList = ({
  jobs,
  delJob,
}: {
  jobs: { id: number; name: string; status: string }[];
  delJob: (id: number) => void;
}) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} delJob={delJob} />
      ))}
    </div>
  );
};

export default JobList;

