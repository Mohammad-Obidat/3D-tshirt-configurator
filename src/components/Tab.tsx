import React from 'react';
import { TabProps } from '../interfaces/Tabs.interface';

const Tab: React.FC<TabProps> = ({ title, imageUrl }) => {
  const separateTitle = (title: string): string => {
    if (title === 'rightSleeve' || title === 'leftSleeve') {
      const newTitle = title.replace(/([a-z])([A-Z])/, '$1 $2').toLowerCase();
      return newTitle;
    }

    return title;
  };

  return (
    <>
      {imageUrl ? (
        <div className='img-container'>
          <img src={imageUrl} alt={title} className='design-img stylish-img' />
          <div>{title}</div>
        </div>
      ) : (
        <>{separateTitle(title)}</>
      )}
    </>
  );
};

export default Tab;
