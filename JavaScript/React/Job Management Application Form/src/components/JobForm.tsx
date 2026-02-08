import React, { useState } from 'react';
import './AppForm.css'

export const JobForm = () => {
  const [jobs, setJobs] = useState([{id:1, name:"Read Emails", status:"running"}, {id: 2, name:"Web Parsing", status:"completed"}, {id:3, name:"Send Emails", status:"stopped"}])

 const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const newJob = {
        id: jobs.length > 0 ? jobs[jobs.length - 1].id + 1 : 1, // Increment the last item's id or start at 1
        name: formData.get('name') as string,
        status: formData.get('status') as string,
    };

    setJobs((prevJobs) => [...prevJobs, newJob]);
    (event.target as HTMLFormElement).reset();
};


  return (
    <div className="form-header">
    <form onSubmit={handleSubmit}>
    <input type="text" className="bot-input" name='name' placeholder="Enter the job to add" required />
    <div className="form-details">
    <div className="bottom-line">
    {jobs.map((id) => (<button className="tag" key={id.id} type="button" onClick={()=>console.log(id.status)}>{id.name}</button>))}
    </div>
    <select className="job-status" name='job-status' required>
    <option value="running">Running</option>
    <option value="completed">Completed</option>
    <option value="stopped">Stopped</option>
    </select>
    </div>
    <button type="submit" className="submit-data">Add Job</button>
    </form>
    </div>
  );
};
