import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tab } from '@headlessui/react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const ngoProjects = [
  {
    project_id: 1,
    title: 'Clean Water Initiative',
    description: 'Providing clean water access to rural communities',
    volunteers: [
      { name: 'John Doe', project: 'Clean Water Initiative' },
      { name: 'Jane Smith', project: 'Clean Water Initiative' }
    ]
  },
  {
    project_id: 2,
    title: 'Education for All',
    description: 'Supporting quality education in underserved areas',
    volunteers: [
      { name: 'Alice Johnson', project: 'Education for All' },
      
    ]
  }
];

export default function NGODashboard() {
  const [stats, setStats] = useState({
    number_projects: 2,
    number_volunteers: 3,
    active_projects: 2,
    reviews: 4.5
  });
  const [projects, setProjects] = useState(ngoProjects);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get('/api/ngo/volunteers');
        setVolunteers(response.data);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };

    fetchVolunteers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">Welcome, NGO!</h2>
            <p className="text-gray-600 mt-4">Here is an overview of your activities.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">Number of Projects</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.number_projects}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">Number of Volunteers</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.number_volunteers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">Active Projects</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.active_projects}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">Reviews Rating</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.reviews}</p>
            </div>
          </div>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-4 border-b border-gray-200 mb-8">
            {['Projects', 'Volunteers'].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
                    selected
                      ? 'bg-gradient-to-r from-blue-500 to-green-400 text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.project_id} className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className="space-y-4">
                {projects.flatMap((project) =>
                  project.volunteers.map((volunteer, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{volunteer.name}</h3>
                        <p className="text-gray-600">Applying for: {volunteer.project}</p>
                      </div>
                      <div className="flex space-x-4">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                          <FaCheck />
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}