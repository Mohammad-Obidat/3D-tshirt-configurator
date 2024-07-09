import React, { useEffect, useState } from 'react';
import Tabs from '../components/Tabs';
import TabContentViewer from '../components/customizer/TabContentViewer';
import { stylishTabs } from '../config/constants/StylishTabs.constant';
import { controlsTabs } from '../config/constants/ControlTabx';
import { TabProps, TabsProps } from '../interfaces/Tabs.interface';
import { CustomizerProps } from '../interfaces/App.interface';
import '../styles/Customizer.css';

const Customizer: React.FC<CustomizerProps> = ({ model, navigateTo }) => {
  const [stylyTabs, setStylyTabs] = useState<TabsProps>(stylishTabs);
  const [chosenStyleTab, setChosenStyleTab] = useState<TabProps>(
    stylishTabs[0]
  );
  const [controlTabs, setControlTabs] = useState<TabsProps>(controlsTabs);
  const [chosenControlTab, setChosenControlTab] = useState<TabProps>(
    controlsTabs[0]
  );

  useEffect(() => {
    navigateTo('customizer');
  }, [navigateTo]);

  const setActiveTab = (id: number) => {
    const updatedTabs = stylyTabs.map((tab) => {
      if (tab.id === id) {
        setChosenStyleTab(tab);
        return { ...tab, isActive: true };
      } else {
        return { ...tab, isActive: false };
      }
    });
    setStylyTabs(updatedTabs);
  };

  return (
    <div className='customizer-container'>
      <div className='stylishTabs'>
        <Tabs tabs={stylyTabs} tabsType='stylish' setActiveTab={setActiveTab} />
      </div>
      <div className='customView-container'>
        <div className='viewer-container'>
          <TabContentViewer tab={chosenStyleTab} model={model} />
        </div>
        <div className='controlTabs-container'>
          <Tabs
            tabs={controlTabs}
            tabsType='controls'
            setActiveTab={() => console.log('control')}
          />
        </div>
      </div>
      <div className='contact-tabs'></div>
    </div>
  );
};

export default Customizer;
