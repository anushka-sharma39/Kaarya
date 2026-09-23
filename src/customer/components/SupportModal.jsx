import React from 'react';
import { Phone, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Modals.css';

export default function SupportModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content text-center" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="modal-icon-large text-purple">
          <Phone size={48} />
        </div>
        <h2 className="modal-title">{t('support.needHelp')}</h2>
        <p className="modal-subtitle">{t('support.callTollFree')}</p>
        <h1 className="toll-free-number text-gradient">{t('support.number')}</h1>
        <p className="modal-desc">
          {t('support.noInternet')}
        </p>
        <div className="modal-actions">
          <button className="btn btn-primary w-full" onClick={onClose}>{t('support.callNow')}</button>
          <button className="btn btn-secondary w-full" onClick={onClose}>{t('booking.close')}</button>
        </div>
      </div>
    </div>
  );
}
