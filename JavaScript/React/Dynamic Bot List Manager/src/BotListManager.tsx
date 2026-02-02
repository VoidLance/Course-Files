import React, { useState } from 'react';

interface Bot {
  id: number;
  name: string;
  status: string;
  task: string;
}

const BotListManager = () => {
  const [bots, setBots] = useState<Bot[]>([
    { id: 1, name: "Email Extractor", status: "Running", task: "Extracting emails" },
    { id: 2, name: "Notification Sender", status: "Completed", task: "Sending notifications" },
    { id: 3, name: "Data Analyser", status: "Stopped", task: "Analysing data" }
  ]);

  const [botsFilter, setBotsFilter] = useState("");

  const triggerJob = (id: number) => {
    setBots((prevBots) =>
      prevBots.map((bot) =>
        bot.id === id ? { ...bot, status: "Running" } : bot
      )
    );
    setTimeout(() => {
      setBots((prevBots) =>
        prevBots.map((bot) =>
          bot.id === id && bot.status === "Running" ? { ...bot, status: "Completed" } : bot
        )
      );
    }, 5000);
    console.log(id);
  };

  const delBot = (id: number) => {
    setBots((prevBots) => prevBots.filter((bot) => bot.id !== id));
  };

 const editBot = (id: number) => {
  const botToEdit = bots.find((bot) => bot.id === id);
  if (botToEdit) {
    // Pre-fill the form with the bot's current details
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      (form.elements.namedItem('name') as HTMLInputElement).value = botToEdit.name;
      (form.elements.namedItem('status') as HTMLInputElement).value = botToEdit.status;
      (form.elements.namedItem('task') as HTMLInputElement).value = botToEdit.task;

      // Use a hidden input field to store the ID of the bot being edited
      const hiddenInput = form.elements.namedItem('editingId') as HTMLInputElement;
      if (hiddenInput) {
        hiddenInput.value = id.toString();
      } else {
        const newHiddenInput = document.createElement('input');
        newHiddenInput.type = 'hidden';
        newHiddenInput.name = 'editingId';
        newHiddenInput.value = id.toString();
        form.appendChild(newHiddenInput);
      }
    }
  }
};

const addBot = (e: React.FormEvent) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const name = formData.get('name') as string;
  const status = formData.get('status') as string;
  const task = formData.get('task') as string;

  const editingId = formData.get('editingId') as string | null;

  if (editingId) {
    // Update the bot
    const id = parseInt(editingId, 10);
    setBots((prevBots) =>
      prevBots.map((bot) =>
        bot.id === id ? { ...bot, name, status, task } : bot
      )
    );

    // Remove the hidden input field after editing
    const hiddenInput = form.elements.namedItem('editingId') as HTMLInputElement;
    if (hiddenInput) {
      form.removeChild(hiddenInput);
    }
  } else {
    // Add a new bot
    const newId = bots.length > 0 ? bots[bots.length - 1].id + 1 : 1;
    const newBot = { id: newId, name, status, task };
    setBots((prevBots) => [...prevBots, newBot]);
  }

  form.reset(); // Clear the form fields
};

  const stopJob = (id: number) => {
    setBots((prevBots) =>
      prevBots.map((bot) =>
        bot.id === id ? { ...bot, status: "Stopped" } : bot
      )
    );
  };

  return (
    <>
      <div className="bot-list-manager">
        <h1>Bot List Manager</h1>
        <input
          type="text"
          placeholder="Enter status"
          onChange={(e) => setBotsFilter(e.target.value)}
          className="border p-2 m-2"
        />
        <ul>
          {bots
            .filter((bot) => !botsFilter || bot.status === botsFilter)
            .map(({ id, name, status, task }) => (
              <li className="text-lg bg-slate-200/30 p-4 m-2" key={id}>
                <span className={status}>{id} - {name} - {status} - {task}</span>
                <button
                  className="border border-4 rounded-2xl border-color-violet-400 bg-green-400 text-color-slate-300 p-3 m-1 cursor-pointer"
                  onClick={() => triggerJob(id)}
                >
                  Trigger
                </button>
                <button
                  className="border border-4 rounded-2xl border-color-violet-400 bg-red-400 text-color-slate-300 p-3 m-1 cursor-pointer"
                  onClick={() => stopJob(id)}
                >
                  Stop
                </button>
                <button
                  className="border border-4 rounded-2xl border-color-violet-400 bg-blue-400 text-color-slate-300 p-3 m-1 cursor-pointer"
                  onClick={() => delBot(id)}
                >
                  Delete
                </button>
                <button
                  className="border border-4 rounded-2xl border-color-violet-400 bg-orange-400 text-color-slate-300 p-3 m-1 cursor-pointer"
                  onClick={() => editBot(id)}
                >
                Edit
                </button>
              </li>
            ))}
        </ul>
        <form onSubmit={addBot}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border p-2 m-2"
            required={true}
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            className="border p-2 m-2"
            required={true}
          />
          <input
            type="text"
            name="task"
            placeholder="Task"
            className="border p-2 m-2"
            required= {true}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer">
            Add Bot
          </button>
        </form>
      </div>
    </>
  );
};

export default BotListManager;
