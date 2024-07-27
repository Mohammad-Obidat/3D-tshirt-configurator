import React, { useEffect, useState } from 'react';
import Tabs from '../components/Tabs';
import TabContentViewer from '../components/customizer/TabContentViewer';
import ViewerHeader from '../components/ViewerHeader';
import { stylishTabs } from '../config/constants/StylishTabs.constant';
import { controlsTabs } from '../config/constants/ControlTabs.constant';
import { DesignTabs } from '../config/constants/DesignTabs.constant';
import { colors } from '../config/constants/Colors.constant';
import { CustomizerProps } from '../interfaces/App.interface';
import {
  CustomizerState,
  ColorState,
  TabType,
} from '../interfaces/TabContent.interface';
import { TabProps, TabsProps } from '../interfaces/Tabs.interface';
import '../styles/Customizer.css';

const Customizer: React.FC<CustomizerProps> = ({ model, navigateTo }) => {
  const initialColorState: ColorState = {
    tabs: colors,
    chosen: { main: '', design: '' },
    chosenType: 'main',
    isAppear: false,
  };

  const [tabsState, setTabsState] = useState<CustomizerState>({
    stylish: { tabs: stylishTabs, chosen: stylishTabs[0] },
    controls: { tabs: controlsTabs, chosen: controlsTabs[0] },
    design: { tabs: DesignTabs, chosen: DesignTabs[0] },
    colors: initialColorState,
  });

  useEffect(() => {
    navigateTo('customizer');
  }, [navigateTo]);

  const setActiveTab = (id: number, type: TabType) => {
    setTabsState((prevState) => {
      const updatedTabs = (prevState[type].tabs as TabsProps).map(
        (tab: TabProps) => ({
          ...tab,
          isActive: tab.id === id,
        })
      );

      return {
        ...prevState,
        [type]: {
          ...prevState[type],
          tabs: updatedTabs,
          chosen:
            updatedTabs.find((tab: TabProps) => tab.id === id) ||
            prevState[type].chosen,
        },
      };
    });
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
          <ViewerHeader
            title={tabsState.stylish.chosen.title}
            desc={tabsState.stylish.chosen.description!}
          />
          {tabsState.stylish.chosen.title !== 'Design' && (
            <div className='controlTabs-container'>
              <Tabs
                tabs={tabsState.controls.tabs}
                tabsType='controls'
                setActiveTab={(id) => setActiveTab(id, 'controls')}
              />
            </div>
          )}
          <div id='scrollable'></div>
          <TabContentViewer
            stylishTab={tabsState.stylish.chosen}
            model={model}
            designObj={tabsState.design}
            colorObj={tabsState.colors}
            controlTab={tabsState.controls.chosen}
            setTabsState={setTabsState}
            setActiveTab={(id) => setActiveTab(id, 'design')}
          />
        </div>
      </div>

      {/* <div className='contact-tabs'></div> */}
    </div>
  );
};

export default Customizer;
