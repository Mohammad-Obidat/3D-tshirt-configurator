import React, { useEffect, useState } from 'react';
import ColorsViewer from '../ColorsViewer';
import { colors } from '../../config/constants/Colors.constant';
import {
  ChosenColorType,
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
  const [chosenColor, setChosenColor] = useState<string>('red');
  const [selectedColors, setSelectedColors] = useState<ChosenColorType>({
    main: 'red',
    element_1: 'red',
    element_2: 'red',
    element_3: 'red',
  });

  const handleColorChange = (color: string): void => {
    const chosenType = colorObj.chosenType;
    setTabsState((prevState) => ({
      ...prevState,
      color: {
        ...prevState.color,
        chosen: {
          ...prevState.color.chosen,
          [chosenType]: color,
        },
      },
    }));

    setSelectedColors((prevState) => ({
      ...prevState,
      [chosenType]: color,
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
        setChosenColor(color);
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
          <div
            className='color-circle'
            style={{ backgroundColor: selectedColors[type] || 'transparent' }}
          ></div>
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
        <ColorsViewer
          colors={colors}
          handleColorChange={handleColorChange}
          chosenColor={chosenColor}
        />
      )}
    </>
  );
};

export default Colors;
