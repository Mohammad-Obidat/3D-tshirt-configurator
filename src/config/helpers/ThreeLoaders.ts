import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Textures } from '../../interfaces/textures.interface';

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

const loadTextures = (texturePaths: string[]): Promise<THREE.Texture[]> => {
  const loader = new THREE.TextureLoader();
  const promises = texturePaths.map(
    (path) =>
      new Promise<THREE.Texture>((resolve, reject) => {
        loader.load(
          path,
          (texture) => resolve(texture),
          undefined,
          (err) => {
            console.error('Error loading texture.', err);
            reject(err);
          }
        );
      })
  );
  return Promise.all(promises);
};

const loadAllTextures = async (
  textures: Textures
): Promise<{ [key: string]: THREE.Texture[] | THREE.Texture }> => {
  const frontTextures = await loadTextures(textures.front.map((t) => t.path));
  const backTextures = await loadTextures(textures.back.map((t) => t.path));
  const rightHandTexture = await loadTextures([textures.rightHand.path]);
  const leftHandTexture = await loadTextures([textures.leftHand.path]);

  return {
    front: frontTextures,
    back: backTextures,
    rightHand: rightHandTexture[0],
    leftHand: leftHandTexture[0],
  };
};

export default loadShirtModel;
export { loadModel, loadTextures, loadAllTextures };
