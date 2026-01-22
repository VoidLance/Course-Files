import React from 'react';
import { useState } from 'react';

const CreateJob = ({jobs}) => {
  let [dummy, setDummy] = useState(0); // Dummy state to force re-render
  const jobCount = jobs.length;
  const countJob = () => {
    return jobCount === 0 ? 'No Jobs Available' : `Jobs running today: ${jobCount}`;
  };

const JobBackend = (newJob) => {
  // Backend logic for job creation would go here
   jobs.push(newJob); // Add the new job to the ordinary array
    renderPage(); // Manually trigger a re-render
  console.log('Job created:', newJob);
  };

  const renderPage = () => {
   setDummy([dummy + jobs.id]); // Update dummy state to force re-render
    console.log('Page re-rendered to reflect new job.', dummy);
  };

  const handleCreateJob = (jobTitle) => {
    const newJob = { id: jobs.length + 1, title: jobTitle };
    JobBackend(newJob);
  };

  return (
    <div>
     <h1>Available Jobs: {countJob()}</h1>
      <button onClick={() => handleCreateJob((Math.floor(Math.random() * 100)).toString())}>Create Job</button>
    <p>Create a Job</p>
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>{job.title}</li>
      ))}
    </ul>
    </div>
  );
};

export default CreateJob;
