import React, { useEffect, useState } from 'react';
import { Object3D } from 'three';
import SceneInit from '../../lib/SceneInit.ts';
import ShirtModel from '../../config/helpers/LoadModel.ts';
import { useGlobalStore } from '../../store/GlobalStore.tsx';
import Loader from '../Loader.tsx';

const ThreeCanvas: React.FC = () => {
  const { isLoading, setIsLoading, setProgress, isIntro } = useGlobalStore();
  const [tshirtModel, setTshirtModel] = useState<Object3D | null>(null);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    const handleError = () => setIsLoading(false);

    setIsLoading(true);
    ShirtModel(setProgress, handleLoad, handleError)
      .then((tshirtModel) => {
        setTshirtModel(tshirtModel);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error adding the t-shirt model to the scene:', error);
        setIsLoading(false);
      });
  }, [setIsLoading, setProgress]);

  useEffect(() => {
    if (tshirtModel && !isLoading) {
      const sceneInit = new SceneInit('myThreeJsCanvas');
      sceneInit.setTShirtModel(tshirtModel);
      sceneInit.scene.add(tshirtModel);

      isIntro ? (sceneInit.isAnimate = true) : (sceneInit.isAnimate = false);
      sceneInit.animate();

      return () => {
        sceneInit.stopAnimation();
      };
    }
  }, [tshirtModel, isLoading, isIntro]);

  return <>{isLoading ? <Loader /> : <canvas id='myThreeJsCanvas' />}</>;
};

export default ThreeCanvas;
