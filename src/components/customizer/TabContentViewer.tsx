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
  controlTab,
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
    case 2 && 'Colors':
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
          controlTab={controlTab}
        />
      );
    case 4 && 'Logos':
      return (
        <Logos
          canvasTextureManager={canvasTextureManager}
          model={model}
          controlTab={controlTab}
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
