import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'kaarya-session';

const AuthContext = createContext(null);

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.isLoggedIn && (parsed.role === 'customer' || parsed.role === 'worker')) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function writeSession(session) {
  try {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable — session stays in memory for this tab */
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const login = useCallback((role) => {
    const next = { isLoggedIn: true, role };
    writeSession(next);
    setSession(next);
    return next;
  }, []);

  const switchRole = useCallback((role) => {
    const next = { isLoggedIn: true, role };
    writeSession(next);
    setSession(next);
    return next;
  }, []);

  const logout = useCallback(() => {
    writeSession(null);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      session,
      isLoggedIn: Boolean(session?.isLoggedIn),
      role: session?.role ?? null,
      login,
      logout,
      switchRole,
    }),
    [session, login, logout, switchRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useSession() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useSession must be used inside <AuthProvider>');
  return ctx;
}

export { STORAGE_KEY };
