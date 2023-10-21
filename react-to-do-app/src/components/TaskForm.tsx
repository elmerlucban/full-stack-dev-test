import React, { useState } from 'react';

interface TaskFormProps {
  onSubmit: (description: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [newItemDescription, setNewItemDescription] = useState<string>('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newItemDescription);
    setNewItemDescription('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex mb-4">
      <input
        type="text"
        className="border rounded p-2 mr-2 flex-grow"
        placeholder="Enter your task..."
        value={newItemDescription}
        onChange={(e) => setNewItemDescription(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Add
      </button>
    </form>
  );
};

export default TaskForm;
