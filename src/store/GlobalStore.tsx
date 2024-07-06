import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState } from '../interfaces/App.interface';

const GlobalStoreContext = createContext<AppState | undefined>(undefined);

const GlobalStoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  return (
    <GlobalStoreContext.Provider
      value={{
        isLoading,
        progress,
        setIsLoading,
        setProgress,
      }}
    >
      {children}
    </GlobalStoreContext.Provider>
  );
};

const useGlobalStore = (): AppState => {
  const context = useContext(GlobalStoreContext);
  if (!context) {
    throw new Error('useGlobalStore must be used within a GlobalStoreProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { GlobalStoreProvider, useGlobalStore };
