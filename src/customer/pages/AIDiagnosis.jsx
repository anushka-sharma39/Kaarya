import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, AudioLines } from 'lucide-react';
import AIChat from '../components/AIChat';
import DiagnosisResult from '../components/DiagnosisResult';
import { analyzeProblem } from '../services/aiService';
import { useLanguage } from '../context/LanguageContext';
import useVoiceInput from '../../shared/useVoiceinput';
import { getSpeechLang } from '../../shared/languages';
import './AIDiagnosis.css';

export default function AIDiagnosis() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [diagnosis, setDiagnosis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const voice = useVoiceInput(getSpeechLang(language));
  const wasListening = useRef(false);

  const handleAnalyze = async (input) => {
    setAnalyzing(true);
    try {
      const result = await analyzeProblem(input, language);
      setDiagnosis(result);
    } finally {
      setAnalyzing(false);
    }
  };

  // Jaise hi bolna band ho aur transcript mila ho, analysis shuru karo
  useEffect(() => {
    if (wasListening.current && !voice.listening && voice.transcript.trim()) {
      handleAnalyze(voice.transcript.trim());
    }
    wasListening.current = voice.listening;
  }, [voice.listening]);

  return (
    <div className="ai-diagnosis-page container mt-section mb-section">
      <div className="text-center mb-12">
        <h1 className="text-purple">{t('ai.tellUs')}</h1>
        <p className="mt-4 text-xl">{t('ai.subtitle')}</p>
      </div>

      <div className="ai-layout">
        <div className="ai-chat-section">
          <AIChat onAnalyze={handleAnalyze} />
        </div>

        {!diagnosis && (
          <div className="ai-divider" aria-hidden="true">
            <span>{t('ai.or')}</span>
          </div>
        )}

        <div className="ai-result-section">
          {!diagnosis ? (
            <div className="voice-card card text-center">
              <span className="voice-card-badge">
                <AudioLines size={14} /> {t('ai.voiceBadge')}
              </span>

              <div className="voice-icon-wrap">
                <span className="pulse-ring"></span>
                <span className="pulse-ring delay"></span>
                <div className="voice-icon-circle">
                  <Mic size={30} />
                </div>
              </div>

              <h2>{t('ai.dontWantToType')}</h2>
              <p className="mt-4 mb-8">{t('ai.clickMicrophone')}</p>

              {voice.listening && voice.transcript && (
                <p className="voice-live">“{voice.transcript}”</p>
              )}

              {voice.error && (
                <p className="voice-error-text">
                  {voice.error === 'not-allowed'
                    ? 'Mic permission blocked hai. Browser ki address bar mein mic allow karo.'
                    : voice.error === 'unsupported'
                    ? 'Is browser mein voice support nahi hai. Chrome ya Edge use karo.'
                    : voice.error === 'no-speech'
                    ? 'Kuch sunai nahi diya, dobara try karo.'
                    : `Voice error: ${voice.error}`}
                </p>
              )}

              <button
                className="btn btn-primary btn-large mx-auto"
                onClick={voice.listening ? voice.stop : voice.start}
                disabled={!voice.supported || analyzing}
              >
                <Mic size={22} />{' '}
                {analyzing
                  ? t('ai.analyzing')
                  : voice.listening
                  ? t('ai.stopSpeaking')
                  : t('ai.startSpeaking')}
              </button>
            </div>
          ) : (
            <DiagnosisResult
              diagnosis={diagnosis}
              onFindWorkers={() => navigate('/customer/find-worker', { state: { diagnosis } })}
            />
          )}
        </div>
      </div>
    </div>
  );
}