import { Object3D } from 'three';
import TextureManager from '../lib/TextureManager';
import { TabProps, TabsProps } from './Tabs.interface';

export interface TabContent {
  tab: TabProps;
  model: Object3D | undefined;
  designObj: { tabs: TabsProps; chosen: TabProps };
  colorObj: { tabs: Array<string>; chosen: Array<string>[0] };
  setActiveTab: (id: number, type: string) => void;
}

export interface DesignContent {
  textureManager: TextureManager | null;
  designObj: { tabs: TabsProps; chosen: TabProps };
  setActiveTab: (id: number, type: string) => void;
}

export interface ColorContent {
  model: Object3D | undefined;
  textureManager: TextureManager | null;
  tabs: Array<string>;
}
