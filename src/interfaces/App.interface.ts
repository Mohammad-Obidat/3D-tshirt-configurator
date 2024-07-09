import { Object3D } from 'three';

export interface ThreeCanvasProps {
  model: Object3D | undefined;
  isLoading: boolean;
  isIntro: string;
}

export interface CustomizerProps {
  model: Object3D | undefined;
  navigateTo: (component: string) => void;
}

export interface HomeProps {
  navigateTo: (component: string) => void;
}

export interface NavbarProps {
  navigateTo: (component: string) => void;
}
