import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { Bell, Menu, Leaf, Check } from 'lucide-react';
import RoleMenu from '../../shared/RoleMenu';
import { notifications as mockNotifications } from '../data/mockData';

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/worker/worker" className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-100 dark:bg-primary-900/50 rounded-lg text-primary-700 dark:text-primary-500">
                <Leaf className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Kaarya</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            
            {user ? (
              <>
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900"></span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-50">
                      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-semibold text-slate-900 dark:text-white">{t('nav.notifications')}</h3>
                        <button className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                          <Check className="w-3 h-3" /> {t('notif.markAllRead') || 'Mark all read'}
                        </button>
                      </div>
                      <div className="max-h-[350px] overflow-y-auto">
                        {mockNotifications.map(notification => (
                          <div key={notification.id} className={`p-4 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${notification.read ? 'opacity-70' : 'bg-primary-50/30 dark:bg-primary-900/10'}`}>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className={`text-sm ${notification.read ? 'font-medium text-slate-700 dark:text-slate-300' : 'font-semibold text-slate-900 dark:text-white'}`}>
                                {notification.title[language] || notification.title.en}
                              </h4>
                              <span className="text-xs text-slate-500">{notification.time[language] || notification.time.en}</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                              {notification.description[language] || notification.description.en}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="ml-1">
                  <RoleMenu variant="worker" avatar={user.avatar} />
                </div>
              </>
            ) : (
              <Link to="/worker/login" className="text-sm font-medium text-primary-700 dark:text-primary-500 hover:text-primary-800 dark:hover:text-primary-400">
                {t('auth.login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
