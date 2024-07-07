import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Object3D } from 'three';
import { AppState } from '../interfaces/App.interface';

const GlobalStoreContext = createContext<AppState | undefined>(undefined);

const GlobalStoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isIntro, setIsIntro] = useState<boolean>(true);
  const [tshirt, setTshirt] = useState<Object3D | undefined>(undefined);

  return (
    <GlobalStoreContext.Provider
      value={{ isIntro, tshirt, setTshirt, setIsIntro }}
    >
      {children}
    </GlobalStoreContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalStore = (): AppState => {
  const context = useContext(GlobalStoreContext);
  if (context === undefined) {
    throw new Error('useGlobalStore must be used within a GlobalStoreProvider');
  }
  return context;
};

export default GlobalStoreProvider;
