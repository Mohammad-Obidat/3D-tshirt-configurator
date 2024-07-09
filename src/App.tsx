import React, { useEffect, useState } from 'react';
import { Object3D } from 'three';
import NavBar from './components/NavBar.tsx';
import loadShirtModel from './config/helpers/ThreeLoaders.ts';
import ThreeCanvas from './components/canvas/ThreeCanvas.tsx';
import Home from './pages/Home.tsx';
import Customizer from './pages/Customizer.tsx';
import Footer from './components/Footer.tsx';
import './styles/App.css';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [component, setComponent] = useState<string>('home');
  const [model, setModel] = useState<Object3D | undefined>(undefined);

  const navigateTo = (name: string): void => {
    setComponent(name);
  };

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
      <NavBar navigateTo={navigateTo} />
      <div className='grid-container'>
        <ThreeCanvas model={model} isLoading={isLoading} isIntro={component} />
        {component === 'home' ? (
          <Home navigateTo={navigateTo} />
        ) : (
          <Customizer model={model} navigateTo={navigateTo} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;
