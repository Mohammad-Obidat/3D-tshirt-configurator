import React, { useEffect, useRef } from 'react';
import SceneInit from '../../lib/SceneInit.ts';
import { ThreeCanvasProps } from '../../interfaces/App.interface.ts';
import Loader from '../Loader.tsx';
import '../../styles/ThreeCanvas.css';

const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  model,
  isLoading,
  isIntro,
}) => {
  const canvasRef = useRef<SceneInit | null>(null);

  useEffect(() => {
    if (model && !canvasRef.current) {
      canvasRef.current = new SceneInit();
    }

    if (model && canvasRef.current) {
      canvasRef.current.setTShirtModel(model);
      canvasRef.current.scene.add(model);
      canvasRef.current.isAnimate = isIntro === 'home' ? true : false;

      canvasRef.current.animate();
      return () => {
        canvasRef.current?.stopAnimation();
      };
    }
  }, [model, isIntro]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='canvas-container'>
            <canvas id='myThreeJsCanvas' />
          </div>
        </>
      )}
    </>
  );
};

export default ThreeCanvas;
