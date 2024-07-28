import React from 'react';
import { NavbarProps } from '../interfaces/App.interface';
import '../styles/Navbar.css';

const NavBar: React.FC<NavbarProps> = ({ navigateTo }) => {
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <div className='logo'>
            <img src='/assets/icons/Logo.png' alt='Store Logo' />
            <span>𝒟𝑅𝐸𝒮𝒮𝑀𝐸</span>
          </div>
          <div className='navbar-buttons'>
            <div className='btn' onClick={() => navigateTo('home')}>
              Home
            </div>
            <div className='btn' onClick={() => navigateTo('customizer')}>
              Customizer
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
