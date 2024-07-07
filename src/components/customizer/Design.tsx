import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../../store/GlobalStore';
import ApplyTextures from '../../lib/ApplyTextures';
import { DesignTabs } from '../../config/constants/DesignTabs.constant';
import { TabProps, TabsProps } from '../../interfaces/Tabs.interface';
import { loadAllTextures } from '../../config/helpers/ThreeLoaders';
import { LoadedTextures } from '../../interfaces/Textures.interface';
import Tabs from '../Tabs';
import '../../styles/Design.css';

const Design: React.FC = () => {
  const { tshirt } = useGlobalStore();
  const [tabs, setTabs] = useState<TabsProps>(DesignTabs);
  const [chosenTab, setChosenTab] = useState<TabProps>(DesignTabs[0]);
  const [textures, setTextures] = useState<LoadedTextures>({});

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
        setChosenTab(tab);
        return { ...tab, isActive: true };
      } else {
        return { ...tab, isActive: false };
      }
    });
    setTabs(updatedTabs);
  };

  useEffect(() => {
    if (chosenTab) {
      fetchTextures(chosenTab);
    }
  }, [chosenTab]);

  useEffect(() => {
    if (Object.keys(textures).length > 0 && tshirt) {
      const applyTextures = new ApplyTextures(tshirt);
      applyTextures.applyTextureToShirt(textures);
    }
  });

  return (
    <div className='design-container'>
      <Tabs tabs={tabs} tabsType='design' setActiveTab={setActiveTab} />
    </div>
  );
};

export default Design;
