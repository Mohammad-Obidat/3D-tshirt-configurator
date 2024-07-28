import React, { useState, useEffect } from 'react';
import '../styles/ColorsViewer.css';

interface ColorsViewerProps {
  colors: Array<string>;
  chosenColor: string;
  handleColorChange: (color: string) => void;
  selectedColors: Record<string, string>;
}

const ColorsViewer: React.FC<ColorsViewerProps> = ({
  colors,
  chosenColor,
  handleColorChange,
  selectedColors,
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    chosenColor
  );

  useEffect(() => {
    setSelectedColor(chosenColor);
  }, [chosenColor]);

  const handleColorClick = (color: string) => {
    handleColorChange(color);
    setSelectedColor(color);
  };

  return (
    <div className='color-grid'>
      {colors.map((color, index) => (
        <div
          key={index}
          className={`color-item-border ${
            selectedColors.main === color ||
            selectedColors.element_1 === color ||
            selectedColors.element_2 === color ||
            selectedColors.element_3 === color
              ? 'bordered'
              : ''
          }`}
        >
          <div
            className='color-item'
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          >
            {selectedColor === color && <span className='checkmark'>✔</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorsViewer;
