import React from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import { GlobalStoreProvider } from './store/GlobalStore.tsx';
import './styles/App.css';
import NavBar from './components/NavBar.tsx';

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <GlobalStoreProvider>
        <ThreeCanvas />
      </GlobalStoreProvider>
    </>
  );
};

export default App;
