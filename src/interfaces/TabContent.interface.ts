import { Object3D } from 'three';
import TextureManager from '../lib/TextureManager';
import CanvasTextureManager from '../lib/CanvasTexture';
import { TabProps, TabsProps } from './Tabs.interface';

export type TabType = 'stylish' | 'controls' | 'design' | 'colors';

export interface ColorState {
  tabs: string[];
  chosen: { main: string; design: string };
  chosenType: 'main' | 'design';
  isAppear: boolean;
}

export interface CustomizerState {
  stylish: { tabs: TabsProps; chosen: TabProps };
  controls: { tabs: TabsProps; chosen: TabProps };
  design: { tabs: TabsProps; chosen: TabProps };
  colors: ColorState;
}

export interface TabContentProps {
  stylishTab: TabProps;
  model: Object3D | undefined;
  designObj: { tabs: TabsProps; chosen: TabProps };
  colorObj: ColorState;
  controlTab: TabProps;
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
  controlTab: TabProps;
}
