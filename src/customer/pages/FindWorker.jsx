import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, SearchX } from 'lucide-react';
import WorkerCard from '../components/WorkerCard';
import BookingModal from '../components/BookingModal';
import VideoCall from '../components/VideoCall';
import CommunityCard from '../components/CommunityCard';
import { workers } from '../data/workers';
import { useLanguage } from '../context/LanguageContext';
import './FindWorker.css';

export default function FindWorker() {
  const location = useLocation();
  const { t } = useLanguage();
  const diagnosis = location.state?.diagnosis || {
    problemDetected: "AC Not Cooling",
    recommendedService: "AC Repair"
  };

  const [bookingWorker, setBookingWorker] = useState(null);
  const [videoWorker, setVideoWorker] = useState(null);

  // Filter workers based on recommended service (simulate AI Match sorting)
  const matchedWorkers = workers
    .filter(w => w.service === diagnosis.recommendedService || w.service === 'Appliance Repair')
    .sort((a, b) => b.aiMatch - a.aiMatch);

  const mockCommunityPosts = [
    {
      userName: "Rahul S.",
      timeAgo: "2 hours ago",
      category: diagnosis.recommendedService,
      content: `Has anyone experienced an issue similar to ${diagnosis.problemDetected.toLowerCase()}?`,
      response: {
        role: "Verified Technician",
        content: "It could be related to the internal components. I can help you check it through a video call to avoid an unnecessary visit."
      }
    },
    {
      userName: "Priya M.",
      timeAgo: "1 day ago",
      category: diagnosis.recommendedService,
      content: "Looking for a reliable expert for maintenance in the downtown area. Any recommendations?",
    }
  ];

  return (
    <div className="find-worker-page container mt-section mb-section">
      <div className="text-center mb-12">
        <h1>{t('worker.title')}</h1>
      </div>

      <div className="diagnosis-summary-bar">
        <div className="summary-item">
          <span className="summary-label">{t('worker.aiDiagnosis')}</span>
          <span className="summary-value">{diagnosis.problemDetected}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">{t('worker.recommendedService')}</span>
          <span className="summary-value text-purple flex-center gap-2">
            <Sparkles size={16} /> {diagnosis.recommendedService}
          </span>
        </div>
      </div>

      <div className="find-worker-layout">
        <div className="matched-workers-section">
          <h2 className="mb-6">{t('worker.aiMatched')}</h2>
          {matchedWorkers.length === 0 ? (
            <div className="empty-state">
              <SearchX size={40} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">{t('worker.noneFoundTitle')}</h3>
              <p className="text-muted mb-6">{t('worker.noneFoundDesc')}</p>
              <a href="/services" className="btn btn-primary">{t('worker.browseAllServices')}</a>
            </div>
          ) : (
            <div className="workers-list-vertical">
              {matchedWorkers.map(worker => (
                <WorkerCard
                  key={worker.id}
                  worker={worker}
                  onBook={(w) => setBookingWorker(w)}
                  onVideoCall={(w) => setVideoWorker(w)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="community-section">
          <div className="community-banner card">
            <h2>{t('community.title')}</h2>
            <p className="mt-2 text-muted">
              {t('home.howItAddresses')}
            </p>
          </div>
          <div className="community-feed mt-6">
            {mockCommunityPosts.map((post, idx) => (
              <CommunityCard key={idx} post={post} />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
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
