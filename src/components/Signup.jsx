import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <div className="signup-options">
        <button onClick={() => navigate('/ngo-signup')} className="signup-button">NGO Signup</button>
        <button onClick={() => navigate('/volunteer-signup')} className="signup-button">Volunteer Signup</button>
      </div>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}