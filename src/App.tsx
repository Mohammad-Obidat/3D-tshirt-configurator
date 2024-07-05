import React from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import { GlobalStoreProvider } from './store/GlobalStore.tsx';
import './styles/App.css';
import NavBar from './components/NavBar.tsx';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <GlobalStoreProvider>
        <ThreeCanvas />
      </GlobalStoreProvider>
      <Footer />
    </>
  );
};

export default App;
