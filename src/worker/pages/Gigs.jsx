import React, { useState } from 'react';
import { Card } from '../components/Card';
import Input from '../components/Input';
import { Search, MapPin, Star, Filter, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gigs } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

const Gigs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const { t, language } = useLanguage();

  const filterOptions = [
    { id: 'All', label: t('gigs.filterAll') || 'All' },
    { id: 'Nearby', label: t('gigs.filterNearby') || 'Nearby' },
    { id: 'Highest Pay', label: t('gigs.filterHighestPay') || 'Highest Pay' },
    { id: 'Rating', label: t('gigs.filterRating') || 'Rating' }
  ];

  const filteredGigs = gigs.filter(gig => {
    const title = gig.title[language] || gig.title.en;
    const matchTitle = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSkills = gig.skills.some(skill => {
      const s = skill[language] || skill.en;
      return s.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return matchTitle || matchSkills;
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input 
            icon={Search} 
            placeholder={t('gigs.searchPlaceholder') || "Search gigs..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex-none p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filterOptions.map(f => (
          <button 
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f.id 
                ? 'bg-primary-700 text-white dark:bg-primary-600' 
                : 'bg-white text-slate-700 border border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredGigs.map(gig => (
          <Card key={gig.id} className="overflow-hidden hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
            <div className="p-4 flex gap-4">
              <img src={gig.image} alt={gig.title[language] || gig.title.en} className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover" />
              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate">{gig.title[language] || gig.title.en}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {gig.distance[language] || gig.distance.en}</span>
                      <span>•</span>
                      <span>{gig.postedDate[language] || gig.postedDate.en}</span>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-sm font-medium text-primary-700 dark:text-primary-400 mt-2">{gig.payment[language] || gig.payment.en}</p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {gig.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-sage-100 text-sage-700 dark:bg-sage-900/50 dark:text-sage-300 text-[10px] font-medium uppercase tracking-wider">
                      {skill[language] || skill.en}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-auto pt-4">
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {gig.rating} ({gig.reviews})
                  </div>
                  <Link to={`/worker/gigs/${gig.id}`} className="px-4 py-1.5 bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400 rounded-full text-xs font-medium hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors">
                    {t('gigs.applyNow')}
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {filteredGigs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">{t('empty.noGigs')}</p>
            <button onClick={() => setSearchTerm('')} className="mt-4 text-primary-600 font-medium">{t('gigs.clearFilters') || 'Clear Filters'}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gigs;
