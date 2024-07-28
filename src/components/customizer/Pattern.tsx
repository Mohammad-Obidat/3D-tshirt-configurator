import React from 'react';
import Tabs from '../Tabs';
import { patterns } from '../../config/constants/Patterns.constant';
import { TabType } from '../../interfaces/TabContent.interface';

interface PatternProps {
  setActiveTab: (id: number, type: TabType) => void;
}

const Pattern: React.FC<PatternProps> = ({ setActiveTab }) => {
  return (
    <>
      <div className='design-container-tabs'>
        <Tabs tabs={patterns} tabsType='design' />
      </div>
    </>
  );
};

export default Pattern;
