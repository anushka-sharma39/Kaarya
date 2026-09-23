import { translateText } from '../translations/dataTranslations';
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, CheckCircle, Video, Calendar, Heart, Briefcase, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import './WorkerCard.css';

export default function WorkerCard({ worker, onBook, onVideoCall }) {
  const { t,language } = useLanguage();
  const { isWorkerSaved, toggleSavedWorker } = useUser();
  const saved = isWorkerSaved(worker.id);

  return (
    <div className="card worker-card">
      {worker.aiMatch && (
        <div className="ai-match-chip">
          <Sparkles size={12} />
          {worker.aiMatch}% {t('worker.aiMatch')}
        </div>
      )}

      <div className="worker-header">
        <img src={worker.avatar} alt={worker.name} className="worker-avatar" />
        <div className="worker-info">
          <h3 className="worker-name">
            {worker.name}
            {worker.verified && <CheckCircle size={15} className="verified-badge" />}
          </h3>
          <p className="worker-role">{translateText(worker.role, language)}</p>
        </div>
        <button
          className={`save-worker-btn ${saved ? 'saved' : ''}`}
          onClick={() => toggleSavedWorker(worker.id)}
          aria-label={t('worker.saveWorker') || 'Save worker'}
        >
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="worker-stats">
        <div className="stat">
          <Star size={15} className="stat-icon text-purple" fill="currentColor" />
          <span>{worker.rating} ({worker.reviews})</span>
        </div>
        <span className="stat-divider" aria-hidden="true" />
        <div className="stat">
          <MapPin size={15} className="stat-icon" />
          <span>{worker.distance} {t('worker.away')}</span>
        </div>
      </div>

      <div className="worker-details">
        {worker.experience && (
          <p className="jobs-completed"><Briefcase size={14} className="inline-icon" /> {worker.experience} {t('worker.experience')}</p>
        )}
        <p className="jobs-completed">{worker.jobsCompleted}+ {t('worker.jobsCompleted')}</p>
        <div className="worker-price-row">
          <p className="worker-price">{t('worker.starting')} ₹{worker.price}</p>
          <p className={`worker-availability ${worker.available ? 'text-green' : 'text-red'}`}>
            <span className="availability-dot" />
            {worker.available ? t('worker.availableNow') : t('worker.currentlyBusy') || 'Currently Busy'}
          </p>
        </div>
      </div>

      <div className="worker-actions">
        <Link to={`/customer/worker/${worker.id}`} className="wc-btn wc-btn-outline wc-btn-full">
          {t('worker.viewProfile')}
        </Link>
        <div className="worker-actions-row">
          <button className="wc-btn wc-btn-primary" onClick={() => onBook(worker)}>
            <Calendar size={16} /> {t('worker.bookNow')}
          </button>
          <button className="wc-btn wc-btn-secondary" onClick={() => onVideoCall(worker)}>
            <Video size={16} /> {t('worker.videoCall')}
          </button>
        </div>
      </div>
    </div>
  );
}
