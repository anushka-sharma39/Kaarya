import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import WorkerCard from '../components/WorkerCard';
import BookingModal from '../components/BookingModal';
import VideoCall from '../components/VideoCall';
import { workers } from '../data/workers';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import './SavedWorkers.css';

export default function SavedWorkers() {
  const { t } = useLanguage();
  const { savedWorkers } = useUser();
  const [bookingWorker, setBookingWorker] = useState(null);
  const [videoWorker, setVideoWorker] = useState(null);

  const myWorkers = workers.filter(w => savedWorkers.includes(w.id));

  return (
    <div className="saved-workers-page container mt-section mb-section">
      <div className="text-center mb-12">
        <span className="saved-badge">
          <Heart size={16} fill="currentColor" /> {t('savedWorkers.title')}
        </span>
        <h1>{t('savedWorkers.title')}</h1>
        <p className="mt-4 text-xl">{t('savedWorkers.subtitle')}</p>
      </div>

      {myWorkers.length === 0 ? (
        <div className="empty-state">
          <Heart size={48} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-navy mb-2">{t('savedWorkers.empty')}</h3>
          <p className="text-muted mb-6">{t('savedWorkers.emptyDesc')}</p>
          <Link to="/customer/find-worker" className="btn btn-primary">{t('savedWorkers.browse')}</Link>
        </div>
      ) : (
        <div className="workers-grid">
          {myWorkers.map(worker => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              onBook={(w) => setBookingWorker(w)}
              onVideoCall={(w) => setVideoWorker(w)}
            />
          ))}
        </div>
      )}

      <BookingModal
        isOpen={!!bookingWorker}
        onClose={() => setBookingWorker(null)}
        worker={bookingWorker}
      />

      {videoWorker && (
        <VideoCall
          worker={videoWorker}
          onClose={() => setVideoWorker(null)}
        />
      )}
    </div>
  );
}
