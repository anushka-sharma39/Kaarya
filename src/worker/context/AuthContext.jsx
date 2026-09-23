import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_WORKER = {
  id: 'w1',
  role: 'worker',
  email: 'worker@kaarya.demo',
  name: 'Ramesh Kumar',
  avatar: 'https://i.pravatar.cc/150?u=ramesh',
  profileComplete: 80,
  verified: true,
  phone: '',
  address: '',
  skills: [],
};

/** Read the registered profile from localStorage (set by the OTP verify page). */
function readRegisteredProfile() {
  try {
    const raw = localStorage.getItem('gigWorkerProfile');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.name) return parsed;
    return null;
  } catch {
    return null;
  }
}

/** Merge registered profile fields into the worker user object. */
function buildUser(registered) {
  if (!registered) return DEFAULT_WORKER;
  // Use the uploaded photo (base64) as the avatar if present
  const avatar = registered.profileImage
    || `https://i.pravatar.cc/150?u=${encodeURIComponent(registered.email || 'worker')}`;
  return {
    ...DEFAULT_WORKER,
    name: registered.name || DEFAULT_WORKER.name,
    email: registered.email || DEFAULT_WORKER.email,
    phone: registered.phone || '',
    address: registered.address || '',
    skills: registered.skills || [],
    profileImage: registered.profileImage || null,
    avatar,
  };
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Prefer the registered profile; fall back to a stored session user
    const registered = readRegisteredProfile();
    if (registered) return buildUser(registered);
    try {
      const saved = localStorage.getItem('user');
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return DEFAULT_WORKER;
  });

  // Sync user → localStorage (so refreshes keep state)
  useEffect(() => {
    if (user) {
      // Never store the password — only safe profile fields
      const safe = { id: user.id, role: user.role, name: user.name, email: user.email,
        phone: user.phone, address: user.address, skills: user.skills, avatar: user.avatar,
        profileImage: user.profileImage || null,
        profileComplete: user.profileComplete, verified: user.verified };
      localStorage.setItem('user', JSON.stringify(safe));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Re-hydrate when gigWorkerProfile is updated (e.g., after OTP verify)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'gigWorkerProfile') {
        const registered = readRegisteredProfile();
        if (registered) setUser(buildUser(registered));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = (roleOrUser) => {
    if (typeof roleOrUser === 'object' && roleOrUser !== null) {
      // Called with a full user object (e.g., from Verification page)
      setUser(prev => ({ ...prev, ...roleOrUser }));
      return true;
    }
    // Called with role string — re-hydrate from registered profile if present
    const registered = readRegisteredProfile();
    setUser(registered ? buildUser(registered) : DEFAULT_WORKER);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  /** Update editable profile fields and persist to gigWorkerProfile. */
  const updateProfile = (updates) => {
    setUser(prev => {
      const next = { ...prev, ...updates };
      // Keep gigWorkerProfile in sync
      try {
        const existing = JSON.parse(localStorage.getItem('gigWorkerProfile') || '{}');
        localStorage.setItem('gigWorkerProfile', JSON.stringify({ ...existing, ...updates }));
      } catch { /* ignore */ }
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

