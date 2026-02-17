import { JobForm } from './components/JobForm';
import { JobColumn } from './components/JobColumn';
import './index.css';
import toDoIcon from './images/todoicon.png';
import inProgressIcon from './images/inprogressicon.png';
import completedIcon from './images/completedicon.png';
import React, { useEffect, useState } from 'react';
import { JobStatus } from './components/JobStatus';

// JobManager component (formerly App)
export function App() {
  type JobStatusValue = 'todo' | 'inprogress' | 'completed';
  interface Job {
    id: number;
    title: string;
    status: JobStatusValue;
    notes: string;
    categories: string[];
    timestamp: number;
  }

  const getStatusLabel = (status: JobStatusValue) => {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'inprogress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  // Task 3: Retrieve jobs from localStorage on mount
  const [jobs, setJobs] = useState<Job[]>(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [search, setSearch] = useState('');

  // Task 4: Save jobs to localStorage whenever jobs state changes
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  // Move job to another status
  const moveJobTo = (id: number, targetStatus: JobStatusValue) => {
    setJobs((prevJobs: Job[]) =>
      prevJobs.map((job: Job) =>
        job.id === id ? { ...job, status: targetStatus } : job,
      ),
    );
  };

  // Task 5: Add job using current jobs state
  const addJob = (
    title: string,
    status: JobStatusValue,
    notes: string,
    categories: string[],
  ) => {
    const now = Date.now();
    setJobs((prevJobs: Job[]) => [
      ...prevJobs,
      {
        id: now,
        title,
        status,
        notes,
        categories,
        timestamp: now,
      },
    ]);
  };

  // Task 6: Delete job using current jobs state
  const deleteJob = (jobId: number) => {
    setJobs((prevJobs: Job[]) => prevJobs.filter((job: Job) => job.id !== jobId));
  };

  // Drag and drop handler (bonus)
  const handleDrop = (jobId: number, targetColumnId: string) => {
    moveJobTo(jobId, targetColumnId as JobStatusValue);
    console.log(`Moving ${jobId} to ${targetColumnId}`);
  };

  // Task 7: Clear all jobs and localStorage
  const clearAllJobs = () => {
    setJobs([]);
    localStorage.removeItem('jobs');
  };


  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          className="search-clear"
          onClick={() => setSearch('')}
          disabled={!search}
        >
          Clear
        </button>
        {/* Task 8: Clear All Jobs button */}
        <button
          type="button"
          className="clear-all"
          onClick={clearAllJobs}
          disabled={jobs.length === 0}
        >
          Clear All Jobs
        </button>
      </div>
      <JobForm onAdd={addJob} />
      <div className="job-columns">
        <JobColumn
          onDrop={handleDrop}
          status="todo"
          title="To Do"
          image={toDoIcon}
          alt="To Do"
        >
          <ul className="list">
            {jobs
              .filter((job) => {
                if (job.status !== 'todo') {
                  return false;
                }
                const query = search.toLowerCase();
                if (!query) {
                  return true;
                }
                const matchesTitle = job.title.toLowerCase().includes(query);
                const matchesNotes = (job.notes || '')
                  .toLowerCase()
                  .includes(query);
                const matchesCategories = (job.categories || []).some(
                  (category: string) => category.toLowerCase().includes(query),
                );
                const matchesStatus = job.status.toLowerCase().includes(query);
                const matchesStatusLabel = getStatusLabel(job.status)
                  .toLowerCase()
                  .includes(query);
                return (
                  matchesTitle ||
                  matchesNotes ||
                  matchesCategories ||
                  matchesStatus ||
                  matchesStatusLabel
                );
              })
              .sort((a, b) => a.timestamp - b.timestamp)
              .map((job) => (
                <li key={job.id}>
                  <JobStatus
                    item={job}
                    deleteJob={deleteJob}
                    value={job.title}
                    notes={job.notes}
                    categories={job.categories}
                    statusLabel={getStatusLabel(job.status)}
                    timestamp={job.timestamp}
                  ></JobStatus>
                </li>
              ))}
          </ul>
        </JobColumn>
        <JobColumn
          onDrop={handleDrop}
          status="inprogress"
          title="In Progress"
          image={inProgressIcon}
          alt="In Progress"
        >
          <ul className="list">
            {jobs
              .filter((job) => {
                if (job.status !== 'inprogress') {
                  return false;
                }
                const query = search.toLowerCase();
                if (!query) {
                  return true;
                }
                const matchesTitle = job.title.toLowerCase().includes(query);
                const matchesNotes = (job.notes || '')
                  .toLowerCase()
                  .includes(query);
                const matchesCategories = (job.categories || []).some(
                  (category: string) => category.toLowerCase().includes(query),
                );
                const matchesStatus = job.status.toLowerCase().includes(query);
                const matchesStatusLabel = getStatusLabel(job.status)
                  .toLowerCase()
                  .includes(query);
                return (
                  matchesTitle ||
                  matchesNotes ||
                  matchesCategories ||
                  matchesStatus ||
                  matchesStatusLabel
                );
              })
              .sort((a, b) => a.timestamp - b.timestamp)
              .map((job) => (
                <li key={job.id}>
                  <JobStatus
                    item={job}
                    deleteJob={deleteJob}
                    value={job.title}
                    notes={job.notes}
                    categories={job.categories}
                    statusLabel={getStatusLabel(job.status)}
                    timestamp={job.timestamp}
                  ></JobStatus>
                </li>
              ))}
          </ul>
        </JobColumn>
        <JobColumn
          onDrop={handleDrop}
          status="completed"
          title="Completed"
          image={completedIcon}
          alt="Done"
        >
          <ul className="list">
            {jobs
              .filter((job) => {
                if (job.status !== 'completed') {
                  return false;
                }
                const query = search.toLowerCase();
                if (!query) {
                  return true;
                }
                const matchesTitle = job.title.toLowerCase().includes(query);
                const matchesNotes = (job.notes || '')
                  .toLowerCase()
                  .includes(query);
                const matchesCategories = (job.categories || []).some(
                  (category: string) => category.toLowerCase().includes(query),
                );
                const matchesStatus = job.status.toLowerCase().includes(query);
                const matchesStatusLabel = getStatusLabel(job.status)
                  .toLowerCase()
                  .includes(query);
                return (
                  matchesTitle ||
                  matchesNotes ||
                  matchesCategories ||
                  matchesStatus ||
                  matchesStatusLabel
                );
              })
              .sort((a, b) => a.timestamp - b.timestamp)
              .map((job) => (
                <li key={job.id}>
                  <JobStatus
                    item={job}
                    deleteJob={deleteJob}
                    value={job.title}
                    notes={job.notes}
                    categories={job.categories}
                    statusLabel={getStatusLabel(job.status)}
                    timestamp={job.timestamp}
                  ></JobStatus>
                </li>
              ))}
          </ul>
        </JobColumn>
      </div>
    </div>
  );
}

export default App;
