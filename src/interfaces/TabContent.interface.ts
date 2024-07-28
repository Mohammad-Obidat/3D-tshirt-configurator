import { Object3D } from 'three';
import TextureManager from '../lib/TextureManager';
import CanvasTextureManager from '../lib/CanvasTexture';
import { TabProps, TabsProps } from './Tabs.interface';

export type TabType = 'stylish' | 'target' | 'design' | 'color';
export type ColorType = 'main' | 'element_1' | 'element_2' | 'element_3';
export type ChosenColorType = {
  main: string;
  element_1: string;
  element_2: string;
  element_3: string;
};

export interface ColorState {
  tabs: string[];
  chosen: ChosenColorType;
  chosenType: ColorType;
  isAppear: boolean;
}

export interface CustomizerState {
  stylish: { tabs: TabsProps; chosen: TabProps };
  target: { tabs: TabsProps; chosen: TabProps };
  design: { tabs: TabsProps; chosen: TabProps };
  color: ColorState;
}

export interface TabContentProps {
  stylishTab: TabProps;
  model: Object3D | undefined;
  designObj: { tabs: TabsProps; chosen: TabProps };
  colorObj: ColorState;
  targetTab: TabProps;
  setTabsState: React.Dispatch<React.SetStateAction<CustomizerState>>;
  setActiveTab: (id: number, type: TabType) => void;
}

export interface DesignContentProps {
  textureManager: TextureManager | null;
  designObj: { tabs: TabsProps; chosen: TabProps };
  setActiveTab: (id: number, type: TabType) => void;
}

export interface ColorContentProps {
  model: Object3D | undefined;
  textureManager: TextureManager | null;
  colorObj: ColorState;
  setTabsState: React.Dispatch<React.SetStateAction<CustomizerState>>;
}

export interface UserInputProps {
  canvasTextureManager: CanvasTextureManager | null;
  model: Object3D | undefined;
  targetTab: TabProps;
}
