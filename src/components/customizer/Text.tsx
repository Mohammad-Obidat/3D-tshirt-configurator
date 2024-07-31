import React, { ChangeEvent, useEffect, useState } from 'react';
import { Mesh } from 'three';
import Delete from '../Delete';
import { UserInputProps } from '../../interfaces/TabContent.interface';

const Text: React.FC<UserInputProps> = ({
  canvasTextureManager,
  model,
  targetTab,
}) => {
  const [text, setText] = useState<string>('');
  const [canvasTextTextures, setCanvasTextTextures] = useState(
    canvasTextureManager?.canvasTextTextures[targetTab.title] || []
  );

  const handleInputText = (event: ChangeEvent<HTMLInputElement>): void => {
    const newText = event.target.value;
    setText(newText);
  };

  const addText = async (): Promise<void> => {
    if (canvasTextureManager && text) {
      await canvasTextureManager.applyTextInput(targetTab.title, text);
      setText('');
      setCanvasTextTextures([
        ...canvasTextureManager.canvasTextTextures[targetTab.title],
      ]);
    }
  };

  const deleteCanvasTexture = (mesh: Mesh): (() => void) => {
    return () => {
      if (canvasTextureManager) {
        canvasTextureManager.removeMeshFromChild(mesh);
        setCanvasTextTextures([
          ...canvasTextureManager.canvasTextTextures[targetTab.title],
        ]);
      }
    };
  };

  useEffect(() => {
    if (canvasTextureManager) {
      canvasTextureManager.targetTab = targetTab.title;
      setCanvasTextTextures([
        ...canvasTextureManager.canvasTextTextures[targetTab.title],
      ]);
    }
  }, [targetTab, canvasTextureManager]);

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
        <>
          {canvasTextureManager?.canvasTextTextures[targetTab.title].length ===
          0 ? (
            <>
              No added text for the{' '}
              {targetTab.title === 'rightSleeve'
                ? 'right sleeve!'
                : targetTab.title === 'leftSleeve'
                ? 'left sleeve!'
                : `${targetTab.title} side!`}
            </>
          ) : (
            <>
              <div className='stylish-container'>
                {canvasTextTextures.map((t, i) => (
                  <div key={i} className='stylish-div'>
                    <Delete dispose={deleteCanvasTexture(t.mesh)} />
                    <div className='text-div'>{t.text}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      </div>
    </>
  );
};

export default Text;
