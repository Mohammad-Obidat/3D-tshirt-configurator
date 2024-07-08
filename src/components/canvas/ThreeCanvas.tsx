import React, { useEffect, useState } from 'react';
import { Object3D } from 'three';
import SceneInit from '../../lib/SceneInit.ts';
import loadShirtModel from '../../config/helpers/ThreeLoaders.ts';
import { useGlobalStore } from '../../store/GlobalStore.tsx';
import Loader from '../Loader.tsx';

const ThreeCanvas: React.FC = () => {
  const { isIntro, setTshirt } = useGlobalStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tshirtModel, setTshirtModel] = useState<Object3D | null>(null);

  useEffect(() => {
    setIsLoading(true);
    loadShirtModel()
      .then((tshirtModel) => {
        setTshirtModel(tshirtModel);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error adding the t-shirt model to the scene:', error);
        setIsLoading(false);
      });
  }, [setIsLoading, setTshirt]);

  useEffect(() => {
    if (tshirtModel && !isLoading) {
      const sceneInit = new SceneInit('myThreeJsCanvas');
      sceneInit.setTShirtModel(tshirtModel);
      setTshirt(tshirtModel);
      sceneInit.scene.add(tshirtModel);

      isIntro ? (sceneInit.isAnimate = true) : (sceneInit.isAnimate = false);
      sceneInit.animate();

      return () => {
        sceneInit.stopAnimation();
      };
    }
  }, [tshirtModel, isLoading, isIntro, setTshirt]);

  return <>{isLoading ? <Loader /> : <canvas id='myThreeJsCanvas' />}</>;
};

export default ThreeCanvas;
