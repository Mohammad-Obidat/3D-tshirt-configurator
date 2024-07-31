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

  useEffect(() => {
    if (canvasTextureManager) {
      canvasTextureManager.targetTab = targetTab.title;
      setCanvasImageTextures([
        ...canvasTextureManager.canvasImageTextures[targetTab.title],
      ]);
    }
  }, [targetTab, canvasTextureManager]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        console.error('File size exceeds 10MB.');
        return;
      }
      if (!allowedTypes.includes(file.type)) {
        console.error('File type not allowed.');
        return;
      }
      try {
        const result = await reader(file);
        if (typeof result === 'string') {
          setSelectedFile(result);
        } else {
          console.error('File result is not a string');
        }
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
    e.target.value = '';
  };

  const addImage = async () => {
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
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      addImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  const deleteCanvasTexture = (mesh: Mesh) => {
    if (canvasTextureManager) {
      canvasTextureManager.removeMeshFromChild(mesh);
      setCanvasImageTextures([
        ...canvasTextureManager.canvasImageTextures[targetTab.title],
      ]);
    }
  };

  return (
    <>
      <div className='file-upload-container' onClick={handleClick}>
        <input
          id='fileInput'
          type='file'
          accept='image/*'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <div className='upload-icon'>
          <img
            src='/assets/icons/upload.svg'
            alt='upload logo'
            className='upload-img'
          />
        </div>
        <p className='logo-para'>(Max size: 10MB)</p>
        <p className='logo-para'>
          We accept file types like EPS (recommended) png / jpg / jpeg / gif
        </p>
      </div>
      <hr />
      {canvasTextureManager?.canvasImageTextures[targetTab.title].length ===
      0 ? (
        <div>
          No added images for the{' '}
          {targetTab.title === 'rightSleeve'
            ? 'right sleeve!'
            : targetTab.title === 'leftSleeve'
            ? 'left sleeve!'
            : `${targetTab.title} side!`}
        </div>
      ) : (
        <div className='stylish-container'>
          {canvasImageTextures.map((img, i) => (
            <div key={i} className='stylish-div'>
              <Delete dispose={() => deleteCanvasTexture(img.mesh)} />
              <img src={img.imageUrl} alt='logo' />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Logos;
