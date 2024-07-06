import React from 'react';
import { DesignTabs } from '../config/constants/DesignTabs.constant';
import '../styles/Design.css';

const Design: React.FC = () => {
  return (
    <div className='design-container'>
      {DesignTabs.map((tab) => (
        <div key={tab.id} className='design-item'>
          <div className={`img-container ${tab.isActive}`}>
            <img src={tab.imageUrl} alt={tab.title} className='design-img' />
            <span>{tab.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Design;
