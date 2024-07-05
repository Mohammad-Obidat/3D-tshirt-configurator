import React from 'react';
import Tabs from '../components/Tabs';
import TabContentViewer from '../components/TabContentViewer';
import { EditorTabs } from '../config/constants';

const Customizer: React.FC = () => {
  return (
    <div className='container'>
      <div className='design-tabs'>
        <Tabs editorTabs={EditorTabs} />
      </div>
      <div className='viewer-container'>
        <TabContentViewer />
      </div>
      <div className='contact-tabs'></div>
    </div>
  );
};

export default Customizer;
