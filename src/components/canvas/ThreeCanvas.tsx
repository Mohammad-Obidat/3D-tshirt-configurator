import React, { useEffect, useRef } from 'react';
import SceneInit from '../../lib/SceneInit.ts';
import { ThreeCanvasProps } from '../../interfaces/App.interface.ts';
import { useGlobalStore } from '../../store/GlobalStore.tsx';
import Loader from '../Loader.tsx';

const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ model, isLoading }) => {
  const canvasRef = useRef<SceneInit | null>(null);
  const { isIntro, setTshirt } = useGlobalStore();

  useEffect(() => {
    if (model && !canvasRef.current) {
      canvasRef.current = new SceneInit('myThreeJsCanvas');
    }

    if (model && canvasRef.current) {
      canvasRef.current.setTShirtModel(model);
      setTshirt(model);
      canvasRef.current.scene.add(model);

      canvasRef.current.isAnimate = isIntro;
      canvasRef.current.animate();

      return () => {
        canvasRef.current?.stopAnimation();
      };
    }
  }, [model, isIntro, setTshirt]);

  return <>{isLoading ? <Loader /> : <canvas id='myThreeJsCanvas' />}</>;
};

export default ThreeCanvas;
