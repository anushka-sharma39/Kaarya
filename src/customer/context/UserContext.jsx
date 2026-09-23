import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('fixnear-orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedWorkers, setSavedWorkers] = useState(() => {
    const saved = localStorage.getItem('fixnear-saved-workers');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('fixnear-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fixnear-saved-workers', JSON.stringify(savedWorkers));
  }, [savedWorkers]);

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const toggleSavedWorker = (workerId) => {
    setSavedWorkers(prev => {
      if (prev.includes(workerId)) {
        return prev.filter(id => id !== workerId);
      } else {
        return [...prev, workerId];
      }
    });
  };

  const isWorkerSaved = (workerId) => {
    return savedWorkers.includes(workerId);
  };

  return (
    <UserContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      savedWorkers,
      toggleSavedWorker,
      isWorkerSaved
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
