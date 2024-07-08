import React, { useEffect, useRef, useState } from 'react';
import { Object3D } from 'three';
import SceneInit from '../../lib/SceneInit.ts';
import loadShirtModel from '../../config/helpers/ThreeLoaders.ts';
import { useGlobalStore } from '../../store/GlobalStore.tsx';
import Loader from '../Loader.tsx';

const ThreeCanvas: React.FC = () => {
  const canvasRef = useRef<SceneInit | null>(null);
  const { isIntro, setTshirt } = useGlobalStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tshirtModel, setTshirtModel] = useState<Object3D | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsLoading(true);
        const model = await loadShirtModel();
        setTshirtModel(model);
      } catch (error) {
        console.error('Error adding the t-shirt model to the scene:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    if (tshirtModel && !canvasRef.current) {
      canvasRef.current = new SceneInit('myThreeJsCanvas');
    }

    if (tshirtModel && canvasRef.current) {
      canvasRef.current.setTShirtModel(tshirtModel);
      setTshirt(tshirtModel);
      canvasRef.current.scene.add(tshirtModel);

      canvasRef.current.isAnimate = isIntro;
      canvasRef.current.animate();

      return () => {
        canvasRef.current?.stopAnimation();
      };
    }
  }, [tshirtModel, isIntro, setTshirt]);

  return <>{isLoading ? <Loader /> : <canvas id='myThreeJsCanvas' />}</>;
};

export default ThreeCanvas;
