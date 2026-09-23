import React, { useState } from 'react';
import { Card, CardContent } from '../components/Card';
import Badge from '../components/Badge';
import { applications, gigs } from '../data/mockData';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Applications = () => {
  const [tab, setTab] = useState('Pending');
  const { t, language } = useLanguage();
  
  const tabs = [
    { id: 'Pending', label: t('app.applied') || 'Applied' },
    { id: 'Shortlisted', label: t('app.shortlisted') || 'Shortlisted' },
    { id: 'Accepted', label: t('app.accepted') || 'Accepted' },
    { id: 'Rejected', label: t('app.rejected') || 'Rejected' }
  ];

  const filteredApps = applications.filter(app => app.status === tab);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('nav.applications')}</h1>
      
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-slate-200 dark:border-slate-800">
        {tabs.map(tOption => (
          <button 
            key={tOption.id}
            onClick={() => setTab(tOption.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
              tab === tOption.id 
                ? 'text-primary-700 dark:text-primary-400' 
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {tOption.label}
            {tab === tOption.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-700 dark:bg-primary-400" />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredApps.map(app => {
          const gig = gigs.find(g => g.id === app.gigId);
          if (!gig) return null;

          return (
            <Card key={app.id} className="overflow-hidden">
              <div className="p-4 flex gap-4">
                <img src={gig.image} alt={gig.title[language] || gig.title.en} className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl object-cover" />
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate pr-4">{gig.title[language] || gig.title.en}</h3>
                    <Badge variant={app.status === 'Pending' ? 'warning' : app.status === 'Accepted' ? 'success' : app.status === 'Rejected' ? 'danger' : 'default'}>
                      {tabs.find(t => t.id === app.status)?.label || app.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{gig.employer}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-400">{gig.payment[language] || gig.payment.en}</span>
                    <span className="text-xs text-slate-400">{app.appliedAt[language] || app.appliedAt.en}</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-3 flex justify-end">
                <Link to={`/worker/gigs/${gig.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                  {t('gigs.viewDetails')}
                </Link>
              </div>
            </Card>
          );
        })}
        
        {filteredApps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">{t('empty.noApplications')}</p>
            <Link to="/worker/gigs" className="mt-4 inline-block text-primary-600 font-medium">{t('nav.findGigs')}</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
