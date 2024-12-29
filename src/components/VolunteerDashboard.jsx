import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tab } from '@headlessui/react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const volunteerProjects = [
  {
    project_id: 1,
    title: 'Clean Water Initiative',
    description: 'Providing clean water access to rural communities',
    status: 'Working'
  },
  {
    project_id: 2,
    title: 'Education for All',
    description: 'Supporting quality education in underserved areas',
    status: 'Applied'
  }
];

const volunteerApplications = [
  {
    application_id: 1,
    project: 'Clean Water Initiative',
    status: 'Approved'
  },
  {
    application_id: 2,
    project: 'Education for All',
    status: 'Pending'
  }
];

export default function VolunteerDashboard() {
  const [stats, setStats] = useState({
    projects_working: 1,
    projects_applied: 2,
    activity_status: 'Active',
    reviews: 4.8
  });
  const [volunteer, setVolunteer] = useState({});
  const [projects, setProjects] = useState(volunteerProjects);
  const [applications, setApplications] = useState(volunteerApplications);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/volunteer/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    const fetchVolunteer = async () => {
      try {
        // Simulate fetching volunteer details based on logged-in user
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        console.log('Logged in user:', loggedInUser);
        const volunteerData = volunteersData.find(v => v.uniqueId === loggedInUser.uniqueId);
        console.log('Volunteer data:', volunteerData);
        setVolunteer(volunteerData);
      } catch (error) {
        console.error('Error fetching volunteer details:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/volunteer/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await axios.get('/api/volunteer/applications');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchStats();
    fetchVolunteer();
    fetchProjects();
    fetchApplications();
  }, []);

  if (!volunteer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src={volunteer.picture} alt="Volunteer" className="w-32 h-32 rounded-full mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900 text-center mt-4">{volunteer.name}</h2>
            <p className="text-center text-gray-600">Age: {volunteer.age}</p>
            <p className="text-center text-gray-600">Categories: {volunteer.categories.join(', ')}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">Projects Working In</h3>
              <p className="text-2xl font-bold text-blue-600">{volunteer.projects_working}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">Projects Applied To</h3>
              <p className="text-2xl font-bold text-blue-600">{volunteer.projects_applied}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">Activity Status</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.activity_status}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">Reviews Rating</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.reviews}</p>
            </div>
          </div>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-4 border-b border-gray-200 mb-8">
            {['Projects', 'Applications'].map((tab) => (
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
                    <p className="text-gray-600">Status: {project.status}</p>
                  </div>
                ))}
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.application_id} className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{application.project}</h3>
                      <p className="text-gray-600">Status: {application.status}</p>
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
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900">Volunteer Details</h3>
          <p className="text-gray-600 mt-4">{volunteer.details}</p>
        </div>
      </div>
    </div>
  );
}