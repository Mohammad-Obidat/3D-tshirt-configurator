import React from 'react';
import Tab from './Tab';
import { TabsComponentProps } from '../interfaces/Tabs.interface';
import '../styles/Tabs.css';
import '../styles/Design.css';

const Tabs: React.FC<TabsComponentProps> = ({
  tabs,
  tabsType,
  setActiveTab,
}) => {
  return (
    <>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`${
            tabsType === 'stylish'
              ? 'stylish-tab'
              : tabsType === 'design'
              ? 'design-tab'
              : tabsType === 'controls'
              ? 'control-tab'
              : ''
          } ${tab.isActive ? 'active' : ''}`}
        >
          <Tab
            id={tab.id}
            title={tab.title}
            isActive={tab.isActive}
            imageUrl={tab.imageUrl}
          />
        </div>
      ))}
    </>
  );
};

export default Tabs;
