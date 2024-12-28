import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { FaGlobe, FaUsers, FaChartLine, FaClock } from 'react-icons/fa';

const ProjectsPage = ({ role }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects', { params: filters });
        setProjects(response.data);
      } catch (error) {
        // Handle error
      }
    };
    fetchProjects();
  }, [filters]);

  const handleApply = async (projectId) => {
    try {
      await axios.post(`/api/projects/${projectId}/apply`);
      // Handle apply success
    } catch (error) {
      // Handle apply error
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8 text-center"
        >
          Global Impact Projects
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project List */}
          <div className="lg:col-span-1 space-y-4">
            {projects.map((project) => (
              <motion.div
                key={project.project_id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
                className={`p-6 rounded-xl shadow-md cursor-pointer transition-all ${
                  selectedProject && selectedProject.project_id === project.project_id
                    ? 'bg-gradient-to-r from-blue-500 to-green-400 text-white'
                    : 'bg-white hover:shadow-lg'
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm opacity-90 mb-4">{project.location}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <FaUsers className="mr-2" />
                    <span>{project.volunteers} volunteers</span>
                  </div>
                  <div className="flex items-center">
                    <FaChartLine className="mr-2" />
                    <span>{project.progress}% complete</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Details */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <Tab.Group>
              <Tab.List className="flex space-x-4 border-b border-gray-200 mb-8">
                {['Overview', 'Goals', 'Updates', 'Join Project'].map((tab) => (
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
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedProject && selectedProject.title}
                    </h2>
                    <p className="text-gray-600">{selectedProject && selectedProject.description}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject && selectedProject.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-500 to-green-400 rounded-lg p-6 text-white">
                      <h3 className="text-lg font-semibold mb-4">Project Progress</h3>
                      <div className="w-full bg-white/20 rounded-full h-4">
                        <div
                          className="bg-white rounded-full h-4 transition-all duration-500"
                          style={{ width: `${selectedProject && selectedProject.progress}%` }}
                        />
                      </div>
                      <div className="mt-2 text-sm">
                        {selectedProject && selectedProject.progress}% Complete
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="space-y-4">
                    {selectedProject && selectedProject.goals.map((goal, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full flex items-center justify-center text-white">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{goal}</p>
                      </motion.div>
                    ))}
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="space-y-4">
                    {selectedProject && selectedProject.updates.map((update, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-l-4 border-gradient-to-r from-blue-500 to-green-400 pl-4 py-2"
                      >
                        <div className="text-sm text-gray-500">{update.date}</div>
                        <p className="text-gray-700 mt-1">{update.content}</p>
                      </motion.div>
                    ))}
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="text-center py-8">
                    {role === 'volunteer' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => handleApply(selectedProject && selectedProject.project_id)}
                      >
                        Apply as Volunteer
                      </motion.button>
                    )}
                    <p className="mt-4 text-gray-600">
                      Join {selectedProject && selectedProject.volunteers} other volunteers in this project
                    </p>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;