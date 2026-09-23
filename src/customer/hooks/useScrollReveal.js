import { useEffect } from 'react';

/**
 * Fades/slides elements with the `.reveal` or `.reveal-stagger` class into
 * view as they enter the viewport. Attach the class in JSX; this hook wires
 * up the IntersectionObserver once per mount. Respects prefers-reduced-motion
 * via the CSS rules in index.css (this hook still runs, it just has nothing
 * visible to animate).
 */
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!els.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
