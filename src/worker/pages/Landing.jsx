import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';
import { Briefcase, ShieldCheck, Users, TrendingUp } from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (user) {
    return <Navigate to="/worker/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-[rgb(22,31,25)] text-slate-900 dark:text-[#26382e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary-900 dark:text-primary-400">
              {t('auth.findWork')}<br />{t('auth.buildFuture')}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md">
              {t('auth.trusted')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/worker/register">
                <Button size="lg" className="w-full sm:w-auto">{t('auth.register')} →</Button>
              </Link>
              <Link to="/worker/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">{t('auth.alreadyHaveAccount')}</Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-primary-200 dark:bg-primary-900/40 rounded-3xl transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
              alt="Worker painting" 
              className="relative rounded-3xl shadow-xl object-cover h-[400px] w-full"
            />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-primary-900 dark:text-primary-400">{t('auth.howItWorks')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: t('auth.verifiedOpps'), desc: t('auth.verifiedDesc') },
              { icon: Briefcase, title: t('auth.fairPay'), desc: t('auth.fairPayDesc') },
              { icon: Users, title: t('auth.workerComm'), desc: t('auth.workerCommDesc') },
              { icon: TrendingUp, title: t('auth.skillRec'), desc: t('auth.skillRecDesc') }
            ].map((feature, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-700 dark:text-primary-400 mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
