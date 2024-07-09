import { Object3D } from 'three';
import TextureManager from '../lib/TextureManager';
import { TabProps } from './Tabs.interface';

export interface TabContent {
  tab: TabProps;
  model: Object3D | undefined;
}

export interface DesignContent {
  textureManager: TextureManager | null;
}

export interface ColorContent {
  model: Object3D | undefined;
  textureManager: TextureManager | null;
}
