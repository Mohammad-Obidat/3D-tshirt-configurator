import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class SceneInit {
  scene: THREE.Scene;
  tShirtModel: THREE.Object3D | null = null;
  isAnimate: boolean = true;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private fov: number = 7;
  private near: number = 0.1;
  private far: number = 1000;
  private controls: OrbitControls;
  private directionalLight: THREE.DirectionalLight;
  private animationFrameId: number | null = null;
  private CanvasContainer: HTMLDivElement | null;
  private canvasId: HTMLCanvasElement | null;

  constructor() {
    this.CanvasContainer = document.querySelector('div.canvas-container');
    this.canvasId = document.querySelector('canvas#myThreeJsCanvas');

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f7fa);

    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.CanvasContainer!.clientWidth / this.CanvasContainer!.clientHeight,
      this.near,
      this.far
    );
    this.camera.position.z = 10;

    const canvas = this.canvasId!;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    this.renderer.setSize(
      this.CanvasContainer!.clientWidth,
      this.CanvasContainer!.clientHeight
    );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.zoomToCursor = true;
    this.controls.minPolarAngle = 1;
    this.controls.maxPolarAngle = 2;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 10;
    this.controls.mouseButtons.RIGHT = null;

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(5, 10, 10);
    this.directionalLight.intensity = 10;
    this.directionalLight.castShadow = true;
    this.camera.add(this.directionalLight);

    this.scene.add(this.camera);

    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    this.animate = this.animate.bind(this);
    // this.autoRotateModel = this.autoRotateModel.bind(this);
  }

  animate(): void {
    this.animationFrameId = window.requestAnimationFrame(this.animate);
    this.render();
    this.controls.update();

    if (this.isAnimate) {
      this.camera.fov = 7;
      this.autoRotateModel();
    } else {
      this.tShirtModel!.rotation.y = 0;
      this.camera.fov = 5;
    }

    this.camera.updateProjectionMatrix();
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize(): void {
    (this.camera.aspect =
      this.CanvasContainer!.clientWidth / this.CanvasContainer!.clientHeight),
      this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.CanvasContainer!.clientWidth,
      this.CanvasContainer!.clientHeight
    );
  }

  stopAnimation(): void {
    if (this.animationFrameId !== null) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  setTShirtModel(model: THREE.Object3D): void {
    this.tShirtModel = model;
    this.tShirtModel.position.y = -1.35;
  }

  autoRotateModel(): void {
    if (this.tShirtModel) {
      this.tShirtModel.rotation.y += 0.025;
    }
  }
}
