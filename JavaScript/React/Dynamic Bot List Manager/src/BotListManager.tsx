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

  const addBot = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const status = formData.get('status') as string;
    const task = formData.get('task') as string;

    const newId = bots.length > 0 ? bots[bots.length - 1].id + 1 : 1;
    const newBot = { id: newId, name, status, task };

    setBots((prevBots) => [...prevBots, newBot]);
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
              </li>
            ))}
        </ul>
        <form onSubmit={addBot}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border p-2 m-2"
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            className="border p-2 m-2"
          />
          <input
            type="text"
            name="task"
            placeholder="Task"
            className="border p-2 m-2"
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
