import React, { useEffect, useRef, useState } from 'react';
import { TabContentProps } from '../../interfaces/TabContent.interface';
import TextureManager from '../../lib/TextureManager';
import CanvasTextureManager from '../../lib/CanvasTexture';
import Design from './Design';
import Colors from './Colors';
import Text from './Text';
import Logos from './Logos';

const TabContentViewer: React.FC<TabContentProps> = ({
  stylishTab,
  model,
  designObj,
  colorObj,
  targetTab,
  setTabsState,
  setActiveTab,
}) => {
  const textureManagerRef = useRef<TextureManager | null>(null);
  const [textureManager, setTextureManager] = useState<TextureManager | null>(
    null
  );
  const canvasTextureManagerRef = useRef<CanvasTextureManager | null>(null);
  const [canvasTextureManager, setCanvasTextureManager] =
    useState<CanvasTextureManager | null>(null);

  useEffect(() => {
    if (model) {
      if (!textureManagerRef.current) {
        textureManagerRef.current = new TextureManager(model);
        setTextureManager(textureManagerRef.current);
      }

      if (!canvasTextureManagerRef.current) {
        canvasTextureManagerRef.current = new CanvasTextureManager(model);
        setCanvasTextureManager(canvasTextureManagerRef.current);
      }
    }
  }, [model]);

  switch (stylishTab.id && stylishTab.title) {
    case 1 && 'Design':
      return (
        <Design
          textureManager={textureManager}
          designObj={designObj}
          setActiveTab={setActiveTab}
        />
      );
    case 2 && 'Color':
      return (
        <Colors
          model={model}
          textureManager={textureManager}
          colorObj={colorObj}
          setTabsState={setTabsState}
        />
      );
    case 3 && 'Text':
      return (
        <Text
          canvasTextureManager={canvasTextureManager}
          model={model}
          targetTab={targetTab}
        />
      );
    case 4 && 'Logo':
      return (
        <Logos
          canvasTextureManager={canvasTextureManager}
          model={model}
          targetTab={targetTab}
        />
      );
    default:
      return (
        <Design
          textureManager={textureManager}
          designObj={designObj}
          setActiveTab={setActiveTab}
        />
      );
  }
};

export default TabContentViewer;
