import { Mesh, Texture } from 'three';

type SleeveKeys = 'front' | 'back' | 'rightSleeve' | 'leftSleeve';

export interface TargetChild extends Record<SleeveKeys, Mesh> {
  [key: string]: Mesh;
}

export interface CanvasProps {
  mesh: Mesh;
  canvasTexture: Texture;
}

export interface CanvasTextProps extends CanvasProps {
  text: string;
}

export interface CanvasImageProps extends CanvasProps {
  imageUrl: string;
}

type UserInput<InputType> = Record<SleeveKeys, InputType[]> & {
  [key: string]: InputType[];
};

export type UserTextInput = UserInput<CanvasTextProps>;
export type UserImageInput = UserInput<CanvasImageProps>;
