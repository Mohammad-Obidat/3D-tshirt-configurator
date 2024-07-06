import React from 'react';
import { TabContent } from '../interfaces/TabContent.interface';
import Design from './Design';
import Colors from './Colors';
import Text from './Text';
import Logos from './Logos';

const TabContentViewer: React.FC<TabContent> = ({ tab }) => {
  switch (tab.id && tab.title) {
    case 1 && 'Design':
      return <Design />;
    case 2 && 'Colors':
      return <Colors />;
    case 3 && 'Text':
      return <Text />;
    case 4 && 'Logos':
      return <Logos />;
    default:
      return <Design />;
  }
};

export default TabContentViewer;
