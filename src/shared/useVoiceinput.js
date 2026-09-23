import { useRef, useState, useCallback, useEffect } from 'react';

export default function useVoiceInput(lang = 'en-IN') {
  const recRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  const SR =
    typeof window !== 'undefined'
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

  const start = useCallback(() => {
    if (!SR) {
      setError('unsupported');
      return;
    }
    const rec = new SR();
    rec.lang = lang;
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e) =>
      setTranscript(Array.from(e.results).map((r) => r[0].transcript).join(''));
    rec.onerror = (e) => setError(e.error); // 'not-allowed', 'no-speech', ...
    rec.onend = () => setListening(false);
    setError(null);
    setTranscript('');
    recRef.current = rec;
    rec.start();
    setListening(true);
  }, [SR, lang]);

  const stop = useCallback(() => recRef.current?.stop(), []);

  // page chhodne par mic band kar do
  useEffect(() => () => recRef.current?.abort(), []);

  return { supported: Boolean(SR), listening, transcript, error, start, stop };
}