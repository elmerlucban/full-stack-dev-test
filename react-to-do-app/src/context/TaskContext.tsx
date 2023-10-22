import React, { createContext, useContext, ReactNode, ReactElement, useState, useEffect } from 'react';
import Tasks from '../services/taskService';

interface Task {
  id: number;
  description: string;
  is_completed: boolean;
}

interface TaskContextProps {
  tasks: Task[];
  errorMessage: string;
  getAllTasks: () => Promise<void>;
  addTask: (description: string) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
  completionTask: (id: number) => Promise<void>;
  clearErrorMessage: () => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }: TaskProviderProps): ReactElement => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    getAllTasks();
  }, []); 

  return (
    <TaskContext.Provider
      value={{ tasks, errorMessage, getAllTasks, addTask, removeTask, completionTask, clearErrorMessage }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
