import TextureManager from '../lib/TextureManager';
import { TabProps } from './Tabs.interface';
import { Object3DModel } from './App.interface';

export interface TabContent {
  tab: TabProps;
  model: Object3DModel;
}

export interface DesignContent {
  textureManager: TextureManager | null;
}

export interface ColorContent {
  model: Object3DModel;
  textureManager: TextureManager | null;
}
