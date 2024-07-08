import React from 'react';
import { colors } from '../../config/constants/Colors';
import '../../styles/Colors.css';

const Colors: React.FC = () => {
  const handleColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    const { id } = event.target;
    console.log(id);
  };

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
