import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { hi } from '../translations/hi';
import { ta } from '../translations/ta';
import { mr } from '../translations/mr';

const translations = { en, hi, ta, mr };
const VALID_LANGS = ['en', 'hi', 'ta', 'mr'];

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('fixnear-language');
    return VALID_LANGS.includes(savedLanguage) ? savedLanguage : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('fixnear-language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');

    let value = translations[language];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    if (value === undefined && language !== 'en') {
      value = translations['en'];
      for (const k of keys) {
        if (value && value[k]) {
          value = value[k];
        } else {
          value = undefined;
          break;
        }
      }
    }

    return value || key;
  };

  const value = { language, setLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};