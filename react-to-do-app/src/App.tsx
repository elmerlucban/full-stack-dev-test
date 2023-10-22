import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskListItem from './components/TaskListItem';
import { useTaskContext } from './context/TaskContext';

const App: React.FC = () => {
  const { tasks, errorMessage, getAllTasks, addTask, removeTask, completionTask, clearErrorMessage } = useTaskContext();

  const handleInputFocus = () => {
    clearErrorMessage();
  };

  return (
    <div className="container mx-auto p-4">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <TaskForm onSubmit={addTask} onFocus={handleInputFocus} />
      <ul>
        {tasks.map((task) => (
          <TaskListItem key={task.id} task={task} onRemove={removeTask} onCompletion={completionTask} />
        ))}
      </ul>
    </div>
  );
};

export default App;
