import { TabType } from './TabContent.interface';
import { Textures } from './Textures.interface';

export interface TabProps {
  id: number;
  title: string;
  description?: string;
  isActive: boolean;
  imageUrl?: string;
  textures?: Textures;
}

export type TabsProps = TabProps[];

export interface TabsComponentProps {
  tabs: TabsProps;
  tabsType: TabType;
  setActiveTab: (id: number, type: TabType) => void;
}
