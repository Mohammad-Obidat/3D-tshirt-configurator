import React, { useEffect, useState } from 'react';
import ViewerHeader from '../ViewerHeader';
import { DesignContentProps } from '../../interfaces/TabContent.interface';
import { TabProps } from '../../interfaces/Tabs.interface';
import { LoadedTextures } from '../../interfaces/Textures.interface';
import { loadAllTextures } from '../../config/helpers/ThreeLoaders';
import Tabs from '../Tabs';
import '../../styles/Design.css';

const Design: React.FC<DesignContentProps> = ({
  textureManager,
  designObj,
  setActiveTab,
}) => {
  const [textures, setTextures] = useState<LoadedTextures>({});
  const [selectedDesign, setSelectedDesign] = useState<TabProps>(
    designObj.chosen
  );

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
    if (designObj.chosen.id !== selectedDesign.id) {
      fetchTextures(designObj.chosen);
      setSelectedDesign(designObj.chosen);
    }
  }, [designObj.chosen, selectedDesign]);

  useEffect(() => {
    if (textureManager) {
      if (Object.keys(textures).length > 0) {
        textureManager.switchTexture(textures);
      }
    }
  }, [textures, textureManager]);

  return (
    <>
      <ViewerHeader title='Select design' desc='Choose a standard design' />
      <div className='design-container-tabs'>
        <Tabs
          tabs={designObj.tabs}
          tabsType='design'
          setActiveTab={setActiveTab}
        />
      </div>
    </>
  );
};

export default Design;
