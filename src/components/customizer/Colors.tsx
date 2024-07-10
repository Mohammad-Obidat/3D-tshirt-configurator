import React, { useEffect, useState } from 'react';
import { ColorContent } from '../../interfaces/TabContent.interface';
import '../../styles/Colors.css';

const Colors: React.FC<ColorContent> = ({ model, textureManager, tabs }) => {
  const [selectedColors, setSelectedColors] = useState<{
    [key: string]: string;
  }>({
    main: 'white',
    design: 'red',
  });
  const [selectedType, setSelectedType] = useState<'main' | 'design'>('main');
  const [isAppear, setIsAppear] = useState<boolean>(false);

  const toggleColorType = (type: 'main' | 'design'): void => {
    setIsAppear((prev) => !prev);
    setSelectedType(type);
  };

  const handleColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const { id } = event.target;
    setSelectedColors((prev) => ({
      ...prev,
      [selectedType]: id,
    }));
  };

  useEffect(() => {
    if (model && textureManager) {
      textureManager.applyNewColorMaterial(
        selectedColors[selectedType],
        selectedType
      );
    }
  }, [model, textureManager, selectedColors, selectedType]);

  return (
    <>
      <div className='div-color'>
        <h4>Main color</h4>
        <div onClick={() => toggleColorType('main')}>
          <label className={selectedColors.main}>
            <span className={`${selectedColors.main} color-border`}></span>
          </label>
        </div>
      </div>
      <hr />
      <div className='div-color'>
        <h4>Design color</h4>
        <div onClick={() => toggleColorType('design')}>
          <label className={selectedColors.design}>
            <span className={`${selectedColors.design} color-border`}></span>
          </label>
        </div>
      </div>
      <hr />
      {isAppear && (
        <div className='color-container'>
          {tabs.map((color) => (
            <div key={color}>
              <input
                type='radio'
                id={color}
                name='color'
                checked={selectedColors[selectedType] === color}
                onChange={handleColorChange}
              />
              <label htmlFor={color} className={color}>
                <span className={`${color} color-border`}></span>
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Colors;
