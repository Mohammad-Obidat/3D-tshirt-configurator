import React, { useState } from 'react';
import { DesignTabs } from '../config/constants/DesignTabs.constant';
import { TabsProps } from '../interfaces/Tabs.interface';
import '../styles/Design.css';

const Design: React.FC = () => {
  const [tabs, setTabs] = useState<TabsProps>(DesignTabs);

  const setActiveTab = (id: number) => {
    const updatedTabs = tabs.map((tab) => {
      if (tab.id === id) {
        return { ...tab, isActive: true };
      } else {
        return { ...tab, isActive: false };
      }
    });
    setTabs(updatedTabs);
  };

  return (
    <div className='design-container'>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`design-item ${tab.isActive ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <div className='img-container'>
            <img src={tab.imageUrl} alt={tab.title} className='design-img' />
            <span>{tab.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Design;
