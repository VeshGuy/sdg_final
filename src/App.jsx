import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectHighlights from './components/ProjectHighlights';
import ProjectsPage from './components/ProjectsPage';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import NGODashboard from './components/NGODashboard';
import VolunteerDashboard from './components/VolunteerDashboard';
import CreateProject from './components/CreateProject';
import NGOSignup from './components/NGOSignup';
import VolunteerSignup from './components/VolunteerSignup';
import SOSPage from './components/SOSPage'; // Import SOSPage

export default function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar role={role} setRole={setRole} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProjectHighlights />
              <Testimonials />
            </>
          } />
          <Route path="/projects" element={<ProjectsPage role={role} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ngo-signup" element={<NGOSignup />} />
          <Route path="/volunteer-signup" element={<VolunteerSignup />} />
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          <Route path="/ngo-dashboard" element={<NGODashboard />} />
          <Route path="/dashboard" element={
            role === 'ngo' ? <NGODashboard /> : role === 'volunteer' ? <VolunteerDashboard /> : <Navigate to="/login" />
          } />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/sos" element={<SOSPage />} /> {/* Add SOSPage route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}