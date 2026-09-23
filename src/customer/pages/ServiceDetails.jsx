import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Search, MapPin, Star, Users, ArrowLeft, RefreshCcw } from 'lucide-react';
import { services } from '../data/services';
import { workers } from '../data/workers';
import WorkerCard from '../components/WorkerCard';
import BookingModal from '../components/BookingModal';
import { useLanguage } from '../context/LanguageContext';
import './ServiceDetails.css';

// Converts a kebab-case slug ("ac-repair") into the camelCase translation
// key used in the translations files ("acRepair").
const slugToCamel = (slug = '') =>
  slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

export default function ServiceDetails() {
  const { serviceSlug } = useParams();
  const location = useLocation();
  const { t } = useLanguage();
  
  const [service, setService] = useState(null);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Filters state
  const [distance, setDistance] = useState('any');
  const [rating, setRating] = useState('any');
  const [availability, setAvailability] = useState('any');
  const [price, setPrice] = useState('any');
  const [workerType, setWorkerType] = useState('any');
  const [sortBy, setSortBy] = useState('bestMatch');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find service by slug
    const currentService = services.find(s => s.slug === serviceSlug);
    if (currentService) {
      setService(currentService);
      // Auto-open booking modal if action=book
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.get('action') === 'book') {
        setTimeout(() => {
          document.getElementById('workers-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [serviceSlug, location]);

  useEffect(() => {
    if (!service) return;

    setIsLoading(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      let result = workers.filter(w => w.service.toLowerCase() === service.name.toLowerCase());

      // Search filter
      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        result = result.filter(w => 
          w.name.toLowerCase().includes(lowerSearch) || 
          (w.skills && w.skills.some(s => s.toLowerCase().includes(lowerSearch))) ||
          w.location.toLowerCase().includes(lowerSearch)
        );
      }

      // Distance filter
      if (distance !== 'any') {
        const maxDist = parseInt(distance);
        result = result.filter(w => w.distance <= maxDist);
      }

      // Rating filter
      if (rating !== 'any') {
        const minRating = parseFloat(rating);
        result = result.filter(w => w.rating >= minRating);
      }

      // Availability filter
      if (availability === 'now') {
        result = result.filter(w => w.available);
      }

      // Price filter
      if (price !== 'any') {
        if (price === 'under300') result = result.filter(w => w.price < 300);
        if (price === '300-500') result = result.filter(w => w.price >= 300 && w.price <= 500);
        if (price === 'over500') result = result.filter(w => w.price > 500);
      }

      // Worker Type filter
      if (workerType === 'verified') {
        result = result.filter(w => w.verified);
      } else if (workerType === 'experienced') {
        result = result.filter(w => w.experience >= 5 || w.jobsCompleted > 500);
      } else if (workerType === 'topRated') {
        result = result.filter(w => w.rating >= 4.8);
      }

      // Sorting
      result = [...result].sort((a, b) => {
        switch(sortBy) {
          case "nearest": return a.distance - b.distance;
          case "rating": return b.rating - a.rating;
          case "price": return a.price - b.price;
          case "experience": return (b.jobsCompleted || 0) - (a.jobsCompleted || 0);
          default: return b.aiMatch - a.aiMatch; // bestMatch
        }
      });

      setFilteredWorkers(result);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [service, searchTerm, distance, rating, availability, price, workerType, sortBy]);

  const handleBook = (worker) => {
    setSelectedWorker(worker);
    setBookingModalOpen(true);
  };

  const handleClearFilters = () => {
    setDistance('any');
    setRating('any');
    setAvailability('any');
    setPrice('any');
    setWorkerType('any');
    setSearchTerm('');
    setSortBy('bestMatch');
  };

  if (!service) {
    return <div className="container mt-section text-center">{t('services.serviceNotFound')}</div>;
  }

  return (
    <div className="service-details-page bg-gray-50 min-h-screen pb-16">
      <div className="bg-white border-b border-gray-100 py-4 mb-8">
        <div className="container flex items-center text-sm text-muted">
          <Link to="/customer/customer" className="hover:text-navy">{t('services.breadcrumbHome')}</Link>
          <span className="mx-2">/</span>
          <Link to="/customer/services" className="hover:text-navy">{t('navbar.services')}</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-navy">{t(`services.${slugToCamel(service.slug)}`) || service.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="service-header card">
          <img src={service.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1000"} alt={service.name} className="service-header-image" />
          <h1 className="text-4xl font-bold text-navy mb-4">{t(`services.${slugToCamel(service.slug)}`) || service.name}</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">{service.description}</p>
          
          <div className="service-header-stats">
            <div className="stat-item">
              <Star className="text-purple" fill="currentColor" size={20} />
              <span>{service.rating || '4.8'} {t('services.average')}</span>
            </div>
            <div className="stat-item">
              <Users className="text-blue-500" size={20} />
              <span>{service.expertsCount} {t('services.expertsNearby')}</span>
            </div>
            <div className="stat-item">
              <MapPin className="text-red-500" size={20} />
              <span>{t('services.availableNearYou')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="workers-section">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="service-filters sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-navy">{t('services.filters')}</h3>
                <button className="text-sm text-purple hover:underline" onClick={handleClearFilters}>
                  {t('services.clearFilters')}
                </button>
              </div>

              <div className="filter-group">
                <label>{t('services.distance')}</label>
                <div className="filter-options">
                  {['any', '1', '3', '5', '10'].map(val => (
                    <button 
                      key={val} 
                      className={`filter-chip ${distance === val ? 'active' : ''}`}
                      onClick={() => setDistance(val)}
                    >
                      {val === 'any' ? t('services.any') : `< ${val} km`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>{t('services.rating')}</label>
                <div className="filter-options">
                  <button className={`filter-chip ${rating === 'any' ? 'active' : ''}`} onClick={() => setRating('any')}>{t('services.any')}</button>
                  <button className={`filter-chip ${rating === '4.5' ? 'active' : ''}`} onClick={() => setRating('4.5')}>4.5+</button>
                  <button className={`filter-chip ${rating === '4.0' ? 'active' : ''}`} onClick={() => setRating('4.0')}>4.0+</button>
                </div>
              </div>

              <div className="filter-group">
                <label>{t('services.availability')}</label>
                <div className="filter-options">
                  <button className={`filter-chip ${availability === 'any' ? 'active' : ''}`} onClick={() => setAvailability('any')}>{t('services.any')}</button>
                  <button className={`filter-chip ${availability === 'now' ? 'active' : ''}`} onClick={() => setAvailability('now')}>{t('services.availableNow')}</button>
                </div>
              </div>

              <div className="filter-group">
                <label>{t('services.price')}</label>
                <div className="filter-options">
                  <button className={`filter-chip ${price === 'any' ? 'active' : ''}`} onClick={() => setPrice('any')}>{t('services.any')}</button>
                  <button className={`filter-chip ${price === 'under300' ? 'active' : ''}`} onClick={() => setPrice('under300')}>&lt; ₹300</button>
                  <button className={`filter-chip ${price === '300-500' ? 'active' : ''}`} onClick={() => setPrice('300-500')}>₹300 - ₹500</button>
                </div>
              </div>

              <div className="filter-group">
                <label>{t('services.workerType')}</label>
                <div className="filter-options">
                  <button className={`filter-chip ${workerType === 'any' ? 'active' : ''}`} onClick={() => setWorkerType('any')}>{t('services.any')}</button>
                  <button className={`filter-chip ${workerType === 'verified' ? 'active' : ''}`} onClick={() => setWorkerType('verified')}>{t('services.verified')}</button>
                  <button className={`filter-chip ${workerType === 'topRated' ? 'active' : ''}`} onClick={() => setWorkerType('topRated')}>{t('services.topRated')}</button>
                </div>
              </div>
            </div>
          </div>

          {/* Workers List */}
          <div className="lg:col-span-3">
            <div className="results-toolbar">
              <h2 className="results-heading">
                {filteredWorkers.length} {t('services.expertsNearby')}
              </h2>

              <div className="results-controls">
                <div className="results-search">
                  <Search size={17} className="results-search-icon" />
                  <input
                    type="text"
                    placeholder={`${t('services.searchPlaceholder')} ${service.name}...`}
                    className="results-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className="results-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="bestMatch">{t('services.sortBestMatch')}</option>
                  <option value="nearest">{t('services.sortNearest')}</option>
                  <option value="rating">{t('services.sortHighestRated')}</option>
                  <option value="price">{t('services.sortLowestPrice')}</option>
                  <option value="experience">{t('services.sortExperienced')}</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted">
                <RefreshCcw size={40} className="animate-spin mb-4 text-purple" />
                <p>{t('services.findingExperts')}</p>
              </div>
            ) : filteredWorkers.length === 0 ? (
              <div className="empty-state">
                <Users size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy mb-2">{t('services.noWorkersFound')}</h3>
                <p className="text-muted mb-6">{t('services.noWorkersDesc')}</p>
                <button className="btn btn-outline" onClick={handleClearFilters}>
                  {t('services.clearFilters')}
                </button>
              </div>
            ) : (
              <div className="workers-list">
                {filteredWorkers.map(worker => (
                  <WorkerCard 
                    key={worker.id} 
                    worker={worker} 
                    onBook={handleBook} 
                    onVideoCall={handleBook}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {bookingModalOpen && selectedWorker && (
        <BookingModal 
          isOpen={bookingModalOpen}
          worker={selectedWorker} 
          onClose={() => setBookingModalOpen(false)} 
        />
      )}
    </div>
  );
}
