import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function VolunteerSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    availability: 'full-time',
    currentlyWorking: false,
    country: '',
    state: '',
    city: '',
    address: '',
    pastExperience: '',
    certifications: null,
    randomCode: Math.random().toString(36).substring(2, 8),
    image: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
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
      localStorage.setItem('role', 'volunteer');
      navigate('/dashboard');
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Volunteer Signup</h2>
        {error && <p className="error">{error}</p>}
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label>Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        <label>Expertise</label>
        <select name="expertise" value={formData.expertise} onChange={handleChange} required>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Environment">Environment</option>
          <option value="Social">Social</option>
        </select>
        <label>Availability</label>
        <select name="availability" value={formData.availability} onChange={handleChange} required>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
        </select>
        <label>Currently Working in an Organization</label>
        <input type="checkbox" name="currentlyWorking" checked={formData.currentlyWorking} onChange={handleChange} />
        <label>Country</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} required />
        <label>State</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        <label>City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        <label>Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        <label>Past Experience</label>
        <textarea name="pastExperience" value={formData.pastExperience} onChange={handleChange} required />
        <label>Certifications Upload</label>
        <input type="file" name="certifications" onChange={handleChange} required />
        <label>Random Code: {formData.randomCode}</label>
        <label>Upload Image</label>
        <input type="file" name="image" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}