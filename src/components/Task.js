import React from 'react';

const Task = ({ task, deleteTask, setCurrentTask }) => {
  const toggleStatus = () => {
    setCurrentTask({ ...task, status: task.status === 'complete' ? 'incomplete' : 'complete' });
  };

  return (
    <div className="task">
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Status: {task.status}</p>
      <button onClick={toggleStatus}>Edit</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
