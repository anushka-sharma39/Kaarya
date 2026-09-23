import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import SupportModal from './components/SupportModal';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import AIDiagnosis from './pages/AIDiagnosis';
import FindWorker from './pages/FindWorker';
import WorkerProfile from './pages/WorkerProfile';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import SavedWorkers from './pages/SavedWorkers';
import CustomerProfile from './pages/CustomerProfile';
import { Phone } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { useSupport } from './context/SupportContext';

/**
 * The customer half of Kaarya, unchanged in look and behaviour —
 * only the router was lifted out to the platform level and the routes
 * are now mounted under /customer/*.
 */
function CustomerApp() {
  const { t } = useLanguage();
  const { isOpen, openSupport, closeSupport } = useSupport();

  // Kaarya's page-level styling lives on the body; scope it to this app only.
  useEffect(() => {
    document.body.classList.add('role-customer');
    return () => document.body.classList.remove('role-customer');
  }, []);

  return (
    <div className="app kaarya-app">
      <Navbar onSupportClick={openSupport} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceSlug" element={<ServiceDetails />} />
          <Route path="ai-diagnosis" element={<AIDiagnosis />} />
          <Route path="find-worker" element={<FindWorker />} />
          <Route path="worker/:id" element={<WorkerProfile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:orderId" element={<OrderDetails />} />
          <Route path="saved-workers" element={<SavedWorkers />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="*" element={<Navigate to="/customer" replace />} />
        </Routes>
      </main>

      <BottomNav />

      <Footer />

      <SupportModal isOpen={isOpen} onClose={closeSupport} />

      <button className="floating-support-btn" onClick={openSupport}>
        <Phone size={20} /> {t('footer.tollFree')}
      </button>
    </div>
  );
}

export default CustomerApp;
