import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gigs } from '../data/mockData';
import { Card, CardContent } from '../components/Card';
import Button from '../components/Button';
import { ArrowLeft, Bookmark, Share2, MapPin, Clock, Calendar, ShieldCheck, Star, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [hasApplied, setHasApplied] = useState(false);
  
  const gig = gigs.find(g => g.id === id);

  if (!gig) {
    return <div className="text-center py-12">{t('empty.noGigs') || 'Gig not found.'}</div>;
  }

  const handleApply = () => {
    // Mock application submission
    setHasApplied(true);
    setTimeout(() => {
      navigate('/worker/applications');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <Link to="/worker/gigs" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image */}
      <img src={gig.image} alt={gig.title[language] || gig.title.en} className="w-full h-64 sm:h-80 object-cover rounded-3xl shadow-sm" />

      {/* Title & Basics */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">{gig.title[language] || gig.title.en}</h1>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1 font-medium text-slate-900 dark:text-slate-200">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            {gig.rating} ({gig.reviews} {t('work.reviews')?.toLowerCase() || 'reviews'})
          </span>
          <span>•</span>
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {gig.distance[language] || gig.distance.en}</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-2xl font-bold text-primary-700 dark:text-primary-400">{gig.payment[language] || gig.payment.en}</p>
          {hasApplied ? (
            <Button disabled className="bg-green-600 text-white opacity-100 dark:bg-green-600">Applied Successfully ✓</Button>
          ) : (
            <Button onClick={handleApply} size="lg" className="w-full sm:w-auto px-8">{t('gigs.applyNow')}</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
        <div className="flex flex-col items-center justify-center p-3 text-center">
          <Calendar className="w-5 h-5 text-slate-400 mb-2" />
          <span className="text-xs text-slate-500 dark:text-slate-400">{t('gigs.duration')}</span>
          <span className="text-sm font-medium">{gig.duration[language] || gig.duration.en}</span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 text-center">
          <Briefcase className="w-5 h-5 text-slate-400 mb-2" />
          <span className="text-xs text-slate-500 dark:text-slate-400">{t('gigs.workType')}</span>
          <span className="text-sm font-medium">{gig.workType[language] || gig.workType.en}</span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 text-center">
          <Clock className="w-5 h-5 text-slate-400 mb-2" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Posted</span>
          <span className="text-sm font-medium">{gig.postedDate[language] || gig.postedDate.en}</span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 text-center">
          <ShieldCheck className={`w-5 h-5 mb-2 ${gig.verified ? 'text-green-500' : 'text-slate-400'}`} />
          <span className="text-xs text-slate-500 dark:text-slate-400">Employer</span>
          <span className="text-sm font-medium">{gig.verified ? 'Verified' : 'Unverified'}</span>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">{t('gigs.description')}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {gig.description[language] || gig.description.en}
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">{t('gigs.requirements')}</h3>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 text-sm space-y-1">
            {gig.requirements.map((req, i) => (
              <li key={i}>{req[language] || req.en}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">About the Employer</h3>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-lg font-bold text-slate-500">
                {gig.employer.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold">{gig.employer}</h4>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  4.6 (320 {t('work.reviews')?.toLowerCase() || 'reviews'})
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
      
    </div>
  );
};

export default GigDetails;
