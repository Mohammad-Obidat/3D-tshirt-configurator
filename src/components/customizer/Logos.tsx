import React, { ChangeEvent, useRef, useState } from 'react';
import { UserInputProps } from '../../interfaces/TabContent.interface';
import { reader } from '../../config/helpers/FileRader';

const Logos: React.FC<UserInputProps> = ({
  canvasTextureManager,
  model,
  controlTab,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      reader(file)
        .then((result) => {
          if (typeof result === 'string') {
            setSelectedFile(result);
          } else {
            console.error('File result is not a string');
          }
        })
        .catch((error: Error) => {
          console.error('Error reading file:', error);
        });
    }
  };

  const addImage = async (): Promise<void> => {
    if (canvasTextureManager && selectedFile) {
      try {
        await canvasTextureManager.applyImageInput(
          controlTab.title,
          selectedFile
        );
      } catch (error) {
        console.error('Error applying image input:', error);
      }
    }
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className='userInput-container'>
        <div className='top-container'>
          <input
            type='file'
            id='fileInput'
            onChange={handleFileChange}
            accept='image/*'
            className='user-input'
            ref={fileInputRef}
          />
          <button type='submit' className='submit-btn' onClick={addImage}>
            Add Image
          </button>
        </div>
        <hr />
        <div className='stylish-container'>
          {canvasTextureManager?.canvasImageTextures.map((img, i) => (
            <img
              key={i}
              src={img.imageUrl}
              alt='logo'
              className='stylish-div'
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Logos;
