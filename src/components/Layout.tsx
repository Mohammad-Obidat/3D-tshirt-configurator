import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import GlobalStoreProvider from '../store/GlobalStore';
import ThreeCanvas from './canvas/ThreeCanvas.tsx';
import Footer from './Footer';
import '../styles/App.css';

const Layout: React.FC = () => {
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  return (
    <>
      <NavBar />
      <div className='grid-container'>
        <GlobalStoreProvider>
          <div className='canvas-container'>
            <ThreeCanvas onLoaded={() => setIsCanvasLoaded(true)} />
          </div>
          {isCanvasLoaded && <Outlet />}
        </GlobalStoreProvider>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
