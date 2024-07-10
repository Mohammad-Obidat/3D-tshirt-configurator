import React, { useEffect, useState } from 'react';
import { DesignContent } from '../../interfaces/TabContent.interface';
import { TabProps } from '../../interfaces/Tabs.interface';
import { LoadedTextures } from '../../interfaces/Textures.interface';
import { loadAllTextures } from '../../config/helpers/ThreeLoaders';
import Tabs from '../Tabs';
import '../../styles/Design.css';

const Design: React.FC<DesignContent> = ({
  textureManager,
  designObj,
  setActiveTab,
}) => {
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

  useEffect(() => {
    if (designObj.chosen) {
      fetchTextures(designObj.chosen);
    }
  }, [designObj.chosen]);

  useEffect(() => {
    if (textureManager) {
      if (Object.keys(textures).length > 0) {
        textureManager.switchTexture(textures);
      }
    }
  }, [textures, textureManager]);

  return (
    <div className='design-container'>
      <Tabs
        tabs={designObj.tabs}
        tabsType='design'
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default Design;
