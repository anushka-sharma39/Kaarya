import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, Bell, ChevronDown, Heart, Phone, LogOut, Sun, Moon, Sparkles, UserRound } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import RoleMenu from '../../shared/RoleMenu';
import { useSession } from '../../app/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ onSupportClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const { t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/customer/customer" className="navbar-logo" style={{ textDecoration: 'none' }}>
          <Sparkles className="brand-flourish" size={14} />
          <span className="brand-word">kaarya</span>
          <span className="brand-tag">{t('brand.tagline')}</span>
        </Link>

        <div className="navbar-actions">
          <button className="location-pill" type="button">
            <MapPin size={15} />
            <span>{t('navbar.locationCity')}</span>
            <ChevronDown size={13} />
          </button>

          <LanguageSwitcher compact />

          <button
            className="icon-btn theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={isDark ? t('navbar.switchToLight') : t('navbar.switchToDark')}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="notif-wrap" ref={notifRef}>
            <button
              className="icon-btn"
              onClick={() => setNotifOpen(!notifOpen)}
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="notif-badge">3</span>
            </button>
            {notifOpen && (
              <div className="notif-dropdown">
                <p className="notif-title">{t('navbar.notifications')}</p>
                <div className="notif-item">
                  <strong>{t('navbar.notifBookingTitle')}</strong>
                  <span>{t('navbar.notifBookingDesc')}</span>
                </div>
                <div className="notif-item">
                  <strong>{t('navbar.notifOfferTitle')}</strong>
                  <span>{t('navbar.notifOfferDesc')}</span>
                </div>
                <div className="notif-item">
                  <strong>{t('navbar.notifReminderTitle')}</strong>
                  <span>{t('navbar.notifReminderDesc')}</span>
                </div>
              </div>
            )}
          </div>

          <RoleMenu variant="customer" avatar="https://i.pravatar.cc/80?u=kaarya-demo-user" />
        </div>
      </div>

      {/* Slide-down menu (nav links + settings) */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/customer/customer" className="mobile-link" onClick={() => setMenuOpen(false)}>{t('navbar.home')}</Link>
          <Link to="/customer/services" className="mobile-link" onClick={() => setMenuOpen(false)}>{t('navbar.services')}</Link>
          <Link to="/customer/ai-diagnosis" className="mobile-link" onClick={() => setMenuOpen(false)}>{t('navbar.aiDiagnosis')}</Link>
          <Link to="/customer/find-worker" className="mobile-link" onClick={() => setMenuOpen(false)}>{t('navbar.findWorkers')}</Link>
          <Link to="/customer/orders" className="mobile-link" onClick={() => setMenuOpen(false)}>{t('navbar.myOrders')}</Link>

          <div className="mobile-profile-section">
            <p className="mobile-section-title">{t('navbar.demoUser')}</p>
            <Link to="/customer/saved-workers" className="mobile-link small" onClick={() => setMenuOpen(false)}>
              <Heart size={15} /> {t('navbar.savedWorkers')}
            </Link>
            <button className="mobile-link small" onClick={() => { onSupportClick(); setMenuOpen(false); }}>
              <Phone size={15} /> {t('navbar.help')}
            </button>
            <Link to="/customer/profile" className="mobile-link small" onClick={() => setMenuOpen(false)}>
              <UserRound size={15} /> {t('navbar.profile')}
            </Link>
            <button className="mobile-link small text-red" onClick={handleLogout}>
              <LogOut size={15} /> {t('navbar.logout')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
