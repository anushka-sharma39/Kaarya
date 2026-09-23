import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import RoleGuard from './auth/RoleGuard';
import { useSession } from './auth/AuthContext';
import RoleSelection from '../pages/Login/RoleSelection';
import Register from '../pages/Login/Register';
import RouteFade from '../shared/RouteFade';
import AdminProtectedRoute from '../admin/AdminProtectedRoute';

// Each half of the platform is code-split so a customer never downloads the
// worker bundle (and vice versa) until they actually switch roles.
const CustomerApp = lazy(() => import('../customer/CustomerRoot'));
const WorkerApp = lazy(() => import('../worker/WorkerRoot'));

// New standalone registration and verify routes
const CustomerRegister = lazy(() => import('../customer/pages/Register'));
const CustomerVerify = lazy(() => import('../customer/pages/Verify'));
const WorkerRegister = lazy(() => import('../worker/pages/Register'));
const WorkerVerify = lazy(() => import('../worker/pages/Verify'));
const AdminLogin = lazy(() => import('../admin/pages/AdminLogin'));
const WorkerVerification = lazy(() => import('../admin/pages/WorkerVerification'));

function Loading() {
  return <div className="platform-loading" role="status" aria-label="Loading" />;
}

/** /login — bounce already-signed-in visitors straight to their side. */
function LoginRoute() {
  const { isLoggedIn, role } = useSession();
  if (isLoggedIn) return <Navigate to={`/${role}`} replace />;
  return <RoleSelection />;
}

/** /register — bounce already-signed-in visitors straight to their side. */
function RegisterRoute() {
  const { isLoggedIn, role } = useSession();
  if (isLoggedIn) return <Navigate to={`/${role}`} replace />;
  return <RoleSelection mode="register" />;
}

/** / — the entry point resolves to the right place based on the session. */
function RootRedirect() {
  const { isLoggedIn, role } = useSession();
  return <Navigate to={isLoggedIn ? `/${role}` : '/login'} replace />;
}

export default function AppRoutes() {
  const location = useLocation();
  // Key on the section, not the full path, so in-app navigation isn't animated —
  // only login ↔ customer ↔ worker transitions are.
  const section = location.pathname.split('/')[1] || 'root';

  return (
    <Suspense fallback={<Loading />}>
      <RouteFade sectionKey={section}>
        <Routes location={location}>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/register" element={<RegisterRoute />} />

          {/* Public Registration and Verify Routes */}
          <Route path="/customer/register" element={<CustomerRegister />} />
          <Route path="/customer/verify" element={<CustomerVerify />} />
          <Route path="/worker/register" element={<WorkerRegister />} />
          <Route path="/worker/verify" element={<WorkerVerify />} />

          <Route
            path="/customer/*"
            element={
              <ProtectedRoute>
                <RoleGuard allow="customer">
                  <CustomerApp />
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/worker/*"
            element={
              <ProtectedRoute>
                <RoleGuard allow="worker">
                  <WorkerApp />
                </RoleGuard>
              </ProtectedRoute>
            }
          />        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin/workers"
          element={
            <AdminProtectedRoute>
              <WorkerVerification />
            </AdminProtectedRoute>
          }
        />

          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </RouteFade>
    </Suspense>
  );
}
