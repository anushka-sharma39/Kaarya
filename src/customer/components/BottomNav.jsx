import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, Plus, Users, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './BottomNav.css';

export default function BottomNav() {
  const { t } = useLanguage();

  return (
    <nav className="bottom-nav" aria-label="Primary">
      <NavLink to="/customer/customer" end className={({ isActive }) => `bn-item ${isActive ? 'active' : ''}`}>
        <Home size={21} />
        <span>{t('navbar.home')}</span>
      </NavLink>

      <NavLink to="/customer/services" className={({ isActive }) => `bn-item ${isActive ? 'active' : ''}`}>
        <LayoutGrid size={21} />
        <span>{t('navbar.services')}</span>
      </NavLink>

      <NavLink to="/customer/ai-diagnosis" className="bn-item bn-center" aria-label={t('bottomNav.postTask')}>
        <span className="bn-center-btn"><Plus size={24} /></span>
        <span className="bn-center-label">{t('bottomNav.postTask')}</span>
      </NavLink>

      <NavLink to="/customer/find-worker" className={({ isActive }) => `bn-item ${isActive ? 'active' : ''}`}>
        <Users size={21} />
        <span>{t('navbar.community')}</span>
      </NavLink>

      <NavLink to="/customer/saved-workers" className={({ isActive }) => `bn-item ${isActive ? 'active' : ''}`}>
        <User size={21} />
        <span>{t('navbar.profile')}</span>
      </NavLink>
    </nav>
  );
}
