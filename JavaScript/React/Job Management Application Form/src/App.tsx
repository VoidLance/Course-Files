import { JobForm } from "./components/JobForm";
import {JobColumn} from './components/JobColumn'
import "./index.css";
import toDoIcon from './images/todoicon.png'
import inProgressIcon from './images/inprogressicon.png'
import completedIcon from './images/completedicon.png'
import React, {useEffect, useState} from 'react'
import {JobStatus} from './components/JobStatus'


export function App() {
  type JobStatusValue = "todo" | "inprogress" | "completed";

  const [items, setItems] = useState(() => {
    // Load data from localStorage on initial render
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : [
      { id: 1, title: "Finish Adding Items", status: "todo", notes: "" },
      { id: 2, title: "Add Items", status: "inprogress", notes: "" },
      { id: 3, title: "Add An Item For Each Column", status: "completed", notes: "" },
    ];
  });

  const [search, setSearch] = useState("");

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // Helper to move item to a specific column
  const moveItemTo = (id: number, targetStatus: JobStatusValue) => {
    setItems(prevItems => prevItems.map(item =>
      item.id === id ? { ...item, status: targetStatus } : item
    ));
  };

  // Handler to add a new item to the To Do column
  const handleAddToDo = (title: string, status: JobStatusValue, notes: string) => {
    setItems(prevItems => [
      ...prevItems,
      {
        id: prevItems.length > 0 ? prevItems[prevItems.length - 1].id + 1 : 1,
        title,
        status,
        notes,
      },
    ]);
  };

  const deleteJob = (id: number) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

const handleDrop = (itemId: number, targetColumnId: string) => {
  moveItemTo(itemId, targetColumnId as JobStatusValue); // Use moveItemTo
    console.log(`Moving ${itemId} to ${targetColumnId}`)
  };

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <JobForm onAdd={handleAddToDo} />
      <div className="job-columns">
        <JobColumn onDrop={handleDrop} status="todo" title="To Do" image={toDoIcon} alt="To Do">
          <ul className="list">
            {items
              .filter(item => item.status === "todo" && item.title.toLowerCase().includes(search.toLowerCase()))
              .map(item => (
                <li key={item.id}>
                <JobStatus item={item} deleteJob={deleteJob} value={item.title} notes={item.notes}>
                  </JobStatus>
                </li>
              ))}
          </ul>
        </JobColumn>
        <JobColumn onDrop={handleDrop} status="inprogress" title="In Progress" image={inProgressIcon} alt="In Progress">
          <ul className="list">
            {items
              .filter(item => item.status === "inprogress" && item.title.toLowerCase().includes(search.toLowerCase()))
              .map(item => (
                <li key={item.id}>
                <JobStatus item={item} deleteJob={deleteJob} value={item.title} notes={item.notes}>
                  </JobStatus>
                </li>
              ))}
          </ul>
        </JobColumn>
        <JobColumn onDrop={handleDrop} status="completed" title="Completed" image={completedIcon} alt="Done">
          <ul className="list">
            {items
              .filter(item => item.status === "completed" && item.title.toLowerCase().includes(search.toLowerCase()))
              .map(item => (
                <li key={item.id}>
                <JobStatus item={item} deleteJob={deleteJob} value={item.title} notes={item.notes}>
                  </JobStatus>
                </li>
              ))}
          </ul>
        </JobColumn>
      </div>
    </div>
  );
}

export default App;
