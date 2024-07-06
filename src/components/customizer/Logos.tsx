import React, { ChangeEvent, useState } from 'react';
import { reader } from '../../config/helpers/FileRader';

const Logos: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      reader(file)
        .then((result) => {
          setSelectedFile(file);
          console.log(result);
        })
        .catch((error: Error) => {
          console.error('Error reading file:', error);
        });
    }
  };

  return (
    <div>
      <input
        type='file'
        id='fileInput'
        onChange={handleFileChange}
        accept='image/*'
      />
      <div>{selectedFile && selectedFile.name}</div>
    </div>
  );
};

export default Logos;
