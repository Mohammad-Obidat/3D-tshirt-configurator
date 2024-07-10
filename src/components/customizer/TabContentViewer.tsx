import React, { useEffect, useRef, useState } from 'react';
import { TabContent } from '../../interfaces/TabContent.interface';
import TextureManager from '../../lib/TextureManager';
import Design from './Design';
import Colors from './Colors';
import Text from './Text';
import Logos from './Logos';

const TabContentViewer: React.FC<TabContent> = ({
  tab,
  model,
  designObj,
  colorObj,
  setActiveTab,
}) => {
  const textureManagerRef = useRef<TextureManager | null>(null);
  const [textureManager, setTextureManager] = useState<TextureManager | null>(
    null
  );

  useEffect(() => {
    if (model) {
      if (!textureManagerRef.current) {
        textureManagerRef.current = new TextureManager(model);
        setTextureManager(textureManagerRef.current);
      }
    }
  }, [model]);

  switch (tab.id && tab.title) {
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
          tabs={colorObj.tabs}
        />
      );
    case 3 && 'Text':
      return <Text />;
    case 4 && 'Logos':
      return <Logos />;
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
