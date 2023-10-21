import React from 'react';
interface Task {
  id: number;
  description: string;
  isComplete: boolean;
}

interface TaskListItemProps {
  task: Task;
  onRemove: (id: number) => void;
  onCompletion: (id: number) => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task, onRemove, onCompletion }) => {
  return (
    <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
      <span
        className={`cursor-pointer ${task.isComplete ? 'line-through' : ''}`}
        onClick={() => onCompletion(task.id)}
      >
        {task.description}
      </span>
      <button className="text-red-500 mt-2 sm:mt-0 sm:ml-2" onClick={() => onRemove(task.id)}>
        Remove
      </button>
    </li>

  );
};

export default TaskListItem;
