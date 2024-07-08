import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Object3D } from 'three';
import loadShirtModel from '../config/helpers/ThreeLoaders.ts';
import NavBar from './NavBar';
import GlobalStoreProvider from '../store/GlobalStore';
import ThreeCanvas from './canvas/ThreeCanvas.tsx';
import Footer from './Footer';
import '../styles/App.css';

const Layout: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [model, setModel] = useState<Object3D | undefined>(undefined);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsLoading(true);
        const tshirtModel = await loadShirtModel();
        setModel(tshirtModel);
      } catch (error) {
        console.error('Error adding the t-shirt model to the scene:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadModel();
  }, []);

  return (
    <>
      <NavBar />
      <div className='grid-container'>
        <GlobalStoreProvider>
          <div className='canvas-container'>
            <ThreeCanvas model={model} isLoading={isLoading} />
          </div>
          <Outlet />
        </GlobalStoreProvider>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
