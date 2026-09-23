import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useSupport } from '../context/SupportContext';
import { CheckCircle, Clock, MapPin, Phone, MessageSquare, Video, ArrowLeft, Navigation, Star, Download, FileText, CalendarClock, XCircle, ShieldCheck } from 'lucide-react';
import VideoCall from '../components/VideoCall';
import TrackingMap from '../components/TrackingMap';
import { downloadInvoicePDF } from '../utils/invoiceGenerator';
import './OrderDetails.css';

export default function OrderDetails() {
  const { orderId } = useParams();
  const { t } = useLanguage();
  const { orders, updateOrderStatus } = useUser();
  const { openSupport } = useSupport();
  const [videoOpen, setVideoOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const order = orders.find(o => o.id === orderId);

  if (!order) return <div className="container mt-8 text-center">{t('order.orderNotFound')}</div>;

  const handleDownloadInvoice = () => {
    setDownloading(true);
    // slight delay so the button's own micro-animation gets a chance to play
    setTimeout(() => {
      downloadInvoicePDF(order, {
        invoice: t('order.invoice.invoice'),
        billTo: t('order.invoice.billTo'),
        serviceProvider: t('order.invoice.serviceProvider'),
        invoiceNo: t('order.invoice.invoiceNo'),
        dateIssued: t('order.invoice.dateIssued'),
        orderId: t('order.orderId'),
        description: t('order.invoice.description'),
        amount: t('order.invoice.amount'),
        serviceCharge: t('order.serviceCharge'),
        platformFee: t('order.platformFee'),
        taxes: t('order.taxes'),
        total: t('order.invoice.totalPaid'),
        paymentStatus: t('order.paymentStatus'),
        location: t('order.location'),
        problem: t('order.problem'),
        thanks: t('order.invoice.thanks'),
        footerNote: t('order.invoice.footerNote'),
        tagline: t('brand.tagline'),
        customer: t('order.invoice.customer'),
      });
      setDownloading(false);
    }, 250);
  };

  return (
    <div className="order-details-page container">
      <div className="mb-6">
        <Link to="/customer/orders" className="text-navy flex items-center gap-2 hover:underline font-medium">
          <ArrowLeft size={16} /> {t('order.backToOrders')}
        </Link>
      </div>

      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy mb-2">{t('order.title')}</h1>
          <p className="text-muted">{t('order.orderId')}: {order.id} • {order.date}</p>
        </div>
        <span className="badge badge-green text-lg px-4 py-2">{t(`orders.status.${order.status}`)}</span>
      </div>

      <div className="order-grid">
        {/* Left Column: Tracking and Worker */}
        <div className="order-main">
          {/* Status Tracker */}
          {(() => {
            const stepOrder = ['confirmed', 'onTheWay', 'arrived', 'completed'];
            const currentIndex = stepOrder.indexOf(order.status);
            const steps = [
              { key: 'confirmed', icon: <CheckCircle size={20} />, desc: 'stepConfirmedDesc' },
              { key: 'onTheWay', icon: <Navigation size={20} />, desc: 'stepOnTheWayDesc' },
              { key: 'arrived', icon: <MapPin size={20} />, desc: 'stepArrivedDesc' },
              { key: 'completed', icon: <CheckCircle size={20} />, desc: 'stepCompletedDesc' },
            ];
            return (
              <div className="card mb-6">
                <h3 className="mb-6 font-bold text-navy">{t('order.orderStatus')}</h3>
                <div className="status-tracker">
                  {steps.map((step, i) => {
                    const isActive = currentIndex >= 0 && i <= currentIndex;
                    const isCurrent = i === currentIndex;
                    return (
                      <div key={step.key} className={`status-step ${isActive ? 'active' : ''} ${isCurrent && order.status !== 'completed' ? 'pulse' : ''}`}>
                        <div className="step-icon">{step.icon}</div>
                        <div className="step-content">
                          <h4>{t(`orders.status.${step.key}`)}</h4>
                          <p className="text-sm text-muted">{t(`order.${step.desc}`)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Interactive Live Tracking Map */}
          <div className="card mb-6 map-card">
            <TrackingMap
              order={order}
              onWorkerArrived={(newStatus) => {
                if (order.status === 'confirmed' || (newStatus === 'arrived' && order.status !== 'arrived' && order.status !== 'completed')) {
                  updateOrderStatus(order.id, newStatus);
                }
              }}
            />
          </div>

          {/* Worker Details */}
          <div className="card mb-6">
            <h3 className="mb-4 font-bold text-navy">{t('order.yourExpert')}</h3>
            <div className="order-worker-card">
              <img src={order.workerAvatar} alt={order.workerName} className="worker-avatar" />
              <div className="worker-info flex-grow">
                <h4 className="text-lg font-bold flex items-center gap-1.5">
                  {order.workerName}
                  <ShieldCheck size={15} className="text-sage" />
                </h4>
                <p className="text-muted text-sm">{order.service}</p>
                <div className="worker-rating font-medium text-navy">
                  <Star size={13} className="text-earth" fill="currentColor"/> 4.8
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn-icon circle" onClick={openSupport}><Phone size={18} /></button>
                <button className="btn-icon circle" onClick={() => setVideoOpen(true)}><MessageSquare size={18} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Details */}
        <div className="order-sidebar">
          <div className="card mb-6">
            <h3 className="mb-4 font-bold text-navy">{t('order.serviceDetails')}</h3>
            <div className="detail-row">
              <span className="detail-label">{t('order.service')}</span>
              <span className="detail-value">{order.service}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t('order.problem')}</span>
              <span className="detail-value">{order.problem}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t('order.location')}</span>
              <span className="detail-value">{order.location}</span>
            </div>
          </div>

          <div className="card mb-6">
            <h3 className="mb-4 font-bold text-navy">{t('order.priceDetails')}</h3>
            <div className="detail-row">
              <span className="detail-label">{t('order.serviceCharge')}</span>
              <span className="detail-value">₹{order.serviceCharge}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t('order.platformFee')}</span>
              <span className="detail-value">₹{order.platformFee}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t('order.taxes')}</span>
              <span className="detail-value">₹{order.tax}</span>
            </div>
            <hr className="my-3 border-gray-200" />
            <div className="detail-row total">
              <span className="detail-label font-bold">{t('order.total')}</span>
              <span className="detail-value font-bold text-lg text-navy">₹{order.total}</span>
            </div>
            
            <div className="payment-status-pill">
              {t('order.paymentStatus')}: {order.paymentStatus}
            </div>
          </div>

          <div className="invoice-card card mb-6">
            <div className="invoice-card-top">
              <div className="invoice-card-icon">
                <FileText size={20} />
              </div>
              <div className="invoice-card-text">
                <h4>{t('order.invoice.title')}</h4>
                <p className="text-sm text-muted">{t('order.invoice.subtitle')}</p>
              </div>
            </div>
            <button
              className={`btn btn-primary invoice-download-btn ${downloading ? 'is-downloading' : ''}`}
              onClick={handleDownloadInvoice}
              disabled={downloading}
            >
              <Download size={16} />
              {downloading ? t('order.invoice.preparing') : t('order.invoice.download')}
            </button>
          </div>

          <div className="order-actions">
            <button className="btn btn-outline w-full" onClick={openSupport}>
              <CalendarClock size={17} /> {t('order.reschedule')}
            </button>
            <button
              className="btn btn-danger-outline w-full"
              onClick={() => {
                if (window.confirm(t('order.cancelBooking') + '?')) {
                  updateOrderStatus(order.id, 'cancelled');
                }
              }}
            >
              <XCircle size={17} /> {t('order.cancelBooking')}
            </button>
          </div>
        </div>
      </div>

      {videoOpen && (
        <VideoCall
          worker={{ avatar: order.workerAvatar, name: order.workerName, role: order.service }}
          onClose={() => setVideoOpen(false)}
        />
      )}
    </div>
  );
}
