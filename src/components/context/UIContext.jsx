// GlobalComponentManagerContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the context
export const GlobalComponentManagerContext = createContext();

// Create the provider component
export const GlobalComponentManagerProvider = ({ children }) => {
  const [state, setState] = useState({
    noteBox: {
      isVisible: false
    }
  });

  // Function to set state for a specific key
  const setComponentState = useCallback((key, newState) => {
    setState((prevState) => ({
      ...prevState,
      [key]: { ...prevState[key], ...newState }
    }));
  }, []);

  return (
    <GlobalComponentManagerContext.Provider value={{ state, setComponentState }}>
      {children}
    </GlobalComponentManagerContext.Provider>
  );
};

// Create a custom hook to use the context
export const useGlobalComponentManager = () => {
  const context = useContext(GlobalComponentManagerContext);
  if (context === undefined) {
    throw new Error('useGlobalComponentManager must be used within a GlobalComponentManagerProvider');
  }
  return context;
};
