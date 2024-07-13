import React, { useEffect } from 'react';
import { colors } from '../../config/constants/Colors.constant';
import { ColorContentProps } from '../../interfaces/TabContent.interface';
import '../../styles/Colors.css';

const Colors: React.FC<ColorContentProps> = ({
  model,
  textureManager,
  colorObj,
  setTabsState,
}) => {
  const handleColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { id } = event.target;
    setTabsState((prevState) => ({
      ...prevState,
      colors: {
        ...prevState.colors,
        chosen: {
          ...prevState.colors.chosen,
          [prevState.colors.chosenType]: id,
        },
      },
    }));
  };

  const toggleColorType = (type: 'main' | 'design'): void => {
    setTabsState((prevState) => ({
      ...prevState,
      colors: {
        ...prevState.colors,
        chosenType: type,
        isAppear: !prevState.colors.isAppear,
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
      <div className='color-container'>
        <div className='div-color' onClick={() => toggleColorType('main')}>
          <h4>Main color</h4>
          <div>
            <label className={colorObj.chosen.main}>
              <span className={`${colorObj.chosen.main} color-border`}></span>
            </label>
          </div>
        </div>
        <hr />
        <div className='div-color' onClick={() => toggleColorType('design')}>
          <h4>Design color</h4>
          <div>
            <label className={colorObj.chosen.design}>
              <span className={`${colorObj.chosen.design} color-border`}></span>
            </label>
          </div>
        </div>
        <hr />
        {colorObj.isAppear && (
          <div className='color-list'>
            {colors.map((color) => (
              <div key={color}>
                <input
                  type='radio'
                  id={color}
                  name='color'
                  checked={colorObj.chosen[colorObj.chosenType] === color}
                  onChange={handleColorChange}
                />
                <label htmlFor={color} className={color}>
                  <span className={`${color} color-border`}></span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Colors;
