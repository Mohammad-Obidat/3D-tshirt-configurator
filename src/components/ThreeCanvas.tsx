import React, { useEffect } from 'react';
import SceneInit from '../lib/SceneInit.ts';
import ShirtModel from '../config/ShirtModel.ts';

const ThreeCanvas: React.FC = () => {
  useEffect(() => {
    const initScene = new SceneInit('myThreeJsCanvas');
    initScene.animate();

    ShirtModel().then((tshirtModel) => {
      initScene.setTShirtModel(tshirtModel)
      initScene.scene.add(tshirtModel);
      initScene.autoRotateModel();
    }).catch((error) => {
      console.error('Error adding the t-shirt model to the scene:', error);
    });

    return () => {
      initScene.stopAnimation();
    };
  }, []);

  return <canvas id='myThreeJsCanvas' />;
};

export default ThreeCanvas;
