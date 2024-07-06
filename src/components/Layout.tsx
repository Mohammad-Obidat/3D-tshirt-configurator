import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { GlobalStoreProvider } from '../store/GlobalStore';
import ThreeCanvas from './canvas/ThreeCanvas.tsx';
import Footer from './Footer';
import '../styles/App.css';

const Layout: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className='grid-container'>
        <GlobalStoreProvider>
          <Outlet />
          <div className='canvas-container'>
            <ThreeCanvas />
          </div>
        </GlobalStoreProvider>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
