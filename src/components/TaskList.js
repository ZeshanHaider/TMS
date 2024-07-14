import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [tasks]);

  const handleDelete = async (taskId) => {
    console.log(`Deleting task with id: ${taskId}`);
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <div className="task-list-container">
      <div className="tasks">
        {tasks.map(task => (
          <div key={task._id} className="task">
            <h2>{task.name}</h2>
            <p>{task.details}</p>
            <p>{task.duedate}</p>
            <button onClick={() => handleDelete(task._id)} className="delete-button">DEL</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
