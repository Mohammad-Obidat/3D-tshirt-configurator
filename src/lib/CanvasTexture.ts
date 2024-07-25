import * as THREE from 'three';
import TextureManager from './TextureManager';

interface CanvasTextProps {
  text: string;
  canvasTexture: THREE.CanvasTexture;
}

interface CanvasImageProps {
  imageUrl: string;
  canvasTexture: THREE.CanvasTexture;
}

export default class CanvasTextureManager extends TextureManager {
  private static CANVAS_SIZE = 512;
  private scale: THREE.Vector2;
  private rotation: number;
  private translation: THREE.Vector2;
  private currentTexture: THREE.Texture | undefined;
  private isText: boolean;
  canvasTextTextures: Array<CanvasTextProps>;
  canvasImageTextures: Array<CanvasImageProps>;

  constructor(shirtModel: THREE.Object3D) {
    super(shirtModel);
    this.scale = new THREE.Vector2(1, 1);
    this.rotation = 0;
    this.translation = new THREE.Vector2(0, 0);
    this.canvasTextTextures = [];
    this.canvasImageTextures = [];
    this.isText = true;

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

    if (!context) {throw new Error('Failed to create canvas context');}

    canvas.width = CanvasTextureManager.CANVAS_SIZE;
    canvas.height = CanvasTextureManager.CANVAS_SIZE;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawContent(context, canvas.width, canvas.height);

    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.anisotropy = 16;
    canvasTexture.needsUpdate = true;

    if (this.isText) {
      this.canvasTextTextures.push({ text: context.canvas.id, canvasTexture });
    } else {
      this.canvasImageTextures.push({
        imageUrl: context.canvas.id,
        canvasTexture,
      });
    }
    return canvasTexture;
  }

  async createTextCanvasTexture(
    controlTab: string,
    userText?: string
  ): Promise<void> {
    await this.createAndApplyCanvasTexture(
      controlTab,
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

  async createImageCanvasTexture(
    controlTab: string,
    imageUrl?: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl!;
      img.onload = async () => {
        await this.createAndApplyCanvasTexture(
          controlTab,
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

  async applyTextInput(controlTab: string, textInput: string): Promise<void> {
    this.isText = true;
    await this.createTextCanvasTexture(controlTab, textInput);
  }

  async applyImageInput(controlTab: string, imageUrl?: string): Promise<void> {
    this.isText = false;
    await this.createImageCanvasTexture(controlTab, imageUrl);
  }

  private async createAndApplyCanvasTexture(
    controlTab: string,
    drawFunction: (
      context: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number
    ) => void
  ): Promise<void> {
    const canvasTexture = await this.createCanvasTexture(drawFunction);

    const meshMapping: { [key: string]: string } = {
      front: 'Cloth_mesh_24',
      back: 'Cloth_mesh_3',
      right: 'Cloth_mesh_9',
      left: 'Cloth_mesh_15',
    };

    const targetMeshName = meshMapping[controlTab] || 'Cloth_mesh_24';
    this.applyCanvasTextureToMesh(this.model!, canvasTexture, targetMeshName);
  }

  applyCanvasTextureToMesh(
    model: THREE.Object3D,
    canvasTexture: THREE.Texture,
    targetMeshName: string
  ): void {
    const scaleFactorMapping: { [key: string]: [number, number] } = {
      Cloth_mesh_24: [2, -1],
      Cloth_mesh_3: [0.65, -1],
      Cloth_mesh_9: [1, -0.75],
      Cloth_mesh_15: [1, -0.75],
    };

    const repeatMapping: {
      [key: string]: { repeat: [number, number]; center: [number, number] };
    } = {
      Cloth_mesh_9: { repeat: [5, 3], center: [-0.09, 0.35] },
      Cloth_mesh_15: { repeat: [5, 3], center: [-0.13, 0.35] },
    };

    const scaleFactor = scaleFactorMapping[targetMeshName] || [2, -1];
    const repeatSettings = repeatMapping[targetMeshName];

    const wrapMode = repeatSettings
      ? THREE.RepeatWrapping
      : THREE.ClampToEdgeWrapping;
    canvasTexture.wrapT = canvasTexture.wrapS = wrapMode;

    if (repeatSettings) {
      canvasTexture.repeat.set(...repeatSettings.repeat);
      canvasTexture.center.set(...repeatSettings.center);
    }

    model.traverse((child) => {
      if (child instanceof THREE.Mesh && child.name === targetMeshName) {
        const material = this.createTextureMaterial(canvasTexture);
        const geometry = child.geometry.clone();
        this.adjustGeometry(geometry, scaleFactor[0], scaleFactor[1]);

        const mesh = new THREE.Mesh(geometry, material);
        this.currentTexture = canvasTexture;
        child.add(mesh);
      }
    });
  }
}
