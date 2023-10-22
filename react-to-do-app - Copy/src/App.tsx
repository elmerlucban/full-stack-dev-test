import React, { useState, useEffect } from 'react';
import Tasks from './services/taskService';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskListItem from './components/TaskListItem';

interface Task {
  id: number;
  description: string;
  is_completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const response = await Tasks.getAllTask();

      setTasks(response.data.data);
      setErrorMessage('');
    } catch (error) {
      setTasks([]);
      setErrorMessage(error.response.data.message);
      console.error('Error fetching tasks:', error.response.data);
    }
  };

  const addTask = async (description: string) => {
    try {
      const response = await Tasks.addTask({ description });
      setTasks([...tasks, response.data.data]);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.error('Error adding task:', error.response.data);
    }
  };

  const removeTask = async (id: number) => {
    try {
      await Tasks.removeTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.error('Error removing task:', error.response.data);
    }
  };

  const completionTask = async (id: number) => {
    try {
      const response = await Tasks.completionTask(id);
      setTasks(tasks.map(task => (task.id === id ? response.data.data : task)));
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.error('Error updating task status:', error.response.data);
    }
  };

  const handleInputFocus = () => {
    setErrorMessage('');
  };

  return (
    <div className="container mx-auto p-4">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <TaskForm onSubmit={addTask} onFocus={handleInputFocus}/>
      <ul>
        {tasks.map(task => (
          <TaskListItem
            key={task.id}
            task={task}
            onRemove={removeTask}
            onCompletion={completionTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
