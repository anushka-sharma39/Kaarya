import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import '../admin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError('Incorrect email or password.');
      setLoading(false);
      return;
    }

    navigate('/admin/workers');
  };

  return (
    <div className="av-page">
      <form className="av-card" onSubmit={handleSubmit}>
        <h1 className="av-title">Kaarya Admin</h1>
        <p className="av-subtitle">Sign in to manage worker verification.</p>

        <label className="av-label" htmlFor="adminEmail">Email</label>
        <input
          id="adminEmail"
          type="email"
          className="av-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />

        <label className="av-label" htmlFor="adminPassword">Password</label>
        <input
          id="adminPassword"
          type="password"
          className="av-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error && <p className="av-error">{error}</p>}

        <button type="submit" className="av-btn" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}