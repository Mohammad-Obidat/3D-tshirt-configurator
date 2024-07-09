import React, { useEffect, useState } from 'react';
import Tabs from '../components/Tabs';
import TabContentViewer from '../components/customizer/TabContentViewer';
import { stylishTabs } from '../config/constants/StylishTabs.constant';
import { TabProps, TabsProps } from '../interfaces/Tabs.interface';
import { CustomizerProps } from '../interfaces/App.interface';
import '../styles/Customizer.css';

const Customizer: React.FC<CustomizerProps> = ({ model, navigateTo }) => {
  const [tabs, setTabs] = useState<TabsProps>(stylishTabs);
  const [chosenTab, setChosenTab] = useState<TabProps>(stylishTabs[0]);

  useEffect(() => {
    navigateTo('customizer');
  }, [navigateTo]);

  const setActiveTab = (id: number) => {
    const updatedTabs = tabs.map((tab) => {
      if (tab.id === id) {
        setChosenTab(tab);
        return { ...tab, isActive: true };
      } else {
        return { ...tab, isActive: false };
      }
    });
    setTabs(updatedTabs);
  };

  return (
    <div className='customizerContainer'>
      <div className='stylishTabs'>
        <Tabs tabs={tabs} tabsType='stylish' setActiveTab={setActiveTab} />
      </div>
      <div className='viewerContainer'>
        <TabContentViewer tab={chosenTab} model={model} />
      </div>
      <div className='contact-tabs'></div>
    </div>
  );
};

export default Customizer;
