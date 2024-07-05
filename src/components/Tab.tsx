import React from 'react';

interface TabProps {
  title: string;
}

const Tab: React.FC<TabProps> = ({ title }) => {
  return <div>{title}</div>;
};

export default Tab;
