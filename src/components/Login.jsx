import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('volunteer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { unique_id: uniqueId, password, role });
      // Handle login success
      const user = response.data.user;
      // Store user data in local storage or context
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role);
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      // Handle login error
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <label>Unique ID</label>
        <input type="text" value={uniqueId} onChange={(e) => setUniqueId(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="volunteer">Volunteer</option>
          <option value="ngo">NGO</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}