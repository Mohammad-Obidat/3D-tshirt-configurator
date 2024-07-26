import React from 'react';
import '../styles/Delete.css';

interface DeleteProps {
  dispose: () => void;
}

const Delete: React.FC<DeleteProps> = ({ dispose }) => {
  return (
    <div className='circle' onClick={dispose}>
      <div className='delete-icon'>x</div>
    </div>
  );
};

export default Delete;
