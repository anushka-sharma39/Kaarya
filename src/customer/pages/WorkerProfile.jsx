import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { workers } from '../data/workers';
import { useLanguage } from '../context/LanguageContext';
import { Star, CheckCircle, MapPin, Clock, Briefcase, Phone, MessageSquare, Video, Calendar, Heart } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import VideoCall from '../components/VideoCall';
import { useUser } from '../context/UserContext';
import { useSupport } from '../context/SupportContext';
import './WorkerProfile.css';

export default function WorkerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isWorkerSaved, toggleSavedWorker } = useUser();
  const { openSupport } = useSupport();
  const worker = workers.find(w => w.id === parseInt(id));
  
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [videoCallOpen, setVideoCallOpen] = useState(false);

  if (!worker) return <div className="container mt-8 text-center">{t('worker.workerNotFound')}</div>;

  const saved = isWorkerSaved(worker.id);

  return (
    <div className="worker-profile-page bg-gray-50 min-h-screen pb-16 pt-8">
      <div className="container mb-6">
        <div className="flex items-center text-sm text-muted">
          <Link to="/customer/customer" className="hover:text-navy">{t('services.breadcrumbHome')}</Link>
          <span className="mx-2">/</span>
          <Link to="/customer/services" className="hover:text-navy">{t('navbar.services')}</Link>
          <span className="mx-2">/</span>
          <Link to={`/customer/services/${worker.service.toLowerCase().replace(/ /g, '-')}`} className="hover:text-navy">{worker.service}</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-navy">{worker.name}</span>
        </div>
      </div>
      <div className="container profile-grid">
        {/* Left Column: Details */}
        <div className="profile-main">
          <div className="card profile-header-card">
            <div className="profile-header-content">
              <img src={worker.avatar} alt={worker.name} className="profile-avatar-large" />
              <div className="profile-info-large">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="profile-name">{worker.name}</h1>
                  {worker.verified && (
                    <span className="badge badge-green flex items-center gap-1">
                      <CheckCircle size={14} /> {t('worker.verifiedWorker')}
                    </span>
                  )}
                </div>
                <p className="profile-role text-lg text-muted mb-4">{worker.role}</p>

                <div className="profile-stats-grid">
                  <div className="profile-stat-item">
                    <Star size={18} className="text-purple" fill="currentColor" />
                    <span className="stat-value">{worker.rating}</span>
                    <span className="stat-label">({worker.reviews} {t('worker.reviews')})</span>
                  </div>
                  {worker.experience && (
                    <div className="profile-stat-item">
                      <Briefcase size={18} className="text-navy" />
                      <span className="stat-value">{worker.experience}</span>
                      <span className="stat-label">{t('worker.experience')}</span>
                    </div>
                  )}
                  <div className="profile-stat-item">
                    <CheckCircle size={18} className="text-green" />
                    <span className="stat-value">{worker.jobsCompleted}+</span>
                    <span className="stat-label">{t('worker.jobsCompleted')}</span>
                  </div>
                  <div className="profile-stat-item">
                    <MapPin size={18} className="text-red" />
                    <span className="stat-value">{worker.distance}</span>
                    <span className="stat-label">{t('worker.away')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-sm">
                  <MapPin size={16} className="text-muted" /> {worker.location || t('worker.local')}
                  <span className="mx-2 text-muted">•</span>
                  <span className={worker.available ? 'text-green font-bold' : 'text-red font-bold'}>
                    {worker.available ? t('worker.availableNow') : t('worker.busy')}
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              className={`profile-save-btn ${saved ? 'saved' : ''}`}
              onClick={() => toggleSavedWorker(worker.id)}
            >
              <Heart size={24} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="card mt-6">
            <h2>{t('worker.about')}</h2>
            <p className="mt-4 text-muted leading-relaxed">{worker.about || t('worker.defaultAbout')}</p>
          </div>

          <div className="card mt-6">
            <h2>{t('worker.skills')}</h2>
            <div className="skills-container mt-4">
              {worker.skills ? worker.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              )) : (
                <span className="skill-tag">{worker.service}</span>
              )}
            </div>
          </div>

          <div className="card mt-6 mb-8">
            <h2>{t('worker.reviews')}</h2>
            <div className="review-list mt-4">
              <div className="review-item">
                <div className="review-header">
                  <strong>{t('worker.review1Author')}</strong>
                  <div className="flex text-purple"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
                </div>
                <p className="text-sm text-muted mt-2">"{t('worker.review1Text')}"</p>
              </div>
              <div className="review-item">
                <div className="review-header">
                  <strong>{t('worker.review2Author')}</strong>
                  <div className="flex text-purple"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
                </div>
                <p className="text-sm text-muted mt-2">"{t('worker.review2Text')}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="profile-sidebar">
          <div className="card pricing-card sticky-sidebar">
            <h3 className="mb-4">{t('worker.serviceDetailsLabel')}</h3>
            <div className="pricing-item">
              <span>{t('worker.standardService')}</span>
              <strong>₹{worker.price}</strong>
            </div>
            {worker.emergencyPrice && (
              <div className="pricing-item">
                <span>{t('worker.emergencyVisit')}</span>
                <strong>₹{worker.emergencyPrice}</strong>
              </div>
            )}
            <hr className="my-4 border-gray-200" />
            
            <div className="profile-action-buttons">
              <button className="btn btn-primary w-full" onClick={() => setBookingModalOpen(true)}>
                <Calendar size={18} /> {t('worker.bookNow')}
              </button>
              <button className="btn btn-secondary w-full" onClick={() => setVideoCallOpen(true)}>
                <Video size={18} /> {t('worker.videoCall')}
              </button>
              <div className="flex gap-4 mt-2">
                <button className="btn btn-outline flex-1" onClick={() => setVideoCallOpen(true)}>
                  <MessageSquare size={18} /> {t('worker.message')}
                </button>
                <button className="btn btn-outline flex-1" onClick={openSupport}>
                  <Phone size={18} /> {t('worker.call')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={bookingModalOpen} 
        onClose={() => setBookingModalOpen(false)} 
        worker={worker} 
      />
      {videoCallOpen && (
        <VideoCall 
          worker={worker} 
          onClose={() => setVideoCallOpen(false)} 
        />
      )}
    </div>
  );
}
