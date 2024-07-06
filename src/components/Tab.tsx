import React from 'react';
import { TabProps } from '../interfaces/Tabs.interface';

const Tab: React.FC<TabProps> = ({ id, title, isActive }) => {
  return (
    <div key={id} className={`tab ${isActive ? 'active' : ''}`}>
      {title}
    </div>
  );
};

export default Tab;
