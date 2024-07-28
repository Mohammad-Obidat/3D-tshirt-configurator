import React, { useEffect, useState } from 'react';
import { colors } from '../../config/constants/Colors.constant';
import { ColorContentProps } from '../../interfaces/TabContent.interface';
import '../../styles/Colors.css';
import ColorsViewer from '../ColorsViewer';

const Colors: React.FC<ColorContentProps> = ({
  model,
  textureManager,
  colorObj,
  setTabsState,
}) => {
  const [showColors, setShowColors] = useState<boolean>(false);

  const handleColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { id } = event.target;
    setTabsState((prevState) => ({
      ...prevState,
      color: {
        ...prevState.color,
        chosen: {
          ...prevState.color.chosen,
          [prevState.color.chosenType]: id,
        },
      },
    }));
  };

  const toggleColorType = (type: 'main' | 'design'): void => {
    setTabsState((prevState) => ({
      ...prevState,
      color: {
        ...prevState.color,
        chosenType: type,
        isAppear: !prevState.color.isAppear,
      },
    }));
  };

  useEffect(() => {
    if (model && textureManager) {
      const color = colorObj.chosen[colorObj.chosenType];
      if (color) {
        textureManager.applyNewColorMaterial(color, colorObj.chosenType);
      }
    }
  }, [model, textureManager, colorObj.chosen, colorObj.chosenType]);

  return (
    <>
      <div className='color-container' onClick={() => setShowColors(true)}>
        <div className='color-circle'></div>
        <span className='color-text'>Color 1</span>
        <img
          src='/assets/icons/arrow-right.svg'
          alt='right arrow'
          className='right-arrow'
        />
      </div>
      {showColors && <ColorsViewer colors={colors} />}
    </>
  );
};

export default Colors;
