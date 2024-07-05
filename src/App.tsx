import React from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import { GlobalStoreProvider } from './store/GlobalStore.tsx';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <>
      <GlobalStoreProvider>
        <ThreeCanvas />
      </GlobalStoreProvider>
    </>
  );
};

export default App;
