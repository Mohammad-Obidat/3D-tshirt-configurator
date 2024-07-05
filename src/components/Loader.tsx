import React from 'react';
import { useGlobalStore } from '../store/GlobalStore.tsx';
import '../styles/Loader.css';

const Loader: React.FC = () => {
  const { progress } = useGlobalStore();

  return (
    <>
      <div className='CenterContainer'>
        <p className='LoaderPara'>Loading ... {progress.toFixed(2)}%</p>
        <img
          src='/assets/images/preloader_shirt_final.gif'
          alt='Loader image'
        />
      </div>
    </>
  );
};

export default Loader;
