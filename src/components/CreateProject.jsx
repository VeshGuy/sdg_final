import React, { useState } from 'react';
import axios from 'axios';

export default function CreateProject() {
  const [formData, setFormData] = useState({
    title: '',
    project_type: '',
    description: '',
    required_skills: [],
    commitment_type: '',
    country: '',
    state: '',
    city: '',
    safe_for_women: false,
    funding_requirements: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/projects', formData);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="create-project-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Project</h2>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        <label>Project Type</label>
        <select name="project_type" value={formData.project_type} onChange={handleChange} required>
          <option value="Type1">Type1</option>
          <option value="Type2">Type2</option>
          <option value="Type3">Type3</option>
        </select>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
        <label>Required Skills</label>
        <input type="text" name="required_skills" value={formData.required_skills} onChange={handleChange} required />
        <label>Commitment Type</label>
        <select name="commitment_type" value={formData.commitment_type} onChange={handleChange} required>
          <option value="Remote">Remote</option>
          <option value="Physical">Physical</option>
          <option value="Both">Both</option>
        </select>
        <label>Country</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} required />
        <label>State</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        <label>City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        <label>Safe for Women</label>
        <input type="checkbox" name="safe_for_women" checked={formData.safe_for_women} onChange={(e) => setFormData({ ...formData, safe_for_women: e.target.checked })} />
        <label>Funding Requirements</label>
        <input type="number" name="funding_requirements" value={formData.funding_requirements} onChange={handleChange} required />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}