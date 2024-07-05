import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to='/' className='btn home-link'>
              Home
            </Link>
            <Link to='/customizer' className='btn home-link'>
              Customizer
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
