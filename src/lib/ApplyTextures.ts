import * as THREE from 'three';
import { LoadedTextures } from '../interfaces/Textures.interface';

export default class ApplyTextures {
  private tshirt: THREE.Object3D | undefined;

  constructor(tshirtModel: THREE.Object3D) {
    this.tshirt = tshirtModel;
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

  applyTextureToShirt(textures: LoadedTextures): void {
    if (this.tshirt) {
      this.tshirt.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          for (const key in textures) {
            if (textures[key] !== undefined && key === 'front') {
              if (child.name === 'Cloth_mesh_24') {
                const texture = textures[key].texture;
                const material = this.createTextureMaterial(texture);
                const geometry = child.geometry.clone();
                const scaleFactorX = textures[key].coordinates?.x || 2;
                const scaleFactorY = textures[key].coordinates?.y || -1;

                this.adjustGeometry(geometry, scaleFactorX, scaleFactorY);

                const mesh = new THREE.Mesh(geometry, material);
                child.add(mesh);
              }
            } else if (textures[key] !== undefined && key === 'back') {
              if (child.name === 'Cloth_mesh_3') {
                const texture = textures[key].texture;
                const material = this.createTextureMaterial(texture);
                const geometry = child.geometry.clone();
                const scaleFactorX = textures[key].coordinates?.x || 1;
                const scaleFactorY = textures[key].coordinates?.y || -1;

                this.adjustGeometry(geometry, scaleFactorX, scaleFactorY);

                const mesh = new THREE.Mesh(geometry, material);
                child.add(mesh);
              }
            }
          }
        }
      });
    }
  }
}
