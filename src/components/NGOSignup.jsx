import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function NGOSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    address: '',
    sector: '',
    uniqueId: '',
    govDocs: null,
    activityReport: null,
    unEcosoc: 'NO',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', data);
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', 'ngo');
      navigate('/dashboard');
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>NGO Signup</h2>
        {error && <p className="error">{error}</p>}
        <label>Listed Name of the NGO</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label>Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        <label>Country</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} required />
        <label>State</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        <label>City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        <label>Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        <label>Sector</label>
        <select name="sector" value={formData.sector} onChange={handleChange} required>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Environment">Environment</option>
          <option value="Social">Social</option>
        </select>
        <label>Unique ID</label>
        <input type="text" name="uniqueId" value={formData.uniqueId} onChange={handleChange} required />
        <label>Upload Government Approved Documents</label>
        <input type="file" name="govDocs" onChange={handleChange} required />
        <label>2 Years Activity Report Document Upload</label>
        <input type="file" name="activityReport" onChange={handleChange} required />
        <label>UN ECOSOC Member</label>
        <select name="unEcosoc" value={formData.unEcosoc} onChange={handleChange} required>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}