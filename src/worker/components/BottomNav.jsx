import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, FileText, Users, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils/cn';

const BottomNav = () => {
  const { t } = useLanguage();

  const navItems = [
    { to: '/worker/dashboard', icon: Home, label: t('nav.dashboard') },
    { to: '/worker/gigs', icon: Briefcase, label: t('nav.findGigs') },
    { to: '/worker/work', icon: FileText, label: t('nav.myWork') },
    { to: '/worker/community', icon: Users, label: t('nav.community') },
    { to: '/worker/profile', icon: User, label: t('nav.profile') },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-colors",
              isActive 
                ? "text-primary-700 dark:text-primary-500" 
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
