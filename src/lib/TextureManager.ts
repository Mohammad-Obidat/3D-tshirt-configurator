import * as THREE from 'three';
import {
  LoadedTextures,
  TextureWithCoordinates,
} from '../interfaces/Textures.interface';

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

  findMatchMeshs(
    child: THREE.Object3D,
    mesh: THREE.Mesh
  ): THREE.Object3D | undefined {
    if (child.children.length > 0) {
      return child.children.find((c) => c.userData.id === mesh.userData.id);
    }
  }

  removeMeshFromChild(child: THREE.Object3D, mesh: THREE.Mesh): void {
    const meshToRemove = this.findMatchMeshs(child, mesh);
    if (meshToRemove) {
      child.remove(meshToRemove);
    }
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
          this.removeMeshFromChild(child, this.currentMesh!);

          const applyTexture = (
            texture: TextureWithCoordinates,
            id: number,
            name: string
          ) => {
            const material: THREE.MeshBasicMaterial =
              this.createTextureMaterial(texture.texture);
            this.adjustGeometry(
              geometry,
              texture.coordinates?.x || 2,
              texture.coordinates?.y || -1
            );
            const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { id, name };
            this.currentMesh = mesh;
            child.add(mesh);
          };

          if (child.name === 'Cloth_mesh_24' && textures.front) {
            applyTexture(textures.front, 1, 'front');
          } else if (child.name === 'Cloth_mesh_3' && textures.back) {
            applyTexture(textures.back, 2, 'back');
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
