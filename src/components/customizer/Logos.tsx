import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Mesh } from 'three';
import Delete from '../Delete';
import { UserInputProps } from '../../interfaces/TabContent.interface';
import { reader } from '../../config/helpers/FileRader';

const Logos: React.FC<UserInputProps> = ({
  canvasTextureManager,
  model,
  targetTab,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [canvasImageTextures, setCanvasImageTextures] = useState(
    canvasTextureManager?.canvasImageTextures[targetTab.title] || []
  );

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
          targetTab.title,
          selectedFile
        );
        setCanvasImageTextures([
          ...canvasTextureManager.canvasImageTextures[targetTab.title],
        ]);
      } catch (error) {
        console.error('Error applying image input:', error);
      }
    }
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const deleteCanvasTexture = (mesh: Mesh): (() => void) => {
    return () => {
      if (canvasTextureManager) {
        canvasTextureManager.removeMeshFromChild(mesh);
        setCanvasImageTextures([
          ...canvasTextureManager.canvasImageTextures[targetTab.title],
        ]);
      }
    };
  };

  useEffect(() => {
    if (canvasTextureManager) {
      canvasTextureManager.targetTab = targetTab.title;
      setCanvasImageTextures([
        ...canvasTextureManager.canvasImageTextures[targetTab.title],
      ]);
    }
  }, [targetTab, canvasTextureManager]);

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
        <>
          {canvasTextureManager?.canvasImageTextures[targetTab.title].length ===
          0 ? (
            <>No added images for the {targetTab.title} side!</>
          ) : (
            <>
              <div className='stylish-container'>
                {canvasImageTextures.map((img, i) => (
                  <>
                    <div key={i} className='stylish-div'>
                      <Delete dispose={deleteCanvasTexture(img.mesh)} />
                      <img src={img.imageUrl} alt='logo' />
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </>
      </div>
    </>
  );
};

export default Logos;
