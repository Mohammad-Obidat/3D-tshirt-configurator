import React, { useEffect } from 'react';
import { HomeProps } from '../interfaces/App.interface';
import '../styles/Home.css';

const Home: React.FC<HomeProps> = ({ navigateTo }) => {
  useEffect(() => {
    navigateTo('home');
  }, [navigateTo]);

  return (
    <div className='content'>
      <h1 className='content-text'>
        LET'S <span>DO IT.</span>
      </h1>
      <p className='content-para'>
        Create your unique and exclusive shirt with our brand-new 3D
        customization tool. <strong>Unleash your imagination</strong> and define
        your own style.
      </p>

      <button className='customize-btn'>
        <a className='home-link' onClick={() => navigateTo('customizer')}>
          Customize it
        </a>
      </button>
    </div>
  );
};

export default Home;
