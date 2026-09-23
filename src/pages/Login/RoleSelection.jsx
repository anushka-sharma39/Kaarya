import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Sparkles, User, Wrench } from 'lucide-react';
import { useSession } from '../../app/auth/AuthContext';
import './RoleSelection.css';

const ROLES = [
  {
    id: 'customer',
    icon: User,
    emoji: '👤',
    title: 'Customer',
    tagline: 'Find. Book. Get things done.',
    points: [
      'Book trusted local services',
      'Discover skilled workers',
      'Manage bookings',
      'Track your services',
    ],
    cta: 'Continue as Customer',
  },
  {
    id: 'worker',
    icon: Wrench,
    emoji: '🛠️',
    title: 'Gig Worker',
    tagline: 'Work. Earn. Grow.',
    points: [
      'Find work opportunities',
      'Manage your services',
      'Accept bookings',
      'Track earnings',
    ],
    cta: 'Continue as Gig Worker',
  },
];

export default function RoleSelection({ mode = 'login' }) {
  const { login } = useSession();
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(null);

  useEffect(() => {
    document.body.classList.add('role-login');
    return () => document.body.classList.remove('role-login');
  }, []);

  const choose = (role) => {
    if (leaving) return;
    setLeaving(role);
    // Remove the instant login so they have to go through registration
    // login(role);
    window.setTimeout(() => navigate(`/${role}/register`), 380);
  };

  return (
    <div className={`rs-page ${leaving ? 'is-leaving' : ''}`}>
      <div className="rs-bg" aria-hidden="true">
        <span className="rs-orb rs-orb-1" />
        <span className="rs-orb rs-orb-2" />
        <span className="rs-orb rs-orb-3" />
        <span className="rs-jaali" />
      </div>

      <main className="rs-shell">
        <header className="rs-header">
          <div className="rs-brandmark">
            <Sparkles size={14} />
            <span>kaarya</span>
          </div>
          <h1 className="rs-wordmark">KAARYA</h1>
          <p className="rs-tagline">Kaam bhi. Kamaai bhi. Community bhi.</p>
          <p className="rs-oneline">One platform. Two journeys.</p>

          <div className="rs-welcome">
            <h2>Welcome to Kaarya</h2>
            <p>Choose how you want to use Kaarya</p>
          </div>
        </header>

        <div className="rs-cards">
          {ROLES.map((role, i) => (
            <article
              key={role.id}
              className={`rs-card rs-card-${role.id} ${leaving === role.id ? 'is-chosen' : ''}`}
              style={{ animationDelay: `${180 + i * 110}ms` }}
            >
              <div className="rs-card-glow" aria-hidden="true" />
              <div className="rs-card-top">
                <span className="rs-icon" aria-hidden="true">
                  <role.icon size={26} strokeWidth={1.8} />
                </span>
                <span className="rs-emoji" aria-hidden="true">
                  {role.emoji}
                </span>
              </div>

              <h3 className="rs-card-title">{role.title}</h3>
              <p className="rs-card-tagline">{role.tagline}</p>

              <ul className="rs-list">
                {role.points.map((p) => (
                  <li key={p}>
                    <span className="rs-dot" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>

              <button type="button" className="rs-cta" onClick={() => choose(role.id)}>
                <span>{role.cta}</span>
                <ArrowRight size={17} />
              </button>
            </article>
          ))}
        </div>

        <footer className="rs-foot">
          <p>You can switch roles anytime from your profile menu.</p>
          <div style={{ marginTop: '16px', fontSize: '0.9rem' }}>
            New to Kaarya? <Link to="/register" style={{ color: 'var(--rs-indigo)', fontWeight: '600', textDecoration: 'none' }}>Create an account</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
