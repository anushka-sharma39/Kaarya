import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Filter, Sparkles, MapPin } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import WorkerCard from '../components/WorkerCard';
import { services } from '../data/services';
import { workers } from '../data/workers';
import { useLanguage } from '../context/LanguageContext';
import './Services.css';

export default function Services() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('services');
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');

  const handleBook = (worker) => {
    navigate('/customer/find-worker');
  };

  return (
    <div className="services-page container mt-section mb-section">
      <div className="text-center mb-12">
        <h1>{t('services.title')}</h1>
        <p className="mt-4 text-xl">{t('services.popularCategories')}</p>
      </div>

      <div className="services-search-container card shadow-floating mb-12">
        <div className="services-search-input">
          <Search size={24} className="text-muted" />
          <input 
            type="text" 
            placeholder={t('search.placeholder')} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/customer/ai-diagnosis')}>
          <Sparkles size={20} /> {t('worker.aiMatch')}
        </button>
      </div>

      <div className="services-grid">
        {services.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map(service => (
          <ServiceCard 
            key={service.id} 
            service={service} 
          />
        ))}
      </div>
    </div>
  );
}
