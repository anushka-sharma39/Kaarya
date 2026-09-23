import React, { useState, useRef, useEffect } from 'react';
import { Camera, Video, Mic, Send, Bot, User, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import useVoiceInput from '../../shared/useVoiceinput';
import { getSpeechLang } from '../../shared/languages';
import './AIChat.css';

export default function AIChat({ onAnalyze }) {
  const { t, language } = useLanguage();
  const voice = useVoiceInput(getSpeechLang(language));
  const [messages, setMessages] = useState([
    { id: 1, text: t('ai.greeting'), sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Bolte waqt transcript ko input box mein live dikhao
  useEffect(() => {
    if (voice.listening && voice.transcript) {
      setInputValue(voice.transcript);
    }
  }, [voice.transcript, voice.listening]);

  const handleSend = async () => {
    if (!inputValue.trim() && !isAnalyzing) return;

    if (voice.listening) voice.stop(); // send karte waqt mic band

    const userText = inputValue;
    setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user' }]);
    setInputValue('');
    setIsAnalyzing(true);

    // Simulate AI typing
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), text: t('ai.analyzing'), sender: 'ai', isScanning: true }]);
    }, 500);

    const result = await onAnalyze(userText,language);

    // Remove scanning message and show result trigger
    setMessages(prev => prev.filter(m => !m.isScanning));
    setIsAnalyzing(false);
  };

  return (
    <div className="ai-chat-container card">
      <div className="ai-chat-header">
        <div className="ai-header-info">
          <div className="ai-avatar-header">
            <Bot size={24} />
          </div>
          <div>
            <h3>कार्य AI</h3>
            <span className="status-online"><span className="online-dot"></span>{t('ai.online')}</span>
          </div>
        </div>
        <span className="ai-header-tag"><Sparkles size={13} /> AI</span>
      </div>

      <div className="ai-chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
            <div className={`message-avatar ${msg.sender}`}>
              {msg.sender === 'ai' ? <Bot size={18} /> : <User size={18} />}
            </div>
            <div className={`message-bubble ${msg.sender}`}>
              {msg.text}
              {msg.isScanning && (
                <div className="scanning-animation">
                  <div className="scan-line"></div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {voice.error && (
        <p className="voice-error">
          {voice.error === 'not-allowed'
            ? 'Mic permission blocked hai. Browser ki address bar mein mic allow karo.'
            : voice.error === 'unsupported'
            ? 'Is browser mein voice support nahi hai. Chrome ya Edge use karo.'
            : voice.error === 'no-speech'
            ? 'Kuch sunai nahi diya, dobara try karo.'
            : `Voice error: ${voice.error}`}
        </p>
      )}

      <div className="ai-chat-quick-actions">
        <button className="quick-action-btn" onClick={() => setInputValue(`${t('ai.uploadPhoto')}: [Image Attached]`)}><Camera size={16} /> {t('ai.photo')}</button>
        <button className="quick-action-btn" onClick={() => setInputValue(`${t('ai.uploadVideo')}: [Video Attached]`)}><Video size={16} /> {t('ai.video')}</button>
        <button
          className={`quick-action-btn ${voice.listening ? 'listening' : ''}`}
          onClick={voice.listening ? voice.stop : voice.start}
          disabled={!voice.supported || isAnalyzing}
        >
          <Mic size={16} /> {voice.listening ? t('ai.stopSpeaking') : t('ai.speak')}
        </button>
      </div>

      <div className="ai-chat-input-area">
        <input
          type="text"
          className="chat-input"
          placeholder={t('ai.describe')}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isAnalyzing}
        />
        <button
          className="chat-send-btn"
          onClick={handleSend}
          disabled={isAnalyzing || !inputValue.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}