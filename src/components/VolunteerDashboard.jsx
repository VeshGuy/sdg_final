import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VolunteerDashboard() {
  const [stats, setStats] = useState({});
  const [volunteer, setVolunteer] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/volunteer/stats');
        setStats(response.data);
      } catch (error) {
        // Handle error
      }
    };

    const fetchVolunteer = async () => {
      try {
        const response = await axios.get('/api/volunteer/details');
        setVolunteer(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchStats();
    fetchVolunteer();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src={volunteer.picture} alt="Volunteer" className="w-32 h-32 rounded-full mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900 text-center mt-4">{volunteer.name}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">Projects Working In</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.projects_working}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">Projects Applied To</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.projects_applied}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900">Volunteer Details</h3>
          <p className="text-gray-600 mt-4">{volunteer.details}</p>
        </div>
      </div>
    </div>
  );
}