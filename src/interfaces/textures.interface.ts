import { Texture } from 'three';
import { ColorType } from './TabContent.interface';

export interface TextureObject {
  id: string;
  path: string;
}

export interface Textures {
  front?: TextureObject[];
  back?: TextureObject[];
  rightSleeve?: TextureObject[];
  leftSleeve?: TextureObject[];
}

export interface TextureProps {
  texture: Texture;
  colorType: ColorType;
}

export interface LoadedTextures {
  front?: TextureProps[];
  back?: TextureProps[];
  rightSleeve?: TextureProps[];
  leftSleeve?: TextureProps[];
  [key: string]: TextureProps[] | undefined;
}
