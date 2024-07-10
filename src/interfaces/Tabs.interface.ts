import { Textures } from './Textures.interface';
export interface TabProps {
  id: number;
  title: string;
  isActive: boolean;
  imageUrl?: string;
  textures?: Textures;
}

export type TabsProps = TabProps[];

export interface TabsComponentProps {
  tabs: TabsProps;
  tabsType: string;
  setActiveTab: (id: number, type: string) => void;
}
