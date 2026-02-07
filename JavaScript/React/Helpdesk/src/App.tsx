import React, {useState} from 'react';
import StatusBoard from './components/StatusBoard';
import './index.css'

export function App() {
  // State for tickets
  const [tickets, setTickets] = useState([
    {
      id: 1,
      name: 'Ticket 1',
      title: 'Fix Login Bug',
      description: 'Resolve the issue with user login.',
      date: '2023-10-01',
      status: 'completed',
    },
    {
      id: 2,
      name: 'Ticket 2',
      title: 'Add Dark Mode',
      description: 'Implement dark mode for the app.',
      date: '2023-10-02',
      status: 'in-progress',
    },
    {
      id: 3,
      name: 'Ticket 3',
      title: 'Update Documentation',
      description: 'Update the project documentation.',
      date: '2023-10-03',
      status: 'failed',
    },
  ]);

  // State for the selected ticket (for viewing details)
  const [selectedTicket, setSelectedTicket] = useState(null);

  // State for showing the ticket creation form
  const [showForm, setShowForm] = useState(false);

  // Function to add a new ticket
  const addTicket = (newTicket) => {
    setTickets([...tickets, { ...newTicket, id: Date.now() }]);
    setShowForm(false); // Hide the form after adding
  };

  // Function to edit a ticket
  const editTicket = (id, updatedTicket) => {
    setTickets(tickets.map(ticket => (ticket.id === id ? { ...ticket, ...updatedTicket } : ticket)));
  };

  // Function to delete a ticket
  const deleteTicket = (id) => {
    setTickets(tickets.filter(ticket => ticket.id !== id));
  };

  // Function to view ticket details
 const viewTicket = (ticket) => {
  setSelectedTicket(ticket); // This already sets the selected ticket
  console.log(`Viewing details for ticket: ${ticket.title}`);
};

  // Group tickets by status
  const completedTickets = tickets
    .filter(ticket => ticket.status === 'completed')
    .map(ticket => (
      <li key={ticket.id} onClick={() => viewTicket(ticket)}>
        {ticket.title}
      </li>
    ));

  const inProgressTickets = tickets
    .filter(ticket => ticket.status === 'in-progress')
    .map(ticket => (
      <li key={ticket.id} onClick={() => viewTicket(ticket)}>
        {ticket.title}
      </li>
    ));

  const failedTickets = tickets
    .filter(ticket => ticket.status === 'failed')
    .map(ticket => (
      <li key={ticket.id} onClick={() => viewTicket(ticket)}>
        {ticket.title}
      </li>
    ));

  return (
    <div className="app">
      <button onClick={() => setShowForm(true)}>Create Ticket</button>

      {showForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newTicket = {
              name: formData.get('name'),
              title: formData.get('title'),
              description: formData.get('description'),
              date: formData.get('date'),
              status: formData.get('status'),
            };
            addTicket(newTicket);
          }}
        >
          <input name="name" placeholder="Name" required />
          <input name="title" placeholder="Title" required />
          <textarea name="description" placeholder="Description" required />
          <input name="date" type="date" required />
          <select name="status" required>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="failed">Failed</option>
          </select>
          <button type="submit">Add Ticket</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}

      {selectedTicket && (
        <div className="ticket-details">
          <h2>{selectedTicket.title}</h2>
          <p>{selectedTicket.description}</p>
          <p>Date: {selectedTicket.date}</p>
          <p>Status: {selectedTicket.status}</p>
          <button onClick={() => setSelectedTicket(null)}>Close</button>
          <button onClick={() => deleteTicket(selectedTicket.id)}>Delete</button>
        </div>
      )}

      <StatusBoard>
  {{
    completed: {
      tickets: completedTickets,
      count: completedTickets.length, // Add count
    },
    inProgress: {
      tickets: inProgressTickets,
      count: inProgressTickets.length, // Add count
    },
    failed: {
      tickets: failedTickets,
      count: failedTickets.length, // Add count
    },
  }}
</StatusBoard>
    </div>
  );
}

export default App;
