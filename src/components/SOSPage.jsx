import React, { useState, useEffect } from 'react';
import axios from 'axios';

const sosProjects = [
  {
    project_id: 1,
    title: 'Flood Relief',
    description: 'Immediate assistance needed for flood-affected areas.',
    contact: '123-456-7890'
  },
  {
    project_id: 2,
    title: 'Earthquake Rescue',
    description: 'Urgent help required for earthquake rescue operations.',
    contact: '987-654-3210'
  }
];

export default function SOSPage() {
  const [projects, setProjects] = useState(sosProjects);
  const [showContact, setShowContact] = useState(null);

  const handleApply = (projectId) => {
    setShowContact(projectId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
          Emergency SOS
        </h1>
        <div className="flex justify-center mb-8">
          <div className="w-8 h-8 bg-red-600 rounded-full animate-ping"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.project_id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <button
                onClick={() => handleApply(project.project_id)}
                className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-green-500 transition-all"
              >
                Apply
              </button>
              {showContact === project.project_id && (
                <p className="mt-4 text-gray-600">Contact: {project.contact}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}