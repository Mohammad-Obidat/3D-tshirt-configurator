import { Texture } from 'three';
import { ColorType } from './TabContent.interface';

export interface TextureObject {
  id: string;
  path: string;
}

export interface Textures {
  front?: TextureObject[];
  back?: TextureObject[];
  rightHand?: TextureObject[];
  leftHand?: TextureObject[];
}

export interface TextureProps {
  texture: Texture;
  colorType: ColorType;
}

export interface LoadedTextures {
  front?: TextureProps[];
  back?: TextureProps[];
  rightHand?: TextureProps[];
  leftHand?: TextureProps[];
  [key: string]: TextureProps[] | undefined;
}
