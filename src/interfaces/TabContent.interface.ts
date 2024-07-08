import { Object3D } from 'three';
import { TabProps } from './Tabs.interface';
import TextureManager from '../lib/TextureManager';

export interface TabContent {
  tab: TabProps;
}

export interface DesignContent {
  textureManager: TextureManager | null;
}

export interface ColorContent {
  tshirt: Object3D | undefined;
  textureManager: TextureManager | null;
}
