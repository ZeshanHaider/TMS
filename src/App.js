import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(localStorage.getItem('user') || '');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const logout = () => {
    setUser('');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <nav>
          {user && <button onClick={logout}>Logout</button>}
        </nav>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/tasks" /> : <Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/tasks" element={user ? <TaskForm /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router> 
  );
};

export default App;
