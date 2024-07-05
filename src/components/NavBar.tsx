import React from 'react';
import '../styles/Navbar.css';

const NavBar: React.FC = () => {
  return (
    <>
      <nav className='navbar'>
        <div className='navbarContainer'>
          <div className='logo'>
            <img src='/assets/textures/Logo.png' alt='Store Logo' />
          </div>
          <div className='navbar-buttons'>
            <a href='#' className='btn'>
              Home
            </a>
            <a href='#' className='btn'>
              Customizer
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
