import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loadModel = (path: string): Promise<THREE.Object3D> => {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltf: GLTF) => {
        resolve(gltf.scene);
      },
      (xhr) => {
        console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
      },
      (error: unknown) => {
        if (error instanceof ErrorEvent) {
          console.error('Error loading GLTF model:', error);
          reject(error);
        }
      }
    );
  });
};

const ShirtModel = (): Promise<THREE.Object3D> => {
  const tshirtModelPath = '/assets/models/HighNeckTshirt.glb';
  return loadModel(tshirtModelPath);
};

export default ShirtModel;
export { loadModel };
