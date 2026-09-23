import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider as WorkerAuthProvider } from './context/AuthContext';
import WorkerApp from './WorkerApp';
import './styles/worker.css';

/**
 * Providers for the worker side, including the worker app's own profile
 * context. Mounted only while /worker/* is active.
 */
export default function WorkerRoot() {
  useEffect(() => {
    // The customer app themes via <html data-theme>; clear it on entry.
    document.documentElement.removeAttribute('data-theme');
    return () => document.documentElement.classList.remove('dark');
  }, []);

  return (
    <WorkerAuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <WorkerApp />
        </LanguageProvider>
      </ThemeProvider>
    </WorkerAuthProvider>
  );
}
