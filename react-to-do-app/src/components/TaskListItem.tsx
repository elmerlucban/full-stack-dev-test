import React from 'react';
interface Task {
  id: number;
  description: string;
  is_completed: boolean;
}

interface TaskListItemProps {
  task: Task;
  onRemove: (id: number) => void;
  onCompletion: (id: number) => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task, onRemove, onCompletion }) => {
  return (
    <li className={`mb-2 bg-gray-200 rounded-lg p-4 flex items-center justify-between`}>
      <span
        className={`cursor-pointer flex-1 ${task.is_completed ? 'line-through' : ''}`}
        onClick={() => onCompletion(task.id)}
        title={task.is_completed ? 'Completed Task' : 'Click to mark as completed'}
      >
        {task.description}
      </span>
      <div className="flex items-center">
        <button className="text-red-500 ml-2" onClick={() => onRemove(task.id)}>
          Remove
        </button>
        
        <button 
          className={`text-blue-500 ml-2 flex-1 ${task.is_completed ? 'line-through' : ''}`}
          onClick={() => onCompletion(task.id)}
          title={task.is_completed ? 'Completed Task' : 'Click to mark as completed'}
          disabled={task.is_completed} 
        >
          Close Task
        </button>
      </div>
    </li>
  );
};

export default TaskListItem;
