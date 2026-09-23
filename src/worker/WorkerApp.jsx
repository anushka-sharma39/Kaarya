import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';
import Gigs from './pages/Gigs';
import GigDetails from './pages/GigDetails';
import Applications from './pages/Applications';
import MyWork from './pages/MyWork';
import Profile from './pages/Profile';
import Verification from './pages/Verification';
import Community from './pages/Community';
import Messages from './pages/Messages';
import Welfare from './pages/Welfare';

/**
 * Tailwind needs these literal class names in the source to emit them —
 * they mirror what the worker project used to set on <body> in index.html.
 */
const WORKER_BODY_CLASSES =
  'bg-cream-50 text-slate-900 dark:bg-[rgb(22,31,25)] dark:text-[#26382e] antialiased font-sans transition-colors duration-200';

/**
 * The gig-worker half of the platform. Routes are mounted under /worker/*;
 * pages, layouts and styling are untouched from the original project.
 */
function WorkerApp() {
  useEffect(() => {
    const classes = WORKER_BODY_CLASSES.split(' ');
    document.body.classList.add('role-worker', ...classes);
    return () => document.body.classList.remove('role-worker', ...classes);
  }, []);

  return (
    <Routes>
      {/* Auth-style screens kept from the original worker app */}
      <Route element={<AuthLayout />}>
        <Route path="welcome" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Main worker application */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/worker/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="gigs" element={<Gigs />} />
        <Route path="gigs/:id" element={<GigDetails />} />
        <Route path="applications" element={<Applications />} />
        <Route path="work" element={<MyWork />} />
        <Route path="profile" element={<Profile />} />
        <Route path="verification" element={<Verification />} />
        <Route path="community" element={<Community />} />
        <Route path="messages" element={<Messages />} />
        <Route path="welfare" element={<Welfare />} />
        <Route path="*" element={<Navigate to="/worker/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default WorkerApp;
