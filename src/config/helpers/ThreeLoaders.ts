import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LoadedTextures, Textures } from '../../interfaces/Textures.interface';

const loadModel = (path: string): Promise<THREE.Object3D> => {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltf: GLTF) => {
        resolve(gltf.scene);
      },
      undefined,
      (error: unknown) => {
        if (error instanceof ErrorEvent) {
          console.error('Error loading GLTF model:', error);
          reject(error);
        }
      }
    );
  });
};

const loadShirtModel = (): Promise<THREE.Object3D> => {
  const tshirtModelPath = '/assets/models/HighNeckTshirt.glb';
  return loadModel(tshirtModelPath);
};

const loadTextures = (
  texturePath: string
): Promise<THREE.Texture | undefined> => {
  const loader = new THREE.TextureLoader();

  return new Promise<THREE.Texture | undefined>((resolve, reject) => {
    if (!texturePath) {
      resolve(undefined);
    } else {
      loader.load(
        texturePath,
        (texture) => resolve(texture),
        undefined,
        (err) => {
          console.error('Error loading texture.', err);
          reject(err);
        }
      );
    }
  });
};

const loadAllTextures = async (textures: Textures): Promise<LoadedTextures> => {
  if (!textures) {
    console.error('Textures are undefined');
    return {};
  }

  const loadTexture = async (
    path?: string
  ): Promise<THREE.Texture | undefined> => {
    if (path) {
      try {
        const textures = await loadTextures(path);
        return textures;
      } catch (error) {
        console.error('Error loading texture.', error);
        return undefined;
      }
    }
    return undefined;
  };

  const frontTexture = await loadTexture(textures.front?.path);
  const backTexture = await loadTexture(textures.back?.path);
  const rightHandTexture = await loadTexture(textures.rightHand?.path);
  const leftHandTexture = await loadTexture(textures.leftHand?.path);

  return {
    front: frontTexture
      ? { texture: frontTexture, coordinates: textures.front?.coordinates }
      : undefined,
    back: backTexture
      ? { texture: backTexture, coordinates: textures.back?.coordinates }
      : undefined,
    rightHand: rightHandTexture
      ? {
          texture: rightHandTexture,
          coordinates: textures.rightHand?.coordinates,
        }
      : undefined,
    leftHand: leftHandTexture
      ? {
          texture: leftHandTexture,
          coordinates: textures.leftHand?.coordinates,
        }
      : undefined,
  };
};

export default loadShirtModel;
export { loadModel, loadTextures, loadAllTextures };
