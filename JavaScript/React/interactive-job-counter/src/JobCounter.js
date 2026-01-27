import React, { useState } from 'react';

const JobCounter = () => {
  let [jobCount, setJobCount] = useState(0);

  const handleAddJob = () => {
    setJobCount((prevJobCount) => prevJobCount + 1);
    console.log(`run job: ${jobCount}`);
    return jobCount;
  };

  return (
    <>
    <div>
      <h1>Job Counter</h1>
      <p>Current Jobs: {jobCount}</p>
      <button onClick={handleAddJob}>Add Job</button>
    </div>
    </>
  );
};

export default JobCounter;
