import { useState, useEffect, useCallback } from 'react';

export default function useSpeech(lang = 'en-IN') {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (!supported) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', load);
      window.speechSynthesis.cancel(); // page chhodne par awaaz band
    };
  }, [supported]);

  const base = lang.split('-')[0].toLowerCase();
  const findVoice = () =>
    voices.find((v) => v.lang.replace('_', '-').toLowerCase() === lang.toLowerCase()) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(base));

  // Voices load hone se pehle button dikhne do; load hone ke baad sirf tab jab us language ki voice ho
  const canSpeak = supported && (voices.length === 0 || Boolean(findVoice()));

  const speak = useCallback(
    (text) => {
      if (!supported || !text) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      const voice = findVoice();
      if (voice) u.voice = voice;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(u);
    },
    [supported, lang, voices]
  );

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  return { canSpeak, speaking, speak, stop };
}