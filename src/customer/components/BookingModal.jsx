import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import './Modals.css';

export default function BookingModal({ isOpen, onClose, worker }) {
  const [step, setStep] = useState(1);
  const [problem, setProblem] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [time, setTime] = useState('');
  const [createdOrderId, setCreatedOrderId] = useState(null);
  
  const { t } = useLanguage();
  const { addOrder } = useUser();
  const navigate = useNavigate();

  if (!isOpen || !worker) return null;

  const monthNames = t('booking.months');
  const now = new Date();
  const currentYear = now.getFullYear();
  const yearOptions = [currentYear, currentYear + 1];

  const getDaysInMonth = (m, y) => {
    if (m === '' || !y) return 31;
    return new Date(Number(y), Number(m) + 1, 0).getDate();
  };

  const dayCount = getDaysInMonth(month, year || currentYear);
  const dayOptions = Array.from({ length: dayCount }, (_, i) => i + 1);

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
    const maxDay = getDaysInMonth(newMonth, year || currentYear);
    if (day && Number(day) > maxDay) setDay(String(maxDay));
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setYear(newYear);
    const maxDay = getDaysInMonth(month, newYear);
    if (day && Number(day) > maxDay) setDay(String(maxDay));
  };

  const getFormattedDateTime = () => {
    if (!day || month === '' || !year) return '';
    let label = `${day} ${monthNames[Number(month)]} ${year}`;
    if (time) {
      const [hh, mm] = time.split(':');
      const hour = parseInt(hh, 10);
      const period = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      label += ` • ${hour12}:${mm} ${period}`;
    }
    return label;
  };

  const handleConfirm = () => {
    // Generate order ID
    const orderId = `FX-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Create dummy order
    const newOrder = {
      id: orderId,
      customerName: "Demo Customer",
      workerId: worker.id,
      workerName: worker.name,
      workerAvatar: worker.avatar,
      service: worker.service,
      problem: problem || t('booking.generalService'),
      diagnosis: "AI assessment completed",
      location: worker.location || t('worker.local'),
      distance: worker.distance,
      date: getFormattedDateTime() || new Date().toLocaleString(),
      serviceCharge: worker.price,
      platformFee: 20,
      tax: Math.floor(worker.price * 0.18),
      total: worker.price + 20 + Math.floor(worker.price * 0.18),
      paymentStatus: t('booking.payAfterService'),
      status: "confirmed"
    };

    addOrder(newOrder);
    setCreatedOrderId(orderId);
    setStep(2);
  };

  const handleClose = () => {
    setStep(1);
    setProblem('');
    setDay('');
    setMonth('');
    setYear('');
    setTime('');
    setCreatedOrderId(null);
    onClose();
  };

  const handleTrackWorker = () => {
    handleClose();
    if (createdOrderId) {
      navigate(`/customer/order/${createdOrderId}`);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <X size={24} />
        </button>
        
        {step === 1 ? (
          <>
            <h2 className="modal-title text-center">{t('booking.book')} {worker.name}</h2>
            <p className="modal-subtitle text-center mb-4">{worker.service} • {t('worker.starting')} ₹{worker.price}</p>
            
            <div className="form-group">
              <label>{t('booking.service')}</label>
              <input type="text" className="input-field mb-3 bg-gray-100 text-gray-700 cursor-not-allowed" value={worker.service} readOnly />
            </div>

            <div className="form-group">
              <label>{t('booking.serviceType')}</label>
              <select className="input-field mb-3">
                <option>{t('booking.homeVisit')}</option>
                <option>{t('booking.videoConsultation')}</option>
                <option>{t('booking.emergency')}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('booking.date')}</label>
              <div className="date-select-row">
                <select
                  className="input-field date-select"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="">{t('booking.day')}</option>
                  {dayOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <select
                  className="input-field date-select"
                  value={month}
                  onChange={handleMonthChange}
                >
                  <option value="">{t('booking.month')}</option>
                  {monthNames.map((m, i) => (
                    <option key={m} value={i}>{m}</option>
                  ))}
                </select>

                <select
                  className="input-field date-select"
                  value={year}
                  onChange={handleYearChange}
                >
                  <option value="">{t('booking.year')}</option>
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>{t('booking.time')}</label>
              <input type="time" className="input-field mb-3" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>

            <div className="form-group">
              <label>{t('booking.additionalNotes')}</label>
              <textarea 
                className="input-field mb-4" 
                rows="3" 
                placeholder={t('ai.describe')}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              ></textarea>
            </div>

            <button className="btn btn-primary w-full" onClick={handleConfirm}>{t('booking.confirm')}</button>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="modal-icon-large text-green mx-auto">
              <CheckCircle size={48} />
            </div>
            <h1 className="modal-title">{t('booking.onTheWay')}</h1>
            <p className="modal-desc mt-2">
              {t('booking.successful')} {worker.name}. {t('booking.arriveAtScheduledTime')}
            </p>
            <div className="modal-actions mt-4">
              <button className="btn btn-primary w-full" onClick={handleTrackWorker}>{t('order.trackWorker')}</button>
              <button className="btn btn-secondary w-full" onClick={handleClose}>{t('booking.close')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
