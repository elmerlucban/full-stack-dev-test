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
    <li className={`flex tasks-center justify-between mb-2`}>
      <span
        className={`cursor-pointer ${task.is_completed ? 'line-through' : ''}`}
        onClick={() => onCompletion(task.id)}
        title={task.is_completed ? 'Completed Task' : 'Click to mark as completed'}
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
