import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { CheckCircle2, Star, MapPin } from 'lucide-react';
import { gigs } from '../data/mockData';

const GigCard = ({ gig }) => {
  const { t, language } = useLanguage();
  return (
    <Card className="overflow-hidden hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
      <div className="flex p-4 gap-4">
        <img src={gig.image} alt={gig.title[language] || gig.title.en} className="w-24 h-24 rounded-xl object-cover" />
        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="font-semibold text-slate-900 dark:text-white truncate">{gig.title[language] || gig.title.en}</h3>
          <p className="text-sm font-medium text-primary-700 dark:text-primary-400 mt-0.5">{gig.payment[language] || gig.payment.en}</p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {gig.distance[language] || gig.distance.en}</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {gig.rating}</span>
          </div>
          <div className="mt-auto pt-3">
            <Link to={`/worker/gigs/${gig.id}`} className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400 rounded-full text-xs font-medium hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors">
              {t('gigs.quickApply')}
            </Link>
          </div>
        </div>
      </div>
    </Card >
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img src={user?.avatar} alt="Profile" className="w-16 h-16 rounded-full border-2 border-white dark:border-slate-800 shadow-sm" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {t('dashboard.hello')}, {user?.name?.split(' ')[0]} 👋
            {user?.verified && <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-500" />}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">{t('dashboard.readyForWork')}</p>
        </div>
      </div>

      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-primary-800 text-white p-6 md:p-8">
        <div className="relative z-10 w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
            {t('dashboard.heroTitle')}
          </h2>
          <p className="text-primary-100 text-sm mb-6">
            {t('dashboard.heroSubtitle')}
          </p>

        </div>
        <div className="absolute inset-y-0 right-0 w-1/3">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-800/95 via-primary-800/80 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
            alt="Worker"
            className="h-full w-full object-cover opacity-85"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('dashboard.popularGigs')}</h2>
          <Link to="/worker/gigs" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">{t('dashboard.seeAll')}</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { icon: "🏗️", label: t('category.construction'), color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
            { icon: "🏠", label: t('category.homeRepairs'), color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
            { icon: "🧹", label: t('category.cleaning'), color: "bg-sage-200 text-sage-800 dark:bg-sage-800 dark:text-sage-300" },
            { icon: "📦", label: t('category.delivery'), color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" }
          ].map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${cat.color}`}>
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 text-center">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Gigs */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{t('dashboard.recommendedGigs')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gigs.slice(0, 3).map(gig => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
