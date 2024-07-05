import React from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import { GlobalStoreProvider } from './store/GlobalStore.tsx';
import './styles/App.css';
import NavBar from './components/NavBar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className='grid-container'>
        <Home />
        <GlobalStoreProvider>
          <div className='canvas-container'>
            <ThreeCanvas />
          </div>
        </GlobalStoreProvider>
      </div>
      <Footer />
    </>
  );
};

export default App;
