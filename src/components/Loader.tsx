import React from 'react';
import '../styles/Loader.css';

const Loader: React.FC = () => {
  return (
    <>
      <div className='CenterContainer'>
        <img
          src='/assets/images/preloader_shirt_final.gif'
          alt='Loader image'
        />
      </div>
    </>
  );
};

export default Loader;
