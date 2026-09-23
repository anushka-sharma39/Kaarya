import React, { useState } from 'react';
import { Card, CardContent } from '../components/Card';
import Badge from '../components/Badge';
import { workHistory, gigs } from '../data/mockData';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const MyWork = () => {
  const [tab, setTab] = useState('Ongoing');
  const { t, language } = useLanguage();
  
  const tabs = [
    { id: 'Ongoing', label: t('work.ongoing') || 'Ongoing' },
    { id: 'Upcoming', label: t('work.upcoming') || 'Upcoming' },
    { id: 'Completed', label: t('work.completed') || 'Completed' }
  ];

  const filteredWork = workHistory.filter(work => work.status === tab);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('nav.myWork')}</h1>
      
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
        {filteredWork.map(work => {
          const gig = gigs.find(g => g.id === work.gigId);
          if (!gig) return null;

          return (
            <Card key={work.id}>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{gig.title[language] || gig.title.en}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{work.employer}</p>
                  </div>
                  <Badge variant={work.status === 'Completed' ? 'success' : 'default'}>
                    {tabs.find(t => t.id === work.status)?.label || work.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('gigs.payment')}</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">{work.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Date</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      {work.startDate} {work.endDate ? `- ${work.endDate}` : ''}
                    </p>
                  </div>
                </div>

                {work.status === 'Completed' && work.rating && (
                  <div className="bg-sage-50 dark:bg-sage-900/30 rounded-xl p-3 flex items-center justify-between">
                    <span className="text-sm text-sage-800 dark:text-sage-200">Worker Rating</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className={`w-4 h-4 ${star <= work.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
        
        {filteredWork.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">No {tabs.find(t => t.id === tab)?.label.toLowerCase()} work right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWork;
