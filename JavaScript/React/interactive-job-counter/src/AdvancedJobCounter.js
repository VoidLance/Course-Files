import React, { useState } from 'react';

const AdvancedJobCounter = () => {
  const [jobCount, setJobCount] = useState(0);
  const [jobList, setJobList] = useState([]);

  const handleAddJob = () => {
    const newJobId = jobCount + 1;
    setJobCount(newJobId);
    setJobList([...jobList, `Job ${newJobId}`]);
    console.log(`Added job: Job ${newJobId}`);
  };

  const handleRemoveJob = (index) => {
    const newJobList = jobList.filter((_, i) => i !== index);
    setJobList(newJobList);
    setJobCount(newJobList.length);
    console.log(`Removed job at index: ${index}`);
  };

  const resetJobs = () => {
    setJobList([]);
    setJobCount(0);
    console.log('Reset all jobs');
  };

  const messageToSend = () => {
    if (jobCount === 0) {
      return 'No jobs available.';
    }
    else if (jobCount < 5) {
      return `You have a few jobs: ${jobCount}`;
    } else {
      return `You have many jobs: ${jobCount}`;
    }
  };

  const [environment, setEnvironment] = useState('Development');

  const envSwitch = () => {
    const newEnv = environment === 'Development' ? 'Production' : 'Development';
    setEnvironment(newEnv);
    console.log(`Switched environment to: ${newEnv}`);
  };

   return (
    <div>
     <h2>Current Environment: {environment}</h2>
      <h1>Advanced Job Counter</h1>
      <p>{messageToSend()}</p>
      <button onClick={handleAddJob}>Add Job</button>
    <button onClick={resetJobs}>Reset Jobs</button>
    <button onClick={envSwitch}>Switch Environment</button>
      <ul>
        {jobList.map((job, index) => (
          <li key={index}>
            {job} <button onClick={() => handleRemoveJob(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvancedJobCounter;
