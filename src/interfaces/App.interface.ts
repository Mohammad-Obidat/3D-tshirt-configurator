import { Dispatch, SetStateAction } from 'react';
import { Object3D } from 'three';

export interface AppState {
  isIntro: boolean;
  tshirt: Object3D | undefined;
  setIsIntro: Dispatch<SetStateAction<boolean>>;
  setTshirt: Dispatch<SetStateAction<Object3D | undefined>>;
}

export interface ThreeCanvasProps {
  model: Object3D | undefined;
  isLoading: boolean;
}
