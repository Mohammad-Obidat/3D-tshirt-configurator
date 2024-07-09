import { Object3D } from 'three';

export interface Object3DModel {
  model: Object3D | undefined;
}

export interface ThreeCanvasProps {
  model: Object3DModel;
  isLoading: boolean;
  isIntro: string;
}

export interface CustomizerProps {
  model: Object3DModel;
  navigateTo: (component: string) => void;
}

export interface HomeProps {
  navigateTo: (component: string) => void;
}

export interface NavbarProps {
  navigateTo: (component: string) => void;
}
