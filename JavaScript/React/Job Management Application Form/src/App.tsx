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

  const getStatusLabel = (status: JobStatusValue) => {
    switch (status) {
      case "todo":
        return "To Do";
      case "inprogress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('items');
    const baseItems = savedItems
      ? JSON.parse(savedItems)
      : [
          { id: 1, title: "Finish Adding Items", status: "todo", notes: "", categories: [] },
          { id: 2, title: "Add Items", status: "inprogress", notes: "", categories: [] },
          { id: 3, title: "Add An Item For Each Column", status: "completed", notes: "", categories: [] },
        ];
    return baseItems.map((item: { categories?: string[] }) => ({
      ...item,
      categories: Array.isArray(item.categories) ? item.categories : [],
    }));
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const moveItemTo = (id: number, targetStatus: JobStatusValue) => {
    setItems(prevItems => prevItems.map(item =>
      item.id === id ? { ...item, status: targetStatus } : item
    ));
  };

  const handleAddToDo = (
    title: string,
    status: JobStatusValue,
    notes: string,
    categories: string[]
  ) => {
    setItems(prevItems => [
      ...prevItems,
      {
        id: prevItems.length > 0 ? prevItems[prevItems.length - 1].id + 1 : 1,
        title,
        status,
        notes,
        categories,
      },
    ]);
  };

  const deleteJob = (id: number) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

const handleDrop = (itemId: number, targetColumnId: string) => {
  moveItemTo(itemId, targetColumnId as JobStatusValue);
    console.log(`Moving ${itemId} to ${targetColumnId}`)
  };

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search jobs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          type="button"
          className="search-clear"
          onClick={() => setSearch("")}
          disabled={!search}
        >
          Clear
        </button>
      </div>
      <JobForm onAdd={handleAddToDo} />
      <div className="job-columns">
        <JobColumn onDrop={handleDrop} status="todo" title="To Do" image={toDoIcon} alt="To Do">
          <ul className="list">
            {items
              .filter(item => {
                if (item.status !== "todo") {
                  return false;
                }
                const query = search.toLowerCase();
                if (!query) {
                  return true;
                }
                const matchesTitle = item.title.toLowerCase().includes(query);
                const matchesNotes = (item.notes || "").toLowerCase().includes(query);
                const matchesCategories = (item.categories || []).some((category: string) =>
                  category.toLowerCase().includes(query)
                );
                const matchesStatus = item.status.toLowerCase().includes(query);
                const matchesStatusLabel = getStatusLabel(item.status).toLowerCase().includes(query);
                return (
                  matchesTitle ||
                  matchesNotes ||
                  matchesCategories ||
                  matchesStatus ||
                  matchesStatusLabel
                );
              })
              .map(item => (
                <li key={item.id}>
                <JobStatus
                  item={item}
                  deleteJob={deleteJob}
                  value={item.title}
                  notes={item.notes}
                  categories={item.categories}
                  statusLabel={getStatusLabel(item.status)}
                >
                  </JobStatus>
                </li>
              ))}
          </ul>
        </JobColumn>
        <JobColumn onDrop={handleDrop} status="inprogress" title="In Progress" image={inProgressIcon} alt="In Progress">
          <ul className="list">
            {items
              .filter(item => {
                if (item.status !== "inprogress") {
                  return false;
                }
                const query = search.toLowerCase();
                if (!query) {
                  return true;
                }
                const matchesTitle = item.title.toLowerCase().includes(query);
                const matchesNotes = (item.notes || "").toLowerCase().includes(query);
                const matchesCategories = (item.categories || []).some((category: string) =>
                  category.toLowerCase().includes(query)
                );
                const matchesStatus = item.status.toLowerCase().includes(query);
                const matchesStatusLabel = getStatusLabel(item.status).toLowerCase().includes(query);
                return (
                  matchesTitle ||
                  matchesNotes ||
                  matchesCategories ||
                  matchesStatus ||
                  matchesStatusLabel
                );
              })
              .map(item => (
                <li key={item.id}>
                <JobStatus
                  item={item}
                  deleteJob={deleteJob}
                  value={item.title}
                  notes={item.notes}
                  categories={item.categories}
                  statusLabel={getStatusLabel(item.status)}
                >
                  </JobStatus>
                </li>
              ))}
          </ul>
        </JobColumn>
        <JobColumn onDrop={handleDrop} status="completed" title="Completed" image={completedIcon} alt="Done">
          <ul className="list">
            {items
              .filter(item => {
                if (item.status !== "completed") {
                  return false;
                }
                const query = search.toLowerCase();
                if (!query) {
                  return true;
                }
                const matchesTitle = item.title.toLowerCase().includes(query);
                const matchesNotes = (item.notes || "").toLowerCase().includes(query);
                const matchesCategories = (item.categories || []).some((category: string) =>
                  category.toLowerCase().includes(query)
                );
                const matchesStatus = item.status.toLowerCase().includes(query);
                const matchesStatusLabel = getStatusLabel(item.status).toLowerCase().includes(query);
                return (
                  matchesTitle ||
                  matchesNotes ||
                  matchesCategories ||
                  matchesStatus ||
                  matchesStatusLabel
                );
              })
              .map(item => (
                <li key={item.id}>
                <JobStatus
                  item={item}
                  deleteJob={deleteJob}
                  value={item.title}
                  notes={item.notes}
                  categories={item.categories}
                  statusLabel={getStatusLabel(item.status)}
                >
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
