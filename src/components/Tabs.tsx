import React from 'react';
import Tab from './Tab';
import { TabsComponentProps } from '../interfaces/Tabs.interface';
import '../styles/Tabs.css';

const Tabs: React.FC<TabsComponentProps> = ({
  tabs,
  tabsType,
  setActiveTab,
}) => {
  return (
    <>
      {tabsType === 'stylish' &&
        tabs.map((tab) => (
          <div key={tab.id} onClick={() => setActiveTab(tab.id)}>
            <div className={`tab ${tab.isActive ? 'active' : ''}`}>
              <Tab id={tab.id} title={tab.title} isActive={tab.isActive} />
            </div>
          </div>
        ))}
    </>
  );
};

export default Tabs;
