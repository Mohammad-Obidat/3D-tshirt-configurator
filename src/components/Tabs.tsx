import React from 'react';
import Tab from './Tab';
import { TabsComponentProps } from '../interfaces/Tabs.interface';
import '../styles/Tabs.css';

const Tabs: React.FC<TabsComponentProps> = ({ editorTabs, setActiveTab }) => {
  return (
    <>
      {editorTabs.map((tab) => (
        <div key={tab.id} onClick={() => setActiveTab(tab.id)}>
          <Tab id={tab.id} title={tab.title} isActive={tab.isActive} />
        </div>
      ))}
    </>
  );
};

export default Tabs;
