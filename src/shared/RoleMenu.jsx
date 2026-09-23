import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronDown,
  LogOut,
  Repeat,
  User,
  LayoutDashboard,
  CalendarCheck,
  Briefcase,
  Wallet,
  Wrench,
} from 'lucide-react';
import { useSession } from '../app/auth/AuthContext';
import './RoleMenu.css';

const MENUS = {
  customer: {
    label: 'Customer',
    caption: 'Find. Book. Get things done.',
    initials: 'C',
    items: [
      { to: '/customer', label: 'Customer Dashboard', icon: LayoutDashboard, end: true },
      { to: '/customer/orders', label: 'My Bookings', icon: CalendarCheck },
      { to: '/customer/profile', label: 'Profile', icon: User },
    ],
    switchTo: 'worker',
    switchLabel: 'Switch to Worker',
  },
  worker: {
    label: 'Gig Worker',
    caption: 'Work. Earn. Grow.',
    initials: 'W',
    items: [
      { to: '/worker/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/worker/work', label: 'My Jobs', icon: Briefcase },
      { to: '/worker/welfare', label: 'Earnings', icon: Wallet },
      { to: '/worker/gigs', label: 'Services', icon: Wrench },
      { to: '/worker/profile', label: 'Profile', icon: User },
    ],
    switchTo: 'customer',
    switchLabel: 'Switch to Customer',
  },
};

const SWITCH_COPY = {
  worker: {
    title: 'Switch to Gig Worker mode?',
    body: "You'll be taken to the Worker dashboard.",
    confirm: 'Yes, switch',
  },
  customer: {
    title: 'Switch to Customer mode?',
    body: "You'll be taken to the Customer site.",
    confirm: 'Yes, switch',
  },
};

export default function RoleMenu({ variant = 'customer', avatar }) {
  const config = MENUS[variant];
  const { logout, switchRole } = useSession();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    function onEsc(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        setConfirming(false);
      }
    }
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

  const handleSwitch = () => {
    const target = config.switchTo;
    switchRole(target);
    setConfirming(false);
    setOpen(false);
    navigate(`/${target}`, { replace: true });
  };

  return (
    <div className={`krm krm-${variant}`} ref={wrapRef}>
      <button
        type="button"
        className="krm-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Profile and role menu"
      >
        {avatar ? (
          <img className="krm-avatar-img" src={avatar} alt="" />
        ) : (
          <span className="krm-avatar">{config.initials}</span>
        )}
        <ChevronDown size={14} className={`krm-chev ${open ? 'is-open' : ''}`} />
      </button>

      {open && (
        <div className="krm-dropdown" role="menu">
          <div className="krm-head">
            <p className="krm-role">{config.label}</p>
            <p className="krm-caption">{config.caption}</p>
          </div>

          <div className="krm-items">
            {config.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="krm-item"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="krm-divider" />

          <button type="button" className="krm-item" role="menuitem" onClick={() => setConfirming(true)}>
            <Repeat size={16} />
            <span>{config.switchLabel}</span>
          </button>
          <button type="button" className="krm-item krm-danger" role="menuitem" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}

      {confirming && (
        <div className="krm-overlay" onClick={() => setConfirming(false)}>
          <div className="krm-confirm" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <h4>{SWITCH_COPY[config.switchTo].title}</h4>
            <p>{SWITCH_COPY[config.switchTo].body}</p>
            <div className="krm-confirm-actions">
              <button type="button" className="krm-btn krm-btn-ghost" onClick={() => setConfirming(false)}>
                Cancel
              </button>
              <button type="button" className="krm-btn krm-btn-solid" onClick={handleSwitch}>
                {SWITCH_COPY[config.switchTo].confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
