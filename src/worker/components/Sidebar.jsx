import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, FileText, Users, Shield, MessageSquare, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils/cn';

const Sidebar = () => {
  const { t } = useLanguage();

  const navItems = [
    { to: '/worker/dashboard', icon: Home, label: t('nav.dashboard') },
    { to: '/worker/gigs', icon: Briefcase, label: t('nav.findGigs') },
    { to: '/worker/applications', icon: FileText, label: t('nav.applications') },
    { to: '/worker/work', icon: Briefcase, label: t('nav.myWork') },
    { to: '/worker/community', icon: Users, label: t('nav.community') },
    { to: '/worker/messages', icon: MessageSquare, label: t('nav.messages') },
    { to: '/worker/welfare', icon: Shield, label: t('nav.welfare') },
  ];

  const bottomItems = [
    { to: '/worker/profile', icon: User, label: t('nav.profile') },
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-500" 
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
        {bottomItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-500" 
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
