import * as THREE from 'three';
import TextureManager from './TextureManager';

export default class CanvasTextureManager extends TextureManager {
  constructor(shirtModel: THREE.Object3D) {
    super(shirtModel);
  }

  applyTextInput(controlTab: string, textInput: string): void {
    this.createTextCanvasTexture(controlTab, textInput);
  }

  createTextCanvasTexture(controlTab: string, userText?: string): void {
    const textCanvasTexture = this.createCanvasTexture(
      (context, canvasWidth, canvasHeight) => {
        context.fillStyle = 'white';
        context.font = 'bold 48px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(userText!, canvasWidth / 2, canvasHeight / 2);
      }
    );

    const meshMapping: { [key: string]: string } = {
      front: 'Cloth_mesh_24',
      back: 'Cloth_mesh_3',
      right: 'Cloth_mesh_9',
      left: 'Cloth_mesh_15',
    };

    const targetMeshName = meshMapping[controlTab] || 'Cloth_mesh_24';
    this.applyCanvasTextureToMesh(
      this.model!,
      textCanvasTexture,
      targetMeshName
    );
  }

  createCanvasTexture(
    drawContent: (
      context: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number
    ) => void
  ): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const canvasWidth = 512;
    const canvasHeight = 512;

    if (context) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      drawContent(context, canvasWidth, canvasHeight);

      const canvasTexture = new THREE.CanvasTexture(canvas);
      canvasTexture.anisotropy = 16;
      canvasTexture.needsUpdate = true;

      return canvasTexture;
    }
    throw new Error('Failed to create canvas context');
  }

  applyCanvasTextureToMesh(
    model: THREE.Object3D,
    canvasTexture: THREE.Texture,
    targetMeshName: string
  ): void {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh && child.name === targetMeshName) {
        canvasTexture.wrapT = canvasTexture.wrapS = THREE.ClampToEdgeWrapping;

        const material = this.createTextureMaterial(canvasTexture);
        const geometry = child.geometry.clone();

        if (targetMeshName === 'Cloth_mesh_24') {
          const scaleFactorX = 2;
          const scaleFactorY = -1;
          this.adjustGeometry(geometry, scaleFactorX, scaleFactorY);
        } else if (targetMeshName === 'Cloth_mesh_3') {
          const scaleFactorX = 0.65;
          const scaleFactorY = -1;
          this.adjustGeometry(geometry, scaleFactorX, scaleFactorY);
        } else if (targetMeshName === 'Cloth_mesh_9') {
          //   const material = new THREE.MeshBasicMaterial({
          //     map: canvasTexture,
          //     transparent: true,
          //     color: new THREE.Color(0xff0000),
          //   });
          //   const scaleFactorX = 1;
          //   const scaleFactorY = -1;
          //   this.adjustGeometry(geometry, scaleFactorX, scaleFactorY);
        }
        const mesh = new THREE.Mesh(geometry, material);
        console.log(mesh);
        child.add(mesh);
      }
    });
  }
}
