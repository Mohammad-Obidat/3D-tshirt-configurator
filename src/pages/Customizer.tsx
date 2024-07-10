import React, { useEffect, useState } from 'react';
import Tabs from '../components/Tabs';
import TabContentViewer from '../components/customizer/TabContentViewer';
import { stylishTabs } from '../config/constants/StylishTabs.constant';
import { controlsTabs } from '../config/constants/ControlTabs.constant';
import { DesignTabs } from '../config/constants/DesignTabs.constant';
import { colors } from '../config/constants/Colors.constant';
import { CustomizerProps } from '../interfaces/App.interface';
import '../styles/Customizer.css';

const Customizer: React.FC<CustomizerProps> = ({ model, navigateTo }) => {
  const [tabsState, setTabsState] = useState({
    stylish: { tabs: stylishTabs, chosen: stylishTabs[0] },
    controls: { tabs: controlsTabs, chosen: controlsTabs[0] },
    designs: { tabs: DesignTabs, chosen: DesignTabs[0] },
    colors: { tabs: colors, chosen: colors[0] },
  });

  useEffect(() => {
    navigateTo('customizer');
  }, [navigateTo]);

  const setActiveTab = (
    id: number,
    type: 'stylish' | 'controls' | 'designs'
  ) => {
    const updatedTabs = tabsState[type].tabs.map((tab) => {
      if (tab.id === id) {
        return { ...tab, isActive: true };
      } else {
        return { ...tab, isActive: false };
      }
    });
    setTabsState((prevState) => ({
      ...prevState,
      [type]: {
        tabs: updatedTabs,
        chosen: updatedTabs.find((tab) => tab.id === id)!,
      },
    }));
  };

  return (
    <div className='customizer-container'>
      <div className='stylishTabs'>
        <Tabs
          tabs={tabsState.stylish.tabs}
          tabsType='stylish'
          setActiveTab={(id) => setActiveTab(id, 'stylish')}
        />
      </div>
      <div className='customView-container'>
        <div className='viewer-container'>
          <TabContentViewer
            tab={tabsState.stylish.chosen}
            model={model}
            designObj={tabsState.designs}
            colorObj={tabsState.colors}
            setActiveTab={(id) => setActiveTab(id, 'designs')}
          />
        </div>
        <div className='controlTabs-container'>
          <Tabs
            tabs={tabsState.controls.tabs}
            tabsType='controls'
            setActiveTab={(id) => setActiveTab(id, 'controls')}
          />
        </div>
      </div>
      <div className='contact-tabs'></div>
    </div>
  );
};

export default Customizer;
