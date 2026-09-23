import React from 'react';
import { AlertCircle, CheckCircle, MapPin, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { translateText } from '../translations/dataTranslations';
import { useLanguage } from '../context/LanguageContext';
import useSpeech from '../../shared/useSpeech';
import { getSpeechLang } from '../../shared/languages';
import './DiagnosisResult.css';

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '');

export default function DiagnosisResult({ diagnosis, onFindWorkers }) {
  const { t, language } = useLanguage();
  const tts = useSpeech(getSpeechLang(language));

  // Hooks hamesha early return se pehle aane chahiye
  if (!diagnosis) return null;

  const urgency = capitalize(diagnosis.urgency); // 'high' -> 'High'
  const serviceLabel = translateText(diagnosis.recommendedService, language);
  const urgencyLabel = translateText(urgency, language);

  const spokenText =
    `${t('ai.detectedProblem')}: ${diagnosis.problemDetected}. ` +
    `${t('ai.recommendedService')}: ${serviceLabel}. ` +
    `${t('ai.urgency')}: ${urgencyLabel}. ` +
    `${diagnosis.suggestedAction}`;

  return (
    <div className="card diagnosis-result animate-fade-up">
      <div className="diagnosis-header">
        <h2 className="text-purple">{t('ai.issueDiagnosis')}</h2>
        {diagnosis.confidence != null && (
          <span className="confidence-badge">{diagnosis.confidence}{t('ai.match')}</span>
        )}
      </div>

      {tts.canSpeak && (
        <button
          className={`listen-btn ${tts.speaking ? 'speaking' : ''}`}
          onClick={() => (tts.speaking ? tts.stop() : tts.speak(spokenText))}
        >
          {tts.speaking ? <VolumeX size={18} /> : <Volume2 size={18} />}{' '}
          {tts.speaking ? t('ai.stopListening') : t('ai.listen')}
        </button>
      )}

      <div className="diagnosis-content">
        <div className="diagnosis-item">
          <h3 className="diagnosis-label">{t('ai.detectedProblem')}</h3>
          <p className="diagnosis-value problem-text">{diagnosis.problemDetected}</p>
        </div>

        <div className="diagnosis-item">
          <h3 className="diagnosis-label">{t('ai.recommendedService')}</h3>
          <p className="diagnosis-value">{serviceLabel}</p>
        </div>

        <div className="diagnosis-grid">
          <div className="diagnosis-box">
            <AlertCircle size={20} className={urgency === 'High' ? 'text-red' : 'text-purple'} />
            <div>
              <span className="box-label">{t('ai.urgency')}</span>
              <span className="box-value">{urgencyLabel}</span>
            </div>
          </div>
          <div className="diagnosis-box">
            <MapPin size={20} className="text-purple" />
            <div>
              <span className="box-label">{t('ai.nearbyExpertsCount')}</span>
              <span className="box-value">{diagnosis.workersFound?.length ?? 0}</span>
            </div>
          </div>
        </div>

        <div className="diagnosis-action-area">
          <p className="suggested-action">
            <CheckCircle size={18} className="text-green" />
            {diagnosis.suggestedAction}
          </p>
          <div className="diagnosis-disclaimer">
            <p>{t('ai.aiDisclaimer')}</p>
          </div>
          <button className="btn btn-primary w-full mt-4" onClick={onFindWorkers}>
            {t('ai.findExpertsNearMe')} <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}