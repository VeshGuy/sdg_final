import React from 'react';
import { Users, Clock } from 'lucide-react';
import { Tab } from '@headlessui/react';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
        <p className="text-gray-600 mb-4">{project.location}</p>
        
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-4">
            <Tab className={({ selected }) =>
              `flex-1 rounded-md py-2 text-sm font-medium leading-5
              ${selected ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-blue-600'}`
            }>
              Overview
            </Tab>
            <Tab className={({ selected }) =>
              `flex-1 rounded-md py-2 text-sm font-medium leading-5
              ${selected ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-blue-600'}`
            }>
              Goals
            </Tab>
            <Tab className={({ selected }) =>
              `flex-1 rounded-md py-2 text-sm font-medium leading-5
              ${selected ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-blue-600'}`
            }>
              Updates
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="space-y-4">
              <p className="text-gray-600">{project.description}</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  {project.volunteer_count} volunteers
                </span>
                <span className="text-sm font-medium text-blue-600">
                  {project.progress}% complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-600">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel className="space-y-4">
              <ul className="list-disc list-inside space-y-2">
                {project.goals.map((goal, idx) => (
                  <li key={idx} className="text-gray-600">{goal}</li>
                ))}
              </ul>
            </Tab.Panel>
            <Tab.Panel className="space-y-4">
              {project.updates.map((update, idx) => (
                <div key={idx} className="border-l-2 border-blue-500 pl-4">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {update.date}
                  </div>
                  <p className="text-gray-600">{update.content}</p>
                </div>
              ))}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t">
        <button className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-lg 
                         hover:from-blue-600 hover:to-emerald-600 transition-all transform hover:scale-105">
          Join Project
        </button>
      </div>
    </div>
  );
}