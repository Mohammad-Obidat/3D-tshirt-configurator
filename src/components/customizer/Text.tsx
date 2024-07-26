import React, { ChangeEvent, useEffect, useState } from 'react';
import { Mesh } from 'three';
import Delete from '../Delete';
import { UserInputProps } from '../../interfaces/TabContent.interface';

const Text: React.FC<UserInputProps> = ({
  canvasTextureManager,
  model,
  controlTab,
}) => {
  const [text, setText] = useState<string>('');
  const [canvasTextTextures, setCanvasTextTextures] = useState(
    canvasTextureManager?.canvasTextTextures[controlTab.title] || []
  );

  const handleInputText = (event: ChangeEvent<HTMLInputElement>): void => {
    const newText = event.target.value;
    setText(newText);
  };

  const addText = async (): Promise<void> => {
    if (canvasTextureManager && text) {
      await canvasTextureManager.applyTextInput(controlTab.title, text);
      setText('');
      setCanvasTextTextures([
        ...canvasTextureManager.canvasTextTextures[controlTab.title],
      ]);
    }
  };

  const deleteCanvasTexture = (mesh: Mesh): (() => void) => {
    return () => {
      if (canvasTextureManager) {
        canvasTextureManager.deleteCanvasTextMesh(mesh);
        setCanvasTextTextures([
          ...canvasTextureManager.canvasTextTextures[controlTab.title],
        ]);
      }
    };
  };

  useEffect(() => {
    if (canvasTextureManager) {
      canvasTextureManager.targetTab = controlTab.title;
      setCanvasTextTextures([
        ...canvasTextureManager.canvasTextTextures[controlTab.title],
      ]);
    }
  }, [controlTab, canvasTextureManager]);

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
          {canvasTextTextures.map((t, i) => (
            <div key={i} className='stylish-div'>
              <Delete dispose={deleteCanvasTexture(t.mesh)} />
              <div className='text-div'>{t.text}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Text;
