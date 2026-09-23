import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, RotateCcw, Check, ShieldCheck } from 'lucide-react';
import { useSession } from '../../app/auth/AuthContext';
import '../../pages/Login/RoleSelection.css';
import '../../pages/Login/Register.css';

// ─── Demo OTP is always 123456 ───────────────────────────────────────────────
const DEMO_OTP = '123456';
const OTP_LENGTH = 6;
const RESEND_AFTER = 60; // seconds

export default function CustomerVerify() {
  const navigate = useNavigate();
  const { login } = useSession();

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(RESEND_AFTER);
  const [canResend, setCanResend] = useState(false);
  const [resent, setResent] = useState(false);
  const inputs = useRef([]);

  const profile = (() => {
    try { return JSON.parse(localStorage.getItem('draftCustomerProfile') || '{}'); }
    catch { return {}; }
  })();

  // countdown
  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return; }
    const id = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  useEffect(() => {
    document.body.classList.add('role-login');
    return () => document.body.classList.remove('role-login');
  }, []);

  const handleInput = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    setError('');
    if (val && idx < OTP_LENGTH - 1) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (digits.length === OTP_LENGTH) {
      setOtp(digits.split(''));
      inputs.current[OTP_LENGTH - 1]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = () => {
    const entered = otp.join('');
    if (entered.length < OTP_LENGTH) { setError('Please enter all 6 digits.'); return; }
    if (entered !== DEMO_OTP) { setError('Incorrect OTP. Use the demo OTP: 123456'); return; }

    setVerifying(true);
    setTimeout(() => {
      // Move draft to final customerProfile
      localStorage.setItem('customerProfile', JSON.stringify(profile));
      localStorage.removeItem('draftCustomerProfile');
      // Login the session
      login('customer');
      setVerifying(false);
      setSuccess(true);
      setTimeout(() => navigate('/customer', { replace: true }), 1800);
    }, 1200);
  };

  const handleResend = () => {
    setCanResend(false);
    setTimer(RESEND_AFTER);
    setResent(true);
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');
    inputs.current[0]?.focus();
    setTimeout(() => setResent(false), 3000);
  };

  const filled = otp.every(d => d !== '');

  return (
    <div className="rs-page">
      <div className="rs-bg" aria-hidden="true">
        <span className="rs-orb rs-orb-1" />
        <span className="rs-orb rs-orb-2" />
        <span className="rs-orb rs-orb-3" />
        <span className="rs-jaali" />
      </div>

      <main className="rs-shell" style={{ alignItems: 'center' }}>
        <header className="rs-header">
          <div className="rs-brandmark">
            <Sparkles size={14} />
            <span>kaarya</span>
          </div>
          <h1 className="rs-wordmark">Verify Your Account</h1>
          <p className="rs-tagline">
            {profile.email
              ? `Enter the 6-digit OTP sent to ${profile.email}`
              : 'Enter the 6-digit OTP sent to your registered contact.'}
          </p>
        </header>

        <div className="rs-form" style={{ textAlign: 'center' }}>
          {/* Demo notice */}
          <div style={{
            background: 'rgba(68,58,134,0.08)',
            border: '1px dashed rgba(68,58,134,0.3)',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '24px',
            fontSize: '0.82rem',
            color: 'var(--rs-muted)',
          }}>
            🔒 <strong>Demo Mode</strong> — No real OTP is sent. Use code: <strong style={{ color: 'var(--rs-indigo)', letterSpacing: '0.1em' }}>123456</strong>
          </div>

          {/* OTP inputs */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => inputs.current[idx] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleInput(e, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                onPaste={handlePaste}
                style={{
                  width: '46px',
                  height: '56px',
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  borderRadius: '12px',
                  border: `2px solid ${error ? 'var(--rs-terracotta)' : digit ? 'var(--rs-indigo)' : 'rgba(42,33,89,0.2)'}`,
                  background: digit ? 'rgba(68,58,134,0.06)' : 'rgba(255,255,255,0.7)',
                  outline: 'none',
                  color: 'var(--rs-ink)',
                  transition: 'border-color 0.2s, background 0.2s',
                  fontFamily: 'inherit',
                }}
              />
            ))}
          </div>

          {error && <p style={{ color: 'var(--rs-terracotta)', fontSize: '0.84rem', marginBottom: '16px' }}>{error}</p>}
          {resent && <p style={{ color: '#16a34a', fontSize: '0.84rem', marginBottom: '16px' }}>✓ OTP resent (demo code: 123456)</p>}

          <button
            onClick={handleVerify}
            className="rs-submit"
            disabled={!filled || verifying}
            style={{ marginBottom: '16px' }}
          >
            {verifying ? 'Verifying…' : 'Verify OTP'}
          </button>

          {/* Timer / Resend */}
          <div style={{ fontSize: '0.86rem', color: 'var(--rs-muted)', marginBottom: '16px' }}>
            {canResend ? (
              <button
                onClick={handleResend}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--rs-indigo)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <RotateCcw size={14} /> Resend OTP
              </button>
            ) : (
              <>Resend OTP in <strong style={{ color: 'var(--rs-ink)' }}>0:{String(timer).padStart(2, '0')}</strong></>
            )}
          </div>

          <Link to="/customer/register" style={{ fontSize: '0.84rem', color: 'var(--rs-indigo)', textDecoration: 'none', fontWeight: '600' }}>
            ← Change contact details
          </Link>
        </div>
      </main>

      {/* Success overlay */}
      {success && (
        <div className="rs-success-overlay">
          <div className="rs-success-modal">
            <div className="rs-success-icon">
              <ShieldCheck size={32} />
            </div>
            <h3 className="rs-success-title">Registration Successful!</h3>
            <p className="rs-success-text">Welcome to Kaarya! Redirecting to your dashboard…</p>
          </div>
        </div>
      )}
    </div>
  );
}
