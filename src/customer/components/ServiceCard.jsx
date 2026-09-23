import React from 'react';
import { translateText } from '../translations/dataTranslations';
import * as Icons from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ServiceCard.css';

export default function ServiceCard({ service }) {
  const IconComponent = Icons[service.icon];
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleFindWorkers = (e) => {
    e.stopPropagation();
    navigate(`/customer/services/${service.slug}`);
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate(`/customer/services/${service.slug}?action=book`);
  };

  return (
    <div className="card service-card" onClick={handleFindWorkers}>
      <div className="service-icon-wrapper">
        {IconComponent && <IconComponent size={26} strokeWidth={1.75} />}
      </div>

      <h3 className="service-title">{translateText(service.name, language)}</h3>
<p className="service-desc">{translateText(service.description, language)}</p>

      <div className="service-meta">
        <div className="service-rating">
          <Star size={13} className="star-icon" fill="currentColor" />
          <span>{service.rating || '4.8'}</span>
        </div>
        <span className="meta-dot" aria-hidden="true">•</span>
        <div className="service-experts">
          <Users size={13} />
          <span>{service.expertsCount} {t('services.expertsNearby')}</span>
        </div>
      </div>

      <div className="service-price">
        {t('services.from') || 'From'} <strong>₹{service.startingPrice || '399'}</strong>
      </div>

      <div className="service-card-actions">
        <button className="sc-btn sc-btn-outline" onClick={handleFindWorkers}>
          {t('services.findWorkers')}
        </button>
        <button className="sc-btn sc-btn-primary" onClick={handleBookNow}>
          {t('worker.bookNow')}
        </button>
      </div>
    </div>
  );
}
