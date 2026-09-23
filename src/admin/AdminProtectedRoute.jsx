import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AdminProtectedRoute({ children }) {
  const [status, setStatus] = useState('checking'); // checking | in | out

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? 'in' : 'out');
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? 'in' : 'out');
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (status === 'checking') {
    return <div style={{ padding: 40, fontFamily: 'sans-serif' }}>Loading…</div>;
  }

  if (status === 'out') {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}