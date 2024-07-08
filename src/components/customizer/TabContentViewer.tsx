import React, { useEffect, useRef, useState } from 'react';
import { TabContent } from '../../interfaces/TabContent.interface';
import { useGlobalStore } from '../../store/GlobalStore';
import TextureManager from '../../lib/TextureManager';
import Design from './Design';
import Colors from './Colors';
import Text from './Text';
import Logos from './Logos';

const TabContentViewer: React.FC<TabContent> = ({ tab }) => {
  const textureManagerRef = useRef<TextureManager | null>(null);
  const { tshirt } = useGlobalStore();
  const [textureManager, setTextureManager] = useState<TextureManager | null>(
    null
  );

  useEffect(() => {
    if (tshirt) {
      if (!textureManagerRef.current) {
        textureManagerRef.current = new TextureManager(tshirt);
        setTextureManager(textureManagerRef.current);
      }
    }
  }, [tshirt]);

  switch (tab.id && tab.title) {
    case 1 && 'Design':
      return <Design textureManager={textureManager} />;
    case 2 && 'Colors':
      return <Colors tshirt={tshirt} textureManager={textureManager} />;
    case 3 && 'Text':
      return <Text />;
    case 4 && 'Logos':
      return <Logos />;
    default:
      return <Design textureManager={textureManager} />;
  }
};

export default TabContentViewer;
