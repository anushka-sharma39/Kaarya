import React from 'react';
import { Mic, Video as VideoIcon, PhoneOff, MonitorUp, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './VideoCall.css';

export default function VideoCall({ worker, onClose }) {
  const { t } = useLanguage();
  if (!worker) return null;

  return (
    <div className="video-call-overlay">
      <div className="video-call-container">
        <div className="video-main-area">
          <div className="technician-video">
            <img src={worker.avatar} alt={worker.name} className="mock-video-bg" />
            <div className="video-worker-info">
              <h3>{worker.name}</h3>
              <p>{worker.role}</p>
            </div>
          </div>
          <div className="user-video-pip">
            <div className="pip-placeholder">{t('videoCall.you')}</div>
          </div>

          <div className="video-controls">
            <button className="control-btn"><Mic size={20} /></button>
            <button className="control-btn"><VideoIcon size={20} /></button>
            <button className="control-btn"><MonitorUp size={20} /></button>
            <button className="control-btn"><MessageSquare size={20} /></button>
            <button className="control-btn end-call" onClick={onClose}><PhoneOff size={20} /></button>
          </div>
        </div>

        <div className="video-side-panel">
          <div className="panel-header">
            <h3>{t('videoCall.aiAssistant')}</h3>
          </div>
          <div className="panel-content">
            <div className="ai-insight">
              <span className="insight-badge">{t('videoCall.activeDiagnosis')}</span>
              <p>{t('videoCall.aiInsight')}</p>
            </div>
            
            <button className="btn btn-primary w-full mt-auto" onClick={onClose}>
              {t('videoCall.bookNow')} {worker.name.split(' ')[0]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
