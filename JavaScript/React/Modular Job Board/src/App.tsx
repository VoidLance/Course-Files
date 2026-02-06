import React, { useState } from 'react';
import Header from './components/Header';
import JobList from './components/JobList';
import Footer from './components/Footer';
import './index.css';


export const App = () => {
  const [jobs, setJobs] = useState([{ id: 1, name: 'Email Extractor', status: 'running' },
    { id: 2, name: 'Data Analyzer', status: 'completed' },
    { id: 3, name: 'Report Generator', status: 'running' }
  ])

  const [newJob, setNewJob] = useState({ name: '', status: 'running' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewJob((prevJob) => ({ ...prevJob, [name]: value }));
  };

  const addJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (newJob.name.trim() === '') return; // Prevent adding empty jobs

    const newJobEntry = {
      id: jobs.length + 1, // Generate a new ID
      name: newJob.name,
      status: newJob.status,
    };

    setJobs((prevJobs) => [...prevJobs, newJobEntry]);
    setNewJob({ name: '', status: 'running' }); // Reset the form
  };

const delJob = (id: number) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const editJob = (id: number, updatedJob: { name: string; status: string }) => {
  setJobs((prevJobs) =>
    prevJobs.map((job) =>
      job.id === id ? { ...job, ...updatedJob } : job
    )
  );
};

const [show, setShow] = useState(false)
const [filterStatus, setFilterStatus] = useState<string | null>(null);

// Add this function to update the filter
const updateFilter = (status: string | null) => {
  setFilterStatus(status);
};


  return (
    <div className="app">
      <Header />
        <form onSubmit={addJob} className="add-job-form">
        <input
          type="text"
          name="name"
          value={newJob.name}
          onChange={handleInputChange}
          placeholder="Job Name"
          required
        />
        <select name="status" value={newJob.status} onChange={handleInputChange}>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Add Job</button>
      </form>

      <button onClick={()=> setShow(!show)}>Show/Hide</button>
      {show && (<JobList
        jobs={jobs}
        delJob={delJob}
        editJob={editJob}
        filterStatus={filterStatus}
        updateFilter={updateFilter}
      />)}
    <Footer />
    </div>
  );
};

