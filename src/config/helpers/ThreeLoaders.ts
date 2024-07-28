import { Object3D, Texture, TextureLoader } from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  LoadedTextures,
  Textures,
  TextureObject,
  TextureProps,
} from '../../interfaces/Textures.interface';

const loadModel = (path: string): Promise<Object3D> => {
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

const loadShirtModel = (): Promise<Object3D> => {
  const tshirtModelPath = '/assets/models/HighNeckTshirt.glb';
  return loadModel(tshirtModelPath);
};

const loadTexture = (texturePath: string): Promise<Texture | undefined> => {
  const loader = new TextureLoader();

  return new Promise<Texture | undefined>((resolve, reject) => {
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

const loadTextureArray = async (
  textures?: TextureObject[]
): Promise<TextureProps[] | undefined> => {
  if (!textures) return undefined;

  const promises = textures.map(async (textureObj) => {
    if (textureObj.path) {
      try {
        const texture = await loadTexture(textureObj.path);
        if (texture) {
          return { texture };
        }
      } catch (error) {
        console.error('Error loading texture.', error);
      }
    }
    return undefined;
  });

  const results = await Promise.all(promises);
  return results.filter(
    (result): result is TextureProps => result !== undefined
  );
};

const loadAllTextures = async (textures: Textures): Promise<LoadedTextures> => {
  if (!textures) {
    console.error('Textures are undefined');
    return {};
  }

  const frontTextures = await loadTextureArray(textures.front);
  const backTextures = await loadTextureArray(textures.back);
  const rightHandTextures = await loadTextureArray(textures.rightHand);
  const leftHandTextures = await loadTextureArray(textures.leftHand);

  return {
    front: frontTextures,
    back: backTextures,
    rightHand: rightHandTextures,
    leftHand: leftHandTextures,
  };
};

export default loadShirtModel;
export { loadModel, loadTexture, loadAllTextures };
