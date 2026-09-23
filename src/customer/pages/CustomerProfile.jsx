import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Package, MapPin, Phone, Mail, LogOut, Repeat, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useSession } from '../../app/auth/AuthContext';
import './CustomerProfile.css';

export default function CustomerProfile() {
  const { t } = useLanguage();
  const { orders, savedWorkers } = useUser();
  const { logout, switchRole } = useSession();
  const navigate = useNavigate();

  const completed = orders.filter((o) => o.status === 'completed').length;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleSwitch = () => {
    switchRole('worker');
    navigate('/worker', { replace: true });
  };

  return (
    <div className="customer-profile-page container mt-section mb-section">
      <div className="cp-hero glass-card">
        <img
          className="cp-avatar"
          src="https://i.pravatar.cc/160?u=kaarya-demo-user"
          alt={t('navbar.demoUser')}
        />
        <div className="cp-hero-body">
          <span className="badge badge-green">
            <ShieldCheck size={13} /> Verified customer
          </span>
          <h1>{t('navbar.demoUser')}</h1>
          <p className="cp-meta">
            <MapPin size={15} /> {t('navbar.locationCity')}
          </p>
        </div>
      </div>

      <div className="cp-stats">
        <div className="cp-stat">
          <span className="cp-stat-value">{orders.length}</span>
          <span className="cp-stat-label">{t('navbar.myOrders')}</span>
        </div>
        <div className="cp-stat">
          <span className="cp-stat-value">{completed}</span>
          <span className="cp-stat-label">Completed</span>
        </div>
        <div className="cp-stat">
          <span className="cp-stat-value">{savedWorkers.length}</span>
          <span className="cp-stat-label">{t('navbar.savedWorkers')}</span>
        </div>
      </div>

      <div className="cp-grid">
        <section className="cp-card">
          <h3>Contact details</h3>
          <ul className="cp-list">
            <li>
              <Phone size={16} /> +91 98XXX 43210
            </li>
            <li>
              <Mail size={16} /> customer@kaarya.demo
            </li>
            <li>
              <MapPin size={16} /> {t('navbar.locationCity')}
            </li>
          </ul>
        </section>

        <section className="cp-card">
          <h3>Quick links</h3>
          <div className="cp-links">
            <Link to="/customer/orders" className="cp-link">
              <Package size={16} /> {t('navbar.myOrders')}
            </Link>
            <Link to="/customer/saved-workers" className="cp-link">
              <Heart size={16} /> {t('navbar.savedWorkers')}
            </Link>
            <button type="button" className="cp-link" onClick={handleSwitch}>
              <Repeat size={16} /> Switch to Gig Worker
            </button>
            <button type="button" className="cp-link cp-link-danger" onClick={handleLogout}>
              <LogOut size={16} /> {t('navbar.logout')}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
