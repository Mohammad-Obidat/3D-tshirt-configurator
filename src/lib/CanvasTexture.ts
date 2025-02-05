import * as THREE from 'three';
import TextureManager from './TextureManager';
import { PART_COORDINATES } from '../config/constants/TargetTabs.constant';
import {
  CanvasImageProps,
  CanvasTextProps,
  TargetChild,
  UserImageInput,
  UserTextInput,
} from '../interfaces/CanvasTexture.interface';

export default class CanvasTextureManager extends TextureManager {
  private static CANVAS_SIZE = 2048;
  private scale: THREE.Vector2;
  private rotation: number;
  private translation: THREE.Vector2;
  private meshMapping: { [key: string]: string };
  private currentChild: TargetChild | undefined;
  private currentInputMesh: THREE.Mesh | undefined;
  private currentTexture: THREE.Texture | undefined;
  private meshId: number;
  private canvasTextureId: string;
  private isText: boolean;
  targetTab: string;
  canvasTextTextures: UserTextInput;
  canvasImageTextures: UserImageInput;

  constructor(shirtModel: THREE.Object3D) {
    super(shirtModel);
    this.scale = new THREE.Vector2(1, 1);
    this.rotation = 0;
    this.translation = new THREE.Vector2(0, 0);
    this.targetTab = 'front';
    this.canvasTextureId = 'CanvasTexture_';
    this.meshId = 1;
    this.isText = true;
    this.currentChild = {
      front: new THREE.Mesh(),
      back: new THREE.Mesh(),
      rightSleeve: new THREE.Mesh(),
      leftSleeve: new THREE.Mesh(),
    };
    this.meshMapping = {
      front: 'Cloth_mesh_24',
      back: 'Cloth_mesh_3',
      rightSleeve: 'Cloth_mesh_9',
      leftSleeve: 'Cloth_mesh_15',
    };
    this.canvasTextTextures = {
      front: [],
      back: [],
      rightSleeve: [],
      leftSleeve: [],
    };
    this.canvasImageTextures = {
      front: [],
      back: [],
      rightSleeve: [],
      leftSleeve: [],
    };

    this.addKeyListeners();
  }

  private addKeyListeners(): void {
    window.addEventListener('keydown', (event) => this.handleKeyDown(event));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const step = 0.01;
    const angleStep = Math.PI / 18; // 10 degrees

    switch (event.key) {
      case 'ArrowUp':
        this.translation.y += step;
        break;
      case 'ArrowDown':
        this.translation.y -= step;
        break;
      case 'ArrowLeft':
        this.translation.x -= step;
        break;
      case 'ArrowRight':
        this.translation.x += step;
        break;
      case 'w':
        this.scale.y += step;
        break;
      case 's':
        this.scale.y -= step;
        break;
      case 'd':
        this.scale.x += step;
        break;
      case 'a':
        this.scale.x -= step;
        break;
      case 'r':
        this.rotation += angleStep;
        break;
      case 'R':
        this.rotation -= angleStep;
        break;
      default:
        return; // Exit if the key is not handled
    }

    this.updateUVTransform(this.currentTexture);
  }

  private updateUVTransform(texture: THREE.Texture | undefined): void {
    // Apply the transformation to the UV coordinates
    const uvTransform = new THREE.Matrix3();

    uvTransform
      .identity()
      .translate(-0.5, -0.5)
      .scale(this.scale.x, this.scale.y)
      .rotate(this.rotation)
      .translate(this.translation.x, this.translation.y)
      .translate(0.5, 0.5);

    if (texture) {
      texture.matrix = uvTransform;
      texture.matrixAutoUpdate = false;
      texture.needsUpdate = true;
    }
  }

  private async createCanvasTexture(
    drawContent: (
      context: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number
    ) => void
  ): Promise<THREE.CanvasTexture> {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Failed to create canvas context');
    }

    const part = PART_COORDINATES[this.targetTab];
    canvas.width = CanvasTextureManager.CANVAS_SIZE;
    canvas.height = CanvasTextureManager.CANVAS_SIZE;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Clip and translate to the specific part's area
    context.save();
    context.beginPath();
    context.rect(part.x, part.y, part.width, part.height);
    context.clip();
    context.translate(part.x, part.y);

    // Draw the content within the specified area
    drawContent(context, part.width, part.height);

    context.restore();

    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.anisotropy = 16;
    canvasTexture.needsUpdate = true;

    return canvasTexture;
  }

  async createTextCanvasTexture(userText?: string): Promise<void> {
    await this.createAndApplyCanvasTexture(
      (context, canvasWidth, canvasHeight) => {
        context.fillStyle = 'white';
        context.font = 'bold 48px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(userText!, canvasWidth / 2, canvasHeight / 2);
        context.canvas.id = userText!;
      }
    );
  }

  async createImageCanvasTexture(imageUrl?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl!;
      img.onload = async () => {
        await this.createAndApplyCanvasTexture(
          (context, canvasWidth, canvasHeight) => {
            context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
            context.canvas.id = imageUrl!;
          }
        );
        resolve();
      };
      img.onerror = reject;
    });
  }

  async applyTextInput(targetTab: string, textInput: string): Promise<void> {
    this.isText = true;
    this.targetTab = targetTab;
    await this.createTextCanvasTexture(textInput);
  }

  async applyImageInput(targetTab: string, imageUrl?: string): Promise<void> {
    this.isText = false;
    this.targetTab = targetTab;
    await this.createImageCanvasTexture(imageUrl);
  }

  private async createAndApplyCanvasTexture(
    drawFunction: (
      context: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number
    ) => void
  ): Promise<void> {
    const canvasTexture = await this.createCanvasTexture(drawFunction);

    const targetMeshName = this.meshMapping[this.targetTab] || 'Cloth_mesh_24';
    this.applyCanvasTextureToMesh(this.model!, canvasTexture, targetMeshName);
  }

  applyCanvasTextureToMesh(
    model: THREE.Object3D,
    canvasTexture: THREE.Texture,
    targetMeshName: string
  ): void {
    canvasTexture.wrapT = canvasTexture.wrapS = THREE.ClampToEdgeWrapping;

    model.traverse((child) => {
      if (child instanceof THREE.Mesh && child.name === targetMeshName) {
        this.currentChild![this.targetTab] = child;

        const material = this.createTextureMaterial(canvasTexture);
        const geometry = child.geometry.clone();

        this.adjustGeometry(geometry);

        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData.id = `${this.canvasTextureId}${this.meshId}`;
        this.currentInputMesh = mesh;

        this.currentTexture = canvasTexture;

        this.meshId++;
        child.add(mesh);
      }
    });

    if (this.isText) {
      if (targetMeshName === this.meshMapping[this.targetTab]) {
        this.canvasTextTextures[this.targetTab].push({
          text: canvasTexture.source.data.id,
          mesh: this.currentInputMesh!,
          canvasTexture,
        });
      }
    } else {
      if (targetMeshName === this.meshMapping[this.targetTab]) {
        this.canvasImageTextures[this.targetTab].push({
          imageUrl: canvasTexture.source.data.id,
          mesh: this.currentInputMesh!,
          canvasTexture,
        });
      }
    }
  }

  private deleteMeshFromArray(
    array: Array<CanvasTextProps | CanvasImageProps>,
    mesh: THREE.Mesh
  ): void {
    const index = array.findIndex((item) => item.mesh === mesh);
    if (index !== -1) {
      const item = array[index];
      this.currentChild![this.targetTab].remove(item.mesh);
      array.splice(index, 1);
    }
  }

  deleteCanvasTextMesh(mesh: THREE.Mesh): void {
    const targetArray = this.canvasTextTextures[this.targetTab];
    this.deleteMeshFromArray(targetArray, mesh);
  }

  deleteCanvasImageMesh(mesh: THREE.Mesh): void {
    const targetArray = this.canvasImageTextures[this.targetTab];
    this.deleteMeshFromArray(targetArray, mesh);
  }

  removeMeshFromChild(mesh: THREE.Mesh): void {
    super.removeMeshFromChild(
      this.currentChild![this.targetTab],
      mesh.userData.id
    );

    if (this.isText) {
      this.deleteCanvasTextMesh(mesh);
    } else {
      this.deleteCanvasImageMesh(mesh);
    }
  }
}
