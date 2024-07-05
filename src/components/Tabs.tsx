import React from 'react';
import Tab from './Tab';

interface Tab {
  title: string;
}

interface TabsProps {
  editorTabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ editorTabs }) => {
  return (
    <>
      {editorTabs.map((tab, index) => (
        <div key={index}>
          <Tab title={tab.title} />
        </div>
      ))}
    </>
  );
};

export default Tabs;
