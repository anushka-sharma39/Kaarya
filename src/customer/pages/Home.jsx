import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Briefcase, Users, BookOpen, Headphones, Search, SlidersHorizontal,
  Home as HomeIcon, Wrench, Sparkles, Bike, Flower2, Grid2X2, Star,
  ShieldCheck, MapPinned, CheckCircle2
} from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import WorkerCard from '../components/WorkerCard';
import { services } from '../data/services';
import { workers } from '../data/workers';
import { useLanguage } from '../context/LanguageContext';
import { useSupport } from '../context/SupportContext';
import useScrollReveal from '../hooks/useScrollReveal';
import BookingModal from '../components/BookingModal';
import VideoCall from '../components/VideoCall';
import electricianPhoto from '../assets/workers/electrician.jpg';
import plumberPhoto from '../assets/workers/plumber.jpg';
import acTechnicianPhoto from '../assets/workers/ac_technician.jpg';
import mechanicPhoto from '../assets/workers/mechanic.jpg';
import masonPhoto from '../assets/workers/mason.jpg';
import tailorPhoto from '../assets/workers/tailor.jpg';
import cartVendorPhoto from '../assets/workers/cart_vendor.jpg';
import './Home.css';

const CATEGORIES = [
  { id: 'home', label: 'catHomeServices', Icon: HomeIcon },
  { id: 'repairs', label: 'catRepairs', Icon: Wrench },
  { id: 'cleaning', label: 'catCleaning', Icon: Sparkles },
  { id: 'delivery', label: 'catDelivery', Icon: Bike },
  { id: 'beauty', label: 'catBeauty', Icon: Flower2 },
  { id: 'more', label: 'catMore', Icon: Grid2X2 }
];

const HERO_PHOTOS = [
  { src: electricianPhoto, label: 'workerPhotoSkilled' },
  { src: cartVendorPhoto, label: 'workerPhotoDelivery' },
  { src: masonPhoto, label: 'workerPhotoHelpers' },
  { src: plumberPhoto, label: 'workerPhotoHomeServices' }
];

const POPULAR_SERVICES = [
  { id: 1, key: 'electrician', img: electricianPhoto, rating: 4.7, reviews: 128, price: 299, badge: 'topRated' },
  { id: 2, key: 'plumber', img: plumberPhoto, rating: 4.6, reviews: 96, price: 349 },
  { id: 3, key: 'homeCleaning', img: masonPhoto, rating: 4.8, reviews: 201, price: 249 },
  { id: 4, key: 'tailoring', img: tailorPhoto, rating: 4.7, reviews: 82, price: 199 },
  { id: 5, key: 'deliveryPartner', img: cartVendorPhoto, rating: 4.8, reviews: 156, price: 99 }
];

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { openSupport } = useSupport();
  const [activeCategory, setActiveCategory] = useState('home');
  const [bookingWorker, setBookingWorker] = useState(null);
  const [videoWorker, setVideoWorker] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useScrollReveal();

  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero-new">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="hero-eyebrow">{t('home.heroEyebrow')}</span>
              <h1 className="hero-heading-new">
                {t('home.heroHeadingLine1')}<br />
                {t('home.heroHeadingLine2')}<br />
                <span className="hero-line-accent">{t('home.heroHeadingLine3')}</span>
              </h1>
              <p className="hero-sub-new">{t('home.heroSub')}</p>
            </div>

            <div className="hero-photo-grid">
              {HERO_PHOTOS.map((p, i) => (
                <div className={`hp hp-${i}`} key={i}>
                  <img src={p.src} alt={t(`home.${p.label}`)} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="kaarya-search-bar">
            <Search size={18} className="search-lead-icon" />
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate('/customer/services', { state: { searchTerm } });
              }}
            />
            <button className="search-filter-btn" onClick={() => navigate('/customer/find-worker')} aria-label="Filters">
              <SlidersHorizontal size={17} />
            </button>
          </div>

          <div className="category-strip">
            {CATEGORIES.map(c => (
              <Link
                to="/customer/services"
                key={c.id}
                className={`cat-pill ${activeCategory === c.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(c.id)}
              >
                <span className="cat-icon"><c.Icon size={22} /></span>
                <span>{t(`home.${c.label}`)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="section promo-section reveal">
        <div className="container">
          <div className="promo-banner">
            <div className="promo-copy">
              <h2>{t('home.promoTitle')}</h2>
              <p>{t('home.promoDesc')}</p>
              <Link to="/customer/find-worker" className="promo-btn">
                {t('home.promoCta')} <ArrowRight size={15} />
              </Link>
            </div>
            <div className="promo-media">
              <img
                src={acTechnicianPhoto}
                alt={t('home.promoTitle')}
                loading="lazy"
              />
              <div className="promo-badge">
                <span>हर काम</span>
                <span>सम्मानित</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar-new reveal">
        <div className="container">
          <div className="stats-grid-new reveal-stagger">
            <div className="stat-item-new">
              <Users size={20} />
              <strong>10K<span>+</span></strong>
              <span className="stat-label-new">{t('home.statActiveWorkers')}</span>
            </div>
            <div className="stat-item-new">
              <ShieldCheck size={20} />
              <strong>100K<span>+</span></strong>
              <span className="stat-label-new">{t('home.statTasksCompleted')}</span>
            </div>
            <div className="stat-item-new">
              <Star size={20} />
              <strong>4.8<span>★</span></strong>
              <span className="stat-label-new">{t('home.statAvgRating')}</span>
            </div>
            <div className="stat-item-new">
              <MapPinned size={20} />
              <strong>50<span>+</span></strong>
              <span className="stat-label-new">{t('home.statCitiesCovered')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* POPULAR SERVICES */}
      <section className="section popular-section reveal">
        <div className="container">
          <div className="section-header flex-between">
            <div>
              <div className="section-label">{t('services.popularCategories')}</div>
              <h2 className="section-title">{t('home.popularServicesTitle')}</h2>
            </div>
            <Link to="/customer/services" className="built-btn">{t('services.viewAll')} <ArrowRight size={13} /></Link>
          </div>
          <div className="popular-scroll">
            {POPULAR_SERVICES.map(p => (
              <Link to="/customer/services" key={p.id} className="popular-card">
                <div className="popular-card-img">
                  <img src={p.img} alt={t(`home.popular.${p.key}`)} loading="lazy" />
                  {p.badge && <span className="popular-badge">{t(`home.${p.badge}`)}</span>}
                </div>
                <div className="popular-card-body">
                  <h4>{t(`home.popular.${p.key}`)}</h4>
                  <div className="popular-rating">
                    <Star size={13} fill="currentColor" /> {p.rating} <span>({p.reviews})</span>
                  </div>
                  <div className="popular-price">₹{p.price} {t('home.onwards')}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* YOUR BOOKINGS PREVIEW */}
      <section className="section bookings-preview-section reveal">
        <div className="container">
          <div className="section-header flex-between">
            <div>
              <div className="section-label">{t('home.yourBookingsLabel')}</div>
              <h2 className="section-title">{t('home.yourBookingsTitle')}</h2>
            </div>
            <Link to="/customer/orders" className="built-btn">{t('services.viewAll')} <ArrowRight size={13} /></Link>
          </div>
          <Link to="/customer/orders" className="booking-preview-card">
            <div className="booking-date-chip">
              <span className="bdc-day">24</span>
              <span className="bdc-month">{t('home.bookingMonth')}</span>
              <span className="bdc-dow">{t('home.bookingDow')}</span>
            </div>
            <div className="booking-preview-info">
              <span className="booking-status-chip"><CheckCircle2 size={13} /> {t('home.bookingConfirmed')}</span>
              <h4>{t('home.popular.homeCleaning')}</h4>
              <p>{t('home.bookingTimeToday')}</p>
              <div className="booking-worker-row">
                <img src="https://i.pravatar.cc/60?u=sunita" alt="Sunita Devi" />
                <span>{t('home.bookingWorkerLabel')}: Sunita Devi</span>
              </div>
            </div>
            <span className="booking-track-btn"><MapPinned size={14} /> {t('home.trackWorker')}</span>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">{t('home.featuresLabel')}</div>
            <h2 className="section-title">{t('home.featuresTitleLine1')}<br />{t('home.featuresTitleLine2')}</h2>
            <p className="section-desc">{t('home.featuresDesc')}</p>
          </div>
          <div className="features-grid reveal-stagger">
            <Link to="/customer/services" className="feature-card">
              <div className="feature-icon"><Briefcase size={22} /></div>
              <h3>{t('home.featureFindGigsTitle')}</h3>
              <p>{t('home.featureFindGigsDesc')}</p>
              <div className="feature-cta">{t('home.featureFindGigsCta')} <span>→</span></div>
            </Link>
            <Link to="/customer/find-worker" className="feature-card">
              <div className="feature-icon"><Users size={22} /></div>
              <h3>{t('home.featureCommunityTitle')}</h3>
              <p>{t('home.featureCommunityDesc')}</p>
              <div className="feature-cta">{t('home.featureCommunityCta')} <span>→</span></div>
            </Link>
            <Link to="/customer/ai-diagnosis" className="feature-card">
              <div className="feature-icon"><BookOpen size={22} /></div>
              <h3>{t('home.featureResourcesTitle')}</h3>
              <p>{t('home.featureResourcesDesc')}</p>
              <div className="feature-cta">{t('home.featureResourcesCta')} <span>→</span></div>
            </Link>
            <button className="feature-card" onClick={openSupport} style={{ textAlign: 'left', width: '100%', font: 'inherit' }}>
              <div className="feature-icon"><Headphones size={22} /></div>
              <h3>{t('home.featureSupportTitle')}</h3>
              <p>{t('home.featureSupportDesc')}</p>
              <div className="feature-cta">{t('home.featureSupportCta')} <span>→</span></div>
            </button>
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES (functional) */}
      <section className="section services-cat-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">{t('services.popularCategories')}</div>
            <h2 className="section-title">{t('services.title')}</h2>
          </div>
          <div className="services-grid reveal-stagger">
            {services.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => navigate('/customer/services')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR EVERY WORKER */}
      <section className="section built-section reveal">
        <div className="container">
          <div className="built-layout">
            <div className="built-copy">
              <div className="section-label">{t('home.builtLabel')}</div>
              <h2 className="section-title">{t('home.builtTitle')}</h2>
              <p>{t('home.builtDesc')}</p>
              <Link to="/customer/find-worker" className="built-btn">
                {t('home.builtLearnMore')}
                <ArrowRight size={13} />
              </Link>
            </div>
            <div className="worker-photos">
              <div className="worker-photo">
                <img src={cartVendorPhoto} alt={t('home.workerPhotoDelivery')} />
                <div className="worker-label">🛵 {t('home.workerPhotoDelivery')}</div>
              </div>
              <div className="worker-photo">
                <img src={plumberPhoto} alt={t('home.workerPhotoHomeServices')} />
                <div className="worker-label">🔧 {t('home.workerPhotoHomeServices')}</div>
              </div>
              <div className="worker-photo">
                <img src={masonPhoto} alt={t('home.workerPhotoHelpers')} />
                <div className="worker-label">🧹 {t('home.workerPhotoHelpers')}</div>
              </div>
              <div className="worker-photo">
                <img src={electricianPhoto} alt={t('home.workerPhotoSkilled')} />
                <div className="worker-label">⚡ {t('home.workerPhotoSkilled')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEARBY WORKERS (functional) */}
      <section className="section nearby-workers-section">
        <div className="container">
          <div className="section-header flex-between">
            <div>
              <div className="section-label">{t('home.nearbyExperts')}</div>
              <h2 className="section-title">{t('home.meetWorkersTitle')}</h2>
            </div>
            <Link to="/customer/find-worker" className="built-btn">{t('services.viewAll')} <ArrowRight size={13} /></Link>
          </div>
          <div className="workers-grid reveal-stagger">
            {workers.slice(0, 3).map(worker => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                onBook={(w) => setBookingWorker(w)}
                onVideoCall={(w) => setVideoWorker(w)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section hiw-section reveal">
        <div className="container">
          <div className="section-header">
            <div className="section-label">{t('home.hiwLabel')}</div>
            <h2 className="section-title">{t('home.hiwTitle')}</h2>
            <p className="section-desc">{t('home.hiwDesc')}</p>
          </div>
          <div className="hiw-grid reveal-stagger">
            <div className="hiw-card">
              <div className="hiw-num">01</div>
              <h3>{t('home.howItWorksStep1')}</h3>
              <p>{t('home.howItWorksStep1Desc')}</p>
            </div>
            <div className="hiw-card">
              <div className="hiw-num">02</div>
              <h3>{t('home.howItWorksStep2')}</h3>
              <p>{t('home.howItWorksStep2Desc')}</p>
            </div>
            <div className="hiw-card">
              <div className="hiw-num">03</div>
              <h3>{t('home.howItWorksStep3')}</h3>
              <p>{t('home.howItWorksStep3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT BANNER */}
      <section className="support-section reveal">
        <div className="container support-inner">
          <div className="support-left">
            <div className="support-icon-wrap"><Headphones size={22} /></div>
            <div className="support-text">
              <strong>{t('home.supportBannerTitle')}</strong>
              <span>{t('support.noInternet')}</span>
            </div>
          </div>
          <div className="support-right">
            <small>{t('home.supportBannerToll')}</small>
            <div className="support-number">{t('support.number')}</div>
            <div className="support-note">{t('home.supportBannerNote')}</div>
          </div>
        </div>
        <div className="motif-divider"></div>
      </section>

      {/* Modals for the nearby-workers section above */}
      <BookingModal
        isOpen={!!bookingWorker}
        onClose={() => setBookingWorker(null)}
        worker={bookingWorker}
      />
      {videoWorker && (
        <VideoCall
          worker={videoWorker}
          onClose={() => setVideoWorker(null)}
        />
      )}

    </div>
  );
}
