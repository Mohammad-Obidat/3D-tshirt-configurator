export interface TextureCoordinate {
  x: number;
  y: number;
}

export interface TextureObject {
  path: string;
  coordinates: TextureCoordinate;
}

export interface Textures {
  front: TextureObject[];
  back: TextureObject[];
  rightHand: TextureObject;
  leftHand: TextureObject;
}
