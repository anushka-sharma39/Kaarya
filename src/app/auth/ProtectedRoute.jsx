import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSession } from './AuthContext';

/**
 * Blocks anything behind the role-selection gate.
 * Logged-out visitors are always sent back to /login.
 */
export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useSession();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
