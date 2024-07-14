import React, { useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';

const TaskForm = () => {
  
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [duedate, setDuedate] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, details, duedate };

    axios.post('http://localhost:5000/add', userData)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  };

  return (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Task Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Task Details:</label>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Due Date:</label>
            <input
              type="date"
              value={duedate}
              onChange={(e) => setDuedate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <TaskList />
      </>
  );
};

export default TaskForm;
