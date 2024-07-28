import React, { useEffect, useState } from 'react';
import ColorsViewer from '../ColorsViewer';
import { colors } from '../../config/constants/Colors.constant';
import {
  ColorContentProps,
  ColorType,
} from '../../interfaces/TabContent.interface';
import '../../styles/Colors.css';

const Colors: React.FC<ColorContentProps> = ({
  model,
  textureManager,
  colorObj,
  setTabsState,
}) => {
  const [showColors, setShowColors] = useState<boolean>(false);

  const handleColorChange = (color: string): void => {
    setTabsState((prevState) => ({
      ...prevState,
      color: {
        ...prevState.color,
        chosen: {
          ...prevState.color.chosen,
          [prevState.color.chosenType]: color,
        },
      },
    }));
  };

  const toggleColorType = (type: ColorType): void => {
    setTabsState((prevState) => ({
      ...prevState,
      color: {
        ...prevState.color,
        chosenType: type,
        isAppear: !prevState.color.isAppear,
      },
    }));
  };

  const selectColor = (type: ColorType): void => {
    setShowColors(true);
    toggleColorType(type);
  };

  useEffect(() => {
    if (model && textureManager) {
      const color = colorObj.chosen[colorObj.chosenType];
      if (color) {
        textureManager.applyNewColorMaterial(color, colorObj.chosenType);
        setShowColors(false);
      }
    }
  }, [model, textureManager, colorObj.chosen, colorObj.chosenType]);

  return (
    <>
      {textureManager!.colorsType.map((type, i) => (
        <div
          key={i}
          className='color-container'
          onClick={() => selectColor(type)}
        >
          <div className='color-circle'></div>
          <span className='color-text'>
            {type === 'main' ? 'Main' : `element ${i}`} Color
          </span>
          <img
            src='/assets/icons/arrow-right.svg'
            alt='right arrow'
            className='right-arrow'
          />
        </div>
      ))}
      {showColors && (
        <ColorsViewer colors={colors} handleColorChange={handleColorChange} />
      )}
    </>
  );
};

export default Colors;
