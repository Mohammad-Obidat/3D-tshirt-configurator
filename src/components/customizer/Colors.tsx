import React, { useEffect, useState } from 'react';
import { colors } from '../../config/constants/Colors';
import { ColorContent } from '../../interfaces/TabContent.interface';
import '../../styles/Colors.css';

const Colors: React.FC<ColorContent> = ({ tshirt, textureManager }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>('white');

  const handleColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    const { id } = event.target;
    setSelectedColor(id);
  };

  useEffect(() => {
    if (tshirt && textureManager) {
      if (selectedColor) {
        textureManager.applyNewColorMaterial(selectedColor);
      }
    }
  }, [tshirt, textureManager, selectedColor]);

  return (
    <div className='color-container'>
      {colors.map((color) => (
        <div key={color}>
          <input
            type='radio'
            id={color}
            name='color'
            onChange={handleColorChange}
          />
          <label htmlFor={color} className={color}>
            <span className={`${color} color-border`}></span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Colors;
