import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navigation, MapPin, Locate, Phone, MessageSquare, CheckCircle2, Satellite } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './TrackingMap.css';

// Fixed viewBox for the stylised demo map. Marker positions below are expressed
// as fractions of this box so the whole scene scales responsively.
const VB_W = 400;
const VB_H = 260;

// A gentle S-curve "road" from the provider's base (bottom-left) to the
// customer's location (top-right pin). Control points are hand-tuned so the
// curve reads as a believable street rather than a straight line.
const ROUTE = {
  p0: { x: 34, y: 214 },
  p1: { x: 140, y: 30 },
  p2: { x: 250, y: 250 },
  p3: { x: 356, y: 54 },
};

function cubicPoint(t, { p0, p1, p2, p3 }) {
  const mt = 1 - t;
  const x = mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x;
  const y = mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y;
  // heading (for the little direction arrow on the marker)
  const dx = 3 * mt * mt * (p1.x - p0.x) + 6 * mt * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x);
  const dy = 3 * mt * mt * (p1.y - p0.y) + 6 * mt * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y);
  const heading = (Math.atan2(dy, dx) * 180) / Math.PI;
  return { x, y, heading };
}

const pathD = `M ${ROUTE.p0.x} ${ROUTE.p0.y} C ${ROUTE.p1.x} ${ROUTE.p1.y}, ${ROUTE.p2.x} ${ROUTE.p2.y}, ${ROUTE.p3.x} ${ROUTE.p3.y}`;

// Small decorative "city blocks" so the canvas doesn't look empty. Purely
// cosmetic — seeded off the order id so a given order always looks the same.
function useCityBlocks(seedKey) {
  return useMemo(() => {
    let seed = 0;
    for (let i = 0; i < seedKey.length; i++) seed = (seed * 31 + seedKey.charCodeAt(i)) >>> 0;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const blocks = [];
    for (let i = 0; i < 9; i++) {
      blocks.push({
        x: 12 + rand() * (VB_W - 60),
        y: 12 + rand() * (VB_H - 40),
        w: 14 + rand() * 22,
        h: 10 + rand() * 16,
        r: rand() > 0.5 ? 3 : 1,
      });
    }
    return blocks;
  }, [seedKey]);
}

function parseDistanceKm(distance) {
  if (!distance) return 3.2;
  const match = String(distance).match(/[\d.]+/);
  const val = match ? parseFloat(match[0]) : 3.2;
  return Number.isFinite(val) && val > 0 ? val : 3.2;
}

export default function TrackingMap({ order, onWorkerArrived }) {
  const { t } = useLanguage();
  const blocks = useCityBlocks(order?.id || 'kaarya');

  const isCancelled = order?.status === 'cancelled';
  const isDone = order?.status === 'arrived' || order?.status === 'completed';

  const totalKm = useMemo(() => parseDistanceKm(order?.distance), [order?.distance]);
  const totalMins = useMemo(() => Math.max(4, Math.round((totalKm / 22) * 60)), [totalKm]);

  const [progress, setProgress] = useState(isDone ? 1 : 0);
  const [pulse, setPulse] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const hasNotifiedArrival = useRef(false);
  const hasStartedMoving = useRef(isDone);

  useEffect(() => {
    // Keep the marker "parked" if the order is already finished/cancelled.
    if (isCancelled) return undefined;
    if (isDone) {
      setProgress(1);
      return undefined;
    }

    // Accelerated demo pace: a realistic multi-minute ETA plays out in roughly
    // 40–70 seconds so the interaction actually feels alive on this page.
    const demoDurationMs = Math.min(70000, Math.max(40000, totalMins * 3500));
    const tickMs = 200;
    const step = tickMs / demoDurationMs;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          return 1;
        }
        const next = Math.min(1, prev + step);
        if (!hasStartedMoving.current && next > 0.03) {
          hasStartedMoving.current = true;
          onWorkerArrived?.('onTheWay');
        }
        if (next >= 1 && !hasNotifiedArrival.current) {
          hasNotifiedArrival.current = true;
          onWorkerArrived?.('arrived');
        }
        return next;
      });
    }, tickMs);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCancelled, isDone, totalMins]);

  const point = useMemo(() => cubicPoint(Math.min(0.999, Math.max(0.001, progress)), ROUTE), [progress]);

  const minsLeft = Math.max(0, Math.ceil(totalMins * (1 - progress)));
  const kmLeft = Math.max(0, (totalKm * (1 - progress)).toFixed(1));

  let phaseLabel = t('order.map.settingOff');
  if (progress >= 1) phaseLabel = t('order.map.arrived');
  else if (progress > 0.85) phaseLabel = t('order.map.arrivingNow');
  else if (progress > 0.04) phaseLabel = t('order.map.onTheWay');

  const startPct = { left: `${(ROUTE.p0.x / VB_W) * 100}%`, top: `${(ROUTE.p0.y / VB_H) * 100}%` };
  const endPct = { left: `${(ROUTE.p3.x / VB_W) * 100}%`, top: `${(ROUTE.p3.y / VB_H) * 100}%` };
  const markerPct = { left: `${(point.x / VB_W) * 100}%`, top: `${(point.y / VB_H) * 100}%` };

  return (
    <div className={`tracking-map ${isCancelled ? 'is-cancelled' : ''}`}>
      <div className="tm-topbar">
        <span className="tm-badge">
          <Satellite size={13} />
          {t('order.map.liveDemo')}
        </span>
        <span className="tm-route-label">{t('order.map.routeLabel')}</span>
      </div>

      <div className="tm-canvas">
        <svg
          className="tm-svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {blocks.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx={b.r} className="tm-block" />
          ))}

          {/* full planned route, dashed */}
          <path d={pathD} className="tm-route-planned" pathLength="1" />
          {/* travelled portion, solid + highlighted */}
          <path
            d={pathD}
            className="tm-route-done"
            pathLength="1"
            style={{ strokeDasharray: `${progress} ${1 - progress}` }}
          />
        </svg>

        {!isCancelled && (
          <>
            <div className="tm-pin tm-pin-start" style={startPct} title={t('order.map.startPoint')}>
              <span className="tm-pin-dot" />
            </div>

            <div className="tm-pin tm-pin-end" style={endPct} title={t('order.map.yourLocation')}>
              <MapPin size={18} />
            </div>

            <button
              type="button"
              className={`tm-marker ${progress > 0.04 && progress < 1 ? 'is-moving' : ''}`}
              style={{ ...markerPct, transform: `translate(-50%, -50%) rotate(${point.heading}deg)` }}
              onClick={() => setShowPopup((v) => !v)}
              aria-label={t('order.map.viewProvider')}
            >
              <span className="tm-marker-ring" />
              <img src={order?.workerAvatar} alt="" className="tm-marker-avatar" style={{ transform: `rotate(${-point.heading}deg)` }} />
            </button>

            {showPopup && (
              <div
                className="tm-popup"
                style={{
                  left: `${(point.x / VB_W) * 100}%`,
                  top: `${(point.y / VB_H) * 100}%`,
                }}
              >
                <img src={order?.workerAvatar} alt={order?.workerName} />
                <div className="tm-popup-info">
                  <strong>{order?.workerName}</strong>
                  <span>{order?.service}</span>
                </div>
                <div className="tm-popup-actions">
                  <span className="tm-popup-btn" title={t('order.map.call')}><Phone size={13} /></span>
                  <span className="tm-popup-btn" title={t('order.map.message')}><MessageSquare size={13} /></span>
                </div>
              </div>
            )}
          </>
        )}

        <button
          type="button"
          className={`tm-recenter ${pulse ? 'is-pulsing' : ''}`}
          title={t('order.map.recenter')}
          onClick={() => {
            setPulse(true);
            setTimeout(() => setPulse(false), 500);
          }}
        >
          <Locate size={16} />
        </button>

        <div className="tm-readout">
          <div className="tm-readout-icon">
            {progress >= 1 ? <CheckCircle2 size={20} /> : <Navigation size={20} />}
          </div>
          <div className="tm-readout-text">
            {isCancelled ? (
              <span className="tm-phase">{t('order.map.cancelledNote')}</span>
            ) : progress >= 1 ? (
              <>
                <span className="tm-eta-value">{t('order.map.arrived')}</span>
                <span className="tm-phase">{order?.status === 'completed' ? t('order.map.completedNote') : phaseLabel}</span>
              </>
            ) : (
              <>
                <span className="tm-eta-value">
                  {t('order.map.arrivingIn')} {minsLeft} {t('order.map.min')}
                </span>
                <span className="tm-phase">
                  {phaseLabel} • {kmLeft} {t('order.map.kmRemaining')}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="tm-progress-bar">
        <div className="tm-progress-fill" style={{ width: `${Math.min(100, progress * 100)}%` }} />
      </div>
    </div>
  );
}
