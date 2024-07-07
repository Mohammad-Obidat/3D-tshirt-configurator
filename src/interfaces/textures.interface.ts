import { Texture } from 'three';

export interface TextureCoordinate {
  x: number;
  y: number;
}

export interface TextureObject {
  path: string;
  coordinates: TextureCoordinate;
}

export interface Textures {
  front?: TextureObject;
  back?: TextureObject;
  rightHand?: TextureObject;
  leftHand?: TextureObject;
}

export interface TextureWithCoordinates {
  texture?: Texture;
  coordinates?: { x: number; y: number };
}

export interface LoadedTextures {
  front?: TextureWithCoordinates;
  back?: TextureWithCoordinates;
  rightHand?: TextureWithCoordinates;
  leftHand?: TextureWithCoordinates;
  [key: string]: TextureWithCoordinates | undefined;
}
