import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from './AuthContext';

/**
 * Keeps each role inside its own half of the app.
 * A customer landing on /worker/* is bounced to /customer and vice versa.
 */
export default function RoleGuard({ allow, children }) {
  const { isLoggedIn, role } = useSession();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (role !== allow) return <Navigate to={`/${role}`} replace />;

  return children;
}
