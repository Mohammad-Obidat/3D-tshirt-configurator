import React, { ChangeEvent, useState } from 'react';
import { UserInputProps } from '../../interfaces/TabContent.interface';
import Delete from '../Delete';

const Text: React.FC<UserInputProps> = ({
  canvasTextureManager,
  model,
  controlTab,
}) => {
  const [text, setText] = useState<string>('');

  const handleInputText = (event: ChangeEvent<HTMLInputElement>): void => {
    const newText = event.target.value;
    setText(newText);
  };

  const addText = (): void => {
    if (canvasTextureManager && text) {
      canvasTextureManager.applyTextInput(controlTab.title, text);
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
        <div className='stylish-container'>
          {canvasTextureManager?.canvasTextTextures.map((t, i) => (
            <div key={i} className='stylish-div'>
              <Delete />
              <div className='text-div'>{t.text}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Text;
