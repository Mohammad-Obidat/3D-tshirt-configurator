import * as THREE from 'three';
import {
  LoadedTextures,
  TextureWithCoordinates,
} from '../interfaces/Textures.interface';

export default class TextureManager {
  private model: THREE.Object3D | undefined;
  // private currentTexture: LoadedTextures | undefined;
  private currentMesh: THREE.Mesh | undefined;

  constructor(tshirtModel: THREE.Object3D) {
    this.model = tshirtModel;
    // this.currentTexture = undefined;
    this.currentMesh = undefined;
  }

  createTextureMaterial(
    texture: THREE.Texture | undefined
  ): THREE.MeshBasicMaterial {
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      color: new THREE.Color(0xff0000),
    });
  }

  adjustGeometry(
    geometry: THREE.BufferGeometry,
    scaleFactorX: number,
    scaleFactorY: number
  ): void {
    const uvAttribute = geometry.attributes.uv;

    for (let i = 0; i < uvAttribute.count; i++) {
      uvAttribute.setXY(
        i,
        uvAttribute.getX(i) * scaleFactorX,
        uvAttribute.getY(i) * scaleFactorY
      );
    }
    uvAttribute.needsUpdate = true;
  }

  findMatchMeshs(child: THREE.Object3D): THREE.Object3D | undefined {
    if (child.children.length > 0) {
      return child.children.find(
        (c) => c.userData.id === this.currentMesh?.userData.id
      );
    }
  }

  removeMeshFromChild(child: THREE.Object3D): void {
    const meshToRemove = this.findMatchMeshs(child);
    if (meshToRemove) child.remove(meshToRemove);
  }

  switchTexture(textures: LoadedTextures): void {
    // if (this.currentTexture) {
    //   this.disposeAllTextures(this.currentTexture);
    // }

    // this.currentTexture = textures;

    if (this.model) {
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const geometry: THREE.BufferGeometry = child.geometry.clone();

          if (child.name === 'Cloth_mesh_24' && textures.front) {
            this.removeMeshFromChild(child);

            const frontTexture: TextureWithCoordinates = textures.front;
            const material: THREE.MeshBasicMaterial =
              this.createTextureMaterial(frontTexture.texture);
            this.adjustGeometry(
              geometry,
              frontTexture.coordinates?.x || 2,
              frontTexture.coordinates?.y || -1
            );
            const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { id: 1, name: 'front' };
            this.currentMesh = mesh;

            child.add(mesh);
            console.log('child:', child);
            console.log('mesh:', mesh);
            // child.material = material;
            // child.material.needsUpdate = true;
          }

          if (child.name === 'Cloth_mesh_3' && textures.back) {
            this.removeMeshFromChild(child);

            const backTexture: TextureWithCoordinates = textures.back;
            const material: THREE.MeshBasicMaterial =
              this.createTextureMaterial(backTexture.texture);
            this.adjustGeometry(
              geometry,
              backTexture.coordinates?.x || 2,
              backTexture.coordinates?.y || -1
            );
            const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { id: 2, name: 'back' };
            this.model?.add(mesh);
            // child.material = material;
            // child.material.needsUpdate = true;
          }
        }
      });
    }
  }

  disposeTexture(texture: THREE.Texture | undefined): void {
    if (texture) {
      texture.dispose();
    }
  }

  disposeAllTextures(textures: LoadedTextures | undefined): void {
    if (textures) {
      for (const key in textures) {
        if (textures[key]?.texture) {
          this.disposeTexture(textures[key].texture);
        }
      }
    }
  }
}
