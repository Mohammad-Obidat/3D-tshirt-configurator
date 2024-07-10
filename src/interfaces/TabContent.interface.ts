import { Object3D } from 'three';
import TextureManager from '../lib/TextureManager';
import { TabProps, TabsProps } from './Tabs.interface';

export type TabType = 'stylish' | 'controls' | 'design' | 'colors';

export interface ColorState {
  tabs: Array<string>;
  chosen: { main: string; design: string };
  chosenType: 'main' | 'design';
  isAppear: boolean;
}

export interface AppState {
  stylish: { tabs: TabsProps; chosen: TabProps };
  controls: { tabs: TabsProps; chosen: TabProps };
  design: { tabs: TabsProps; chosen: TabProps };
  colors: ColorState;
}

export interface TabContent {
  tab: TabProps;
  model: Object3D | undefined;
  designObj: { tabs: TabsProps; chosen: TabProps };
  colorObj: ColorState;
  setTabsState: React.Dispatch<React.SetStateAction<AppState>>;
  setActiveTab: (id: number, type: TabType) => void;
}

export interface DesignContent {
  textureManager: TextureManager | null;
  designObj: { tabs: TabsProps; chosen: TabProps };
  setActiveTab: (id: number, type: TabType) => void;
}

export interface ColorContent {
  model: Object3D | undefined;
  textureManager: TextureManager | null;
  colorObj: ColorState;
  setTabsState: React.Dispatch<React.SetStateAction<AppState>>;
}
