import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitcher.css';

export default function LanguageSwitcher({ compact = false }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'ta', label: 'தமிழ்' },
  { code: 'mr', label: 'मराठी' }

  ];

  const currentLangLabel = languages.find(l => l.code === language)?.label || 'English';

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`language-switcher ${compact ? 'compact' : ''}`} ref={dropdownRef}>
      <button
        className="language-btn"
        onClick={toggleDropdown}
        aria-label="Change language"
      >
        <Globe size={compact ? 17 : 18} className="globe-icon" />
        {!compact && <span className="current-lang">{currentLangLabel}</span>}
        {!compact && <ChevronDown size={14} className={`chevron-icon ${isOpen ? 'open' : ''}`} />}
      </button>

      {isOpen && (
        <div className={`language-dropdown ${compact ? 'compact' : ''}`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? 'selected' : ''}`}
              onClick={() => selectLanguage(lang.code)}
            >
              <span className="check-placeholder">
                {language === lang.code && <Check size={16} />}
              </span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
