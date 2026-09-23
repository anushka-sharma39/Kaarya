import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-[rgb(22,31,25)] flex flex-col items-center justify-center p-4">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
