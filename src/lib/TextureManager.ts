import * as THREE from 'three';
import { LoadedTextures, TextureProps } from '../interfaces/Textures.interface';

export default class TextureManager {
  model: THREE.Object3D | undefined;
  // private currentTexture: LoadedTextures | undefined;
  private currentMesh: THREE.Mesh | undefined;
  private selectedColor: string | undefined;

  constructor(tshirtModel: THREE.Object3D) {
    this.model = tshirtModel;
    // this.currentTexture = undefined;
    // this.currentMesh = undefined;
  }

  applyNewColorMaterial(selectedColor: string, selectedType: string): void {
    if (selectedType === 'main') {
      this.model?.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.set(selectedColor);
            child.material.needsUpdate = true;
          }
        }
      });
      // this.selectedColor = selectedColor;
    } else if (this.currentMesh && selectedType === 'design') {
      if (this.currentMesh.material instanceof THREE.MeshBasicMaterial) {
        this.currentMesh.material.color.set(selectedColor);
      } else if (Array.isArray(this.currentMesh.material)) {
        this.currentMesh.material.forEach((material) => {
          if (material instanceof THREE.MeshBasicMaterial) {
            material.color.set(selectedColor);
          }
        });
      }
      this.selectedColor = selectedColor;
    }
  }

  createTextureMaterial(
    texture: THREE.Texture | undefined
  ): THREE.MeshBasicMaterial {
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      color: new THREE.Color(this.selectedColor),
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

  findMatchMesh(child: THREE.Object3D, id: number): THREE.Object3D | undefined {
    return child.children.find((c) => c.userData.id === id);
  }

  removeMeshFromChild(child: THREE.Object3D, id: number): void {
    const meshToRemove = this.findMatchMesh(child, id);
    if (meshToRemove) {
      child.remove(meshToRemove);
    }
  }

  applyTextures(
    textures: TextureProps[],
    id: number,
    name: string,
    child: THREE.Mesh
  ): void {
    textures.forEach((texture, index) => {
      const geometry: THREE.BufferGeometry = child.geometry.clone();
      const material: THREE.MeshBasicMaterial = this.createTextureMaterial(
        texture.texture
      );
      const scaleFactorX = 1;
      const scaleFactorY = -1;
      this.adjustGeometry(geometry, scaleFactorX, scaleFactorY);
      const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
      mesh.userData = { id, name, textureIndex: index };
      this.currentMesh = mesh;
      child.add(mesh);
    });
  }

  switchTexture(textures: LoadedTextures): void {
    if (this.model) {
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.name === 'Cloth_mesh_24' && textures.front) {
            this.removeMeshFromChild(child, 1);
            this.applyTextures(textures.front, 1, 'front', child);
          } else if (child.name === 'Cloth_mesh_3' && textures.back) {
            this.removeMeshFromChild(child, 2);
            this.applyTextures(textures.back, 2, 'back', child);
          } else if (child.name === 'Cloth_mesh_9' && textures.rightHand) {
            this.removeMeshFromChild(child, 3);
            this.applyTextures(textures.rightHand, 3, 'rightHand', child);
          } else if (child.name === 'Cloth_mesh_15' && textures.leftHand) {
            this.removeMeshFromChild(child, 4);
            this.applyTextures(textures.leftHand, 4, 'leftHand', child);
          }
        }
      });
    }
  }

  // disposeTexture(texture: THREE.Texture | undefined): void {
  //   if (texture) {
  //     texture.dispose();
  //   }
  // }

  // disposeAllTextures(textures: LoadedTextures | undefined): void {
  //   if (textures) {
  //     for (const key in textures) {
  //       if (textures[key]?.texture) {
  //         this.disposeTexture(textures[key].texture);
  //       }
  //     }
  //   }
  // }
}
