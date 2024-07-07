import React from 'react';
import { TabProps } from '../interfaces/Tabs.interface';

const Tab: React.FC<TabProps> = ({ title }) => {
  return <>{title}</>;
};

export default Tab;
