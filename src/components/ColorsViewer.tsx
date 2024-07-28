import React, { useState } from 'react';
import '../styles/ColorsViewer.css';

interface ColorsViewerProps {
  colors: Array<string>;
  chosenColor: string;
  handleColorChange: (color: string) => void;
}

const ColorsViewer: React.FC<ColorsViewerProps> = ({
  colors,
  chosenColor,
  handleColorChange,
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    chosenColor
  );

  const handleColorClick = (color: string) => {
    handleColorChange(color);
    setSelectedColor(color);
  };

  return (
    <>
      <div className='color-grid'>
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-item ${
              selectedColor === color ? 'selected' : ''
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          >
            {selectedColor === color && <span className='checkmark'>✔</span>}
          </div>
        ))}
      </div>
    </>
  );
};

export default ColorsViewer;
