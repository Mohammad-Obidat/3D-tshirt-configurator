import * as THREE from 'three';
import { LoadedTextures, TextureProps } from '../interfaces/Textures.interface';
import { ColorType } from '../interfaces/TabContent.interface';

export default class TextureManager {
  model: THREE.Object3D | undefined;
  colorsType: Array<ColorType>;
  private designMeshs: THREE.Mesh[] | undefined;
  private selectedColor: string | undefined;

  constructor(tshirtModel: THREE.Object3D) {
    this.model = tshirtModel;
    this.designMeshs = [];
    this.colorsType = ['main'];
  }

  applyNewColorMaterial(selectedColor: string, selectedType: ColorType): void {
    if (selectedType === 'main') {
      this.model?.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.set(selectedColor);
            child.material.needsUpdate = true;
          }
        }
      });
    } else if (
      this.designMeshs!.length > 0 &&
      this.colorsType.includes(selectedType)
    ) {
      this.designMeshs
        ?.filter((mesh) => mesh.userData.colorType === selectedType)
        .forEach((m) => {
          {
            if (m.material instanceof THREE.MeshBasicMaterial) {
              m.material.color.set(selectedColor);
            } else if (Array.isArray(m.material)) {
              m.material.forEach((material) => {
                if (material instanceof THREE.MeshBasicMaterial) {
                  material.color.set(selectedColor);
                }
              });
            }
          }
        });

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

  adjustGeometry(geometry: THREE.BufferGeometry): void {
    const uvAttribute = geometry.attributes.uv;
    const scaleFactorY = -1;

    for (let i = 0; i < uvAttribute.count; i++) {
      uvAttribute.setXY(
        i,
        uvAttribute.getX(i),
        uvAttribute.getY(i) * scaleFactorY
      );
    }
    uvAttribute.needsUpdate = true;
  }

  findMatchMesh(
    child: THREE.Object3D,
    id: number
  ): THREE.Object3D[] | undefined {
    return child.children.filter((c) => c.userData.id === id);
  }

  removeMeshFromChild(child: THREE.Object3D, id: number): void {
    const meshsToRemove = this.findMatchMesh(child, id);
    if (meshsToRemove!.length > 0) {
      meshsToRemove?.forEach((mesh) => {
        child.remove(mesh);
      });
    }
  }

  applyTextures(
    textures: TextureProps[],
    id: number,
    name: string,
    child: THREE.Mesh
  ): void {
    textures.forEach((texture) => {
      const geometry: THREE.BufferGeometry = child.geometry.clone();
      const material: THREE.MeshBasicMaterial = this.createTextureMaterial(
        texture.texture
      );
      this.adjustGeometry(geometry);
      const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
      mesh.userData = { id, name, colorType: texture.colorType };

      if (!this.colorsType.includes(texture.colorType)) {
        this.colorsType.push(texture.colorType);
      }
      this.designMeshs?.push(mesh);
      child.add(mesh);
    });
  }

  switchTexture(textures: LoadedTextures): void {
    if (this.model) {
      this.colorsType = ['main'];
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
}
