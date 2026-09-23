import React, { useEffect, useRef, useState } from 'react';
import './RouteFade.css';

/**
 * Lightweight cross-fade between the login gate, the customer site and the
 * worker site. Pure CSS — no extra animation dependency needed.
 */
export default function RouteFade({ sectionKey, children }) {
  const [phase, setPhase] = useState('in');
  const previous = useRef(sectionKey);

  useEffect(() => {
    if (previous.current !== sectionKey) {
      previous.current = sectionKey;
      setPhase('enter');
      const id = window.setTimeout(() => setPhase('in'), 20);
      return () => window.clearTimeout(id);
    }
  }, [sectionKey]);

  return <div className={`route-fade route-fade-${phase}`}>{children}</div>;
}
