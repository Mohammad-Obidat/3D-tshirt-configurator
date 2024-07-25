import React, { useState } from 'react';
import { UserInputProps } from '../../interfaces/TabContent.interface';

const Text: React.FC<UserInputProps> = ({
  canvasTextureManager,
  model,
  controlTab,
}) => {
  const [text, setText] = useState<string>('');

  const handleInputText = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newText = event.target.value;
    setText(newText);
  };

  const addText = (): void => {
    if (text) {
      canvasTextureManager?.applyTextInput(controlTab.title, text);
      setText('');
    }
  };

  return (
    <>
      <div className='userInput-container'>
        <div className='top-container'>
          <label className='text-label' htmlFor='add-text'>
            Enter Text:
          </label>
          <input
            type='text'
            id='add-text'
            name='add text'
            value={text}
            className='user-input'
            placeholder='Enter your text here:'
            onChange={handleInputText}
          />
          <button type='submit' className='submit-btn' onClick={addText}>
            Add Text
          </button>
        </div>
        <hr />
        {/* <div className='stylish-container'>
          <div className='stylish-div'>
            <label className='text-label' htmlFor='font-family'>
              change the font family:
            </label>
            <select id='font-family' className='select-font' name='font family'>
              <option value='Arial'>Arial</option>
              <option value='Times New Roman'>Times New Roman</option>
              <option value='Courier New'>Courier New</option>
              <option value='Brush Script MT'>Brush Script MT</option>
            </select>
          </div>
          <div className='stylish-div'>
            <label className='text-label' htmlFor='font-size'>
              change the font size:
            </label>

            <input
              type='number'
              id='font-size'
              className='text-input stylish-input'
              name='font size'
            />
          </div>
          <div className='stylish-div'>
            <label className='text-label' htmlFor='font-color'>
              change the font color:
            </label>
            <input
              type='color'
              id='font-color'
              className='text-input stylish-input'
              name='font color'
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Text;
