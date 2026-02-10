import React from 'react';
import './AppForm.css'

type JobFormProps = {
  onAdd: (title: string) => void;
};

export const JobForm: React.FC<JobFormProps> = ({ onAdd }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get('name') as string;
    if (title) {
      onAdd(title);
    }
    (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="form-header">
      <form onSubmit={handleSubmit}>
        <input type="text" className="bot-input" name='name' placeholder="Enter the job to add" required />
        <button type="submit" className="submit-data">Add to To Do</button>
      </form>
    </div>
  );
};
