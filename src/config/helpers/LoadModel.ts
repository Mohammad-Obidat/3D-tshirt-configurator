import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loadModel = (
  path: string,
  onProgress: (progress: number) => void,
  onLoad: () => void,
  onError: () => void
): Promise<THREE.Object3D> => {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltf: GLTF) => {
        onLoad();
        resolve(gltf.scene);
      },
      (xhr) => {
        const progressValue = (xhr.loaded / xhr.total) * 100;
        onProgress(progressValue);
      },
      (error: unknown) => {
        if (error instanceof ErrorEvent) {
          console.error('Error loading GLTF model:', error);
          onError();
          reject(error);
        }
      }
    );
  });
};

const ShirtModel = (
  onProgress: (progress: number) => void,
  onLoad: () => void,
  onError: () => void
): Promise<THREE.Object3D> => {
  const tshirtModelPath = '/assets/models/HighNeckTshirt.glb';
  return loadModel(tshirtModelPath, onProgress, onLoad, onError);
};

export default ShirtModel;
export { loadModel };
