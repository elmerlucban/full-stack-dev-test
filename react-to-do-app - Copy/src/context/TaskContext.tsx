import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import Tasks from '../services/taskService';

interface TaskContextProps {
  children: ReactNode;
}

interface Task {
  id: number;
  description: string;
  is_completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  errorMessage: string;
  getAllTasks: () => Promise<void>;
  addTask: (description: string) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
  completionTask: (id: number) => Promise<void>;
  clearErrorMessage: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<TaskContextProps> = ({ children }) => {
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
    // ... (same code as before)
  };

  const removeTask = async (id: number) => {
    // ... (same code as before)
  };

  const completionTask = async (id: number) => {
    // ... (same code as before)
  };

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        errorMessage,
        getAllTasks,
        addTask,
        removeTask,
        completionTask,
        clearErrorMessage,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
