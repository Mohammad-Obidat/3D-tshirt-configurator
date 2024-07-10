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
  const tabClassMap: { [key: string]: string } = {
    stylish: 'stylish-tab',
    controls: 'control-tab',
    design: 'design-tab',
  };

  const handleTabClick = (id: number, tabType: string) => {
    setActiveTab(id, tabType);
  };

  return (
    <>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => handleTabClick(tab.id, tabsType)}
          className={`${tabClassMap[tabsType]} ${tab.isActive ? 'active' : ''}`}
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
