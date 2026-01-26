import React from 'react';

const JobBoard = () => {
  const companyName = "Scopt Enterprises";
  const jobCount = 5; // You can change this value to test different scenarios
  const nextWeekJobs = jobCount * 1.5;

  const getJobMessage = (section) => {
    if (section === "Today") {
      if (jobCount === 0) {
      return "No jobs to schedule today."
    }
      else if (jobCount < 6) {
        return `It's a normal day with ${jobCount} jobs from bot.`;
    }
      else {
      return `It's busy today! Jobs running today from bot: ${jobCount}`;
    }
    }
    else if (section === "Next Week") {
      return `Estimated jobs for next week from bot: ${nextWeekJobs}`;
};
};
    return (
      <>
      <div>
      <h1>{companyName}</h1>
      <p>
      {getJobMessage("Today")}
      </p>
      <p>
      {getJobMessage("Next Week")}
      </p>
      </div>
      </>
    );
}

export default JobBoard;
