import React from 'react';
import { TabProps } from '../interfaces/Tabs.interface';

const Tab: React.FC<TabProps> = ({ title, imageUrl }) => {
  return (
    <>
      {imageUrl ? (
        <div className='img-container'>
          <img src={imageUrl} alt={title} className='design-img stylish-img' />
          <div>{title}</div>
        </div>
      ) : (
        <>{title}</>
      )}
    </>
  );
};

export default Tab;
