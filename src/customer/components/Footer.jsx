import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, MessageCircle, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <Link to="/customer/customer" className="navbar-logo footer-logo">
            <span className="brand-word">kaarya</span>
            <span className="brand-tag">{t('brand.tagline')}</span>
          </Link>
          <p className="footer-tagline">{t('footer.tagline')}</p>
          <div className="social-links">
            <a href="#" className="social-icon"><Globe size={20} /></a>
            <a href="#" className="social-icon"><MessageCircle size={20} /></a>
            <a href="#" className="social-icon"><Share2 size={20} /></a>
            <a href="#" className="social-icon"><Mail size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>{t('footer.services')}</h3>
          <ul>
            <li><Link to="/customer/services">{t('services.plumbing')}</Link></li>
            <li><Link to="/customer/services">{t('services.electrical')}</Link></li>
            <li><Link to="/customer/services">{t('services.acRepair')}</Link></li>
            <li><Link to="/customer/services">{t('services.refrigeratorRepair')}</Link></li>
            <li><Link to="/customer/services">{t('services.painting')}</Link></li>
            <li><Link to="/customer/services">{t('services.machineryRepair')}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>{t('footer.platform')}</h3>
          <ul>
            <li><Link to="/customer/ai-diagnosis">{t('navbar.aiDiagnosis')}</Link></li>
            <li><Link to="/customer/find-worker">{t('navbar.findWorkers')}</Link></li>
            <li><Link to="/customer/find-worker">{t('navbar.community')}</Link></li>
            <li><Link to="/customer/ai-diagnosis">{t('footer.liveExpert')}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>{t('footer.support')}</h3>
          <ul>
            <li><a href="#">{t('footer.tollFree')}</a></li>
            <li><a href="#">{t('footer.contact')}</a></li>
            <li><a href="#">{t('footer.faq')}</a></li>
            <li><a href="#">{t('footer.safety')}</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>{t('footer.legal')}</h3>
          <ul>
            <li><a href="#">{t('footer.privacy')}</a></li>
            <li><a href="#">{t('footer.terms')}</a></li>
            <li><a href="#">{t('footer.workerPolicy')}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>{t('footer.rights')}</p>
        <p className="footer-made-with">{t('footer.madeWith')}</p>
      </div>
    </footer>
  );
}
