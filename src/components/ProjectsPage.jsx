import React from 'react';
import ProjectList from './ProjectList';

const ProjectsPage = ({ role }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <ProjectList />
    </div>
  );
};

export default ProjectsPage;