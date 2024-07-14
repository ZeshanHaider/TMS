import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleSignup = () => {
    localStorage.setItem('userDetails', JSON.stringify({ username, password }));
    localStorage.setItem('user', username);
    setUser(username);
    navigate('/tasks');
  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>

  );
};

export default Signup;
