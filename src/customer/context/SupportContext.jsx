import React, { createContext, useContext, useState } from 'react';

const SupportContext = createContext();

export const SupportProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSupport = () => setIsOpen(true);
  const closeSupport = () => setIsOpen(false);

  return (
    <SupportContext.Provider value={{ isOpen, openSupport, closeSupport }}>
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = () => useContext(SupportContext);
