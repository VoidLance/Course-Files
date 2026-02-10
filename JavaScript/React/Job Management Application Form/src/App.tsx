import { JobForm } from "./components/JobForm";
import {JobColumn} from './components/JobColumn'
import "./index.css";
import toDoIcon from './images/todoicon.png'
import inProgressIcon from './images/inprogressicon.png'
import completedIcon from './images/completedicon.png'
import React, {useState} from 'react'


export function App() {
  const [items, setItems] = useState([{id: 1, title: "Finish Adding Items", status: "todo"}, {id:2, title: "Add Items", status: "inprogress"}, {id:3, title: "Add An Item For Each Column", status: "completed"}])
  const [search, setSearch] = useState("");

  // Helper to move item to a specific column
  const moveItemTo = (id: number, targetStatus: 'todo' | 'inprogress' | 'completed') => {
    setItems(prevItems => prevItems.map(item =>
      item.id === id ? { ...item, status: targetStatus } : item
    ));
  };

  // Handler to add a new item to the To Do column
  const handleAddToDo = (title: string) => {
    setItems(prevItems => [
      ...prevItems,
      {
        id: prevItems.length > 0 ? prevItems[prevItems.length - 1].id + 1 : 1,
        title,
        status: 'todo',
      },
    ]);
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
        {/* TODO: Use the 'search' state to filter items as you like */}
      </div>
      <JobForm onAdd={handleAddToDo}/>
      <div className="job-columns">
        <JobColumn title="To Do" image={toDoIcon} alt="To Do">
          <ul>
            {items
              .filter(item => item.status === "todo" && item.title.toLowerCase().includes(search.toLowerCase()))
              .map(item => (
                <li key={item.id}>
                  {item.title}
                  <span className="move-buttons">
                    <button className="move-inprogress" onClick={() => moveItemTo(item.id, 'inprogress')}>Move to In Progress</button>
                    <button className="move-completed" onClick={() => moveItemTo(item.id, 'completed')}>Move to Completed</button>
                  </span>
                </li>
              ))}
          </ul>
        </JobColumn>
        <JobColumn title="In Progress" image={inProgressIcon} alt="In Progress">
          <ul>
            {items
              .filter(item => item.status === "inprogress" && item.title.toLowerCase().includes(search.toLowerCase()))
              .map(item => (
                <li key={item.id}>
                  {item.title}
                  <span className="move-buttons">
                    <button className="move-todo" onClick={() => moveItemTo(item.id, 'todo')}>Move to To Do</button>
                    <button className="move-completed" onClick={() => moveItemTo(item.id, 'completed')}>Move to Completed</button>
                  </span>
                </li>
              ))}
          </ul>
        </JobColumn>
        <JobColumn title="Completed" image={completedIcon} alt="Done">
          <ul>
            {items
              .filter(item => item.status === "completed" && item.title.toLowerCase().includes(search.toLowerCase()))
              .map(item => (
                <li key={item.id}>
                  {item.title}
                  <span className="move-buttons">
                    <button className="move-todo" onClick={() => moveItemTo(item.id, 'todo')}>Move to To Do</button>
                    <button className="move-inprogress" onClick={() => moveItemTo(item.id, 'inprogress')}>Move to In Progress</button>
                  </span>
                </li>
              ))}
          </ul>
        </JobColumn>
      </div>
    </div>
  );
}

export default App;
