import React, { useEffect, useState } from 'react';
import Tabs from '../components/Tabs';
import TabContentViewer from '../components/customizer/TabContentViewer';
import { stylishTabs } from '../config/constants/stylishTabs.constant';
import { TabProps, TabsProps } from '../interfaces/Tabs.interface';
import { useGlobalStore } from '../store/GlobalStore';
import '../styles/Customizer.css';

const Customizer: React.FC = () => {
  const [tabs, setTabs] = useState<TabsProps>(stylishTabs);
  const [chosenTab, setChosenTab] = useState<TabProps>(stylishTabs[0]);
  const { isIntro, setIsIntro } = useGlobalStore();

  useEffect(() => {
    setIsIntro(false);
  }, [isIntro, setIsIntro]);

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
        <TabContentViewer tab={chosenTab} />
      </div>
      <div className='contact-tabs'></div>
    </div>
  );
};

export default Customizer;
