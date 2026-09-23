import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Package, Navigation, CheckCircle, XCircle } from 'lucide-react';
import './Orders.css';

export default function Orders() {
  const { t } = useLanguage();
  const { orders } = useUser();
  const [filter, setFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'active') return order.status === 'confirmed' || order.status === 'onTheWay';
    if (filter === 'completed') return order.status === 'completed';
    if (filter === 'cancelled') return order.status === 'cancelled';
    return true;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <Calendar size={18} />;
      case 'onTheWay': return <Navigation size={18} />;
      case 'completed': return <CheckCircle size={18} />;
      case 'cancelled': return <XCircle size={18} />;
      default: return <Package size={18} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'badge-indigo';
      case 'onTheWay': return 'badge-peacock';
      case 'completed': return 'badge-green';
      case 'cancelled': return 'badge-red';
      default: return 'badge';
    }
  };

  return (
    <div className="orders-page container">
      <h1 className="text-3xl font-bold text-navy mb-8">{t('orders.title')}</h1>

      <div className="orders-filters flex gap-2 mb-8 overflow-x-auto pb-2">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          {t('orders.filterAll')}
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          {t('orders.filterActive')}
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          {t('orders.filterCompleted')}
        </button>
        <button 
          className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilter('cancelled')}
        >
          {t('orders.filterCancelled')}
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="empty-state">
          <Package size={48} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-navy mb-2">{t('orders.noOrdersFound')}</h3>
          <p className="text-muted mb-6">{t('orders.noOrdersDesc')}</p>
          <Link to="/customer/services" className="btn btn-primary">{t('orders.bookService')}</Link>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map(order => (
            <div key={order.id} className="order-list-card card">
              <div className="order-list-header flex justify-between items-center mb-4">
                <div>
                  <span className="font-bold text-navy">{order.id}</span>
                  <span className="text-muted text-sm ml-2">• {order.date}</span>
                </div>
                <div className={`status-badge flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {t(`orders.status.${order.status}`)}
                </div>
              </div>
              
              <div className="order-list-content flex gap-4 items-center">
                <img src={order.workerAvatar} alt={order.workerName} className="w-16 h-16 rounded-full object-cover" />
                <div className="flex-grow">
                  <h3 className="font-bold text-lg">{order.service}</h3>
                  <p className="text-muted">{order.workerName}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-navy">₹{order.total}</div>
                  <Link to={`/customer/order/${order.id}`} className="text-purple hover:underline flex items-center text-sm font-medium mt-1">
                    {t('orders.viewOrder')} <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
