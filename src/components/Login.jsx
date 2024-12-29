import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const volunteersData = [
  {
    uniqueId: 'volunteer1',
    password: 'password1',
    role: 'volunteer'
  },
  {
    uniqueId: 'volunteer2',
    password: 'password2',
    role: 'volunteer'
  },
  {
    uniqueId: 'volunteer3',
    password: 'password3',
    role: 'volunteer'
  }
];

const ngosData = [
  {
    uniqueId: 'ngo1',
    password: 'password1',
    role: 'ngo'
  },
  {
    uniqueId: 'ngo2',
    password: 'password2',
    role: 'ngo'
  },
  {
    uniqueId: 'ngo3',
    password: 'password3',
    role: 'ngo'
  }
];

const usersData = [...volunteersData, ...ngosData];

export default function Login() {
  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('volunteer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = usersData.find(v => v.uniqueId === uniqueId && v.password === password && v.role === role);
    if (user) {
      localStorage.setItem('user', JSON.stringify({ uniqueId, role }));
      localStorage.setItem('role', role);
      if (role === 'volunteer') {
        navigate('/volunteer-dashboard');
      } else {
        navigate('/ngo-dashboard');
      }
    } else {
      setError('Invalid credentials');
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