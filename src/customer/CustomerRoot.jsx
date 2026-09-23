import React, { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { SupportProvider } from './context/SupportContext';
import { ThemeProvider } from './context/ThemeContext';
import CustomerApp from './CustomerApp';
import './styles/customer.css';

/**
 * Providers for the customer side. They are mounted here rather than at the
 * platform root so the worker app never sees customer state (and vice versa).
 */
export default function CustomerRoot() {
  useEffect(() => {
    // The worker app themes via a `dark` class on <html>; clear it on entry so
    // a role switch doesn't carry the other app's theme flag across.
    document.documentElement.classList.remove('dark');
    return () => document.documentElement.removeAttribute('data-theme');
  }, []);

  return (
    <ThemeProvider>
      <UserProvider>
        <LanguageProvider>
          <SupportProvider>
            <CustomerApp />
          </SupportProvider>
        </LanguageProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
