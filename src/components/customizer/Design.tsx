import React, { useState } from 'react';
import { Texture } from 'three';
import { DesignTabs } from '../../config/constants/DesignTabs.constant';
import { TabProps, TabsProps } from '../../interfaces/Tabs.interface';
import { loadAllTextures } from '../../config/helpers/ThreeLoaders';
import Tabs from '../Tabs';
import '../../styles/Design.css';

const Design: React.FC = () => {
  const [tabs, setTabs] = useState<TabsProps>(DesignTabs);
  const [textures, setTextures] = useState<{
    [key: string]: Texture[] | Texture;
  }>({});

  const fetchTextures = async (tab: TabProps) => {
    if (tab.textures) {
      try {
        const loadedTextures = await loadAllTextures(tab.textures);
        setTextures(loadedTextures);
      } catch (error) {
        console.error('Error loading textures:', error);
      }
    }
  };

  const setActiveTab = (id: number) => {
    const updatedTabs = tabs.map((tab) => {
      if (tab.id === id) {
        fetchTextures(tab);
        return { ...tab, isActive: true };
      } else {
        return { ...tab, isActive: false };
      }
    });
    setTabs(updatedTabs);
  };

  return (
    <div className='design-container'>
      <Tabs tabs={tabs} tabsType='design' setActiveTab={setActiveTab} />
    </div>
  );
};

export default Design;
