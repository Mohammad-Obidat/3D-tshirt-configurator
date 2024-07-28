import React from 'react';

interface viewerHeaderProps {
  title: string;
  desc: string;
}

const ViewerHeader: React.FC<viewerHeaderProps> = ({ title, desc }) => {
  return (
    <>
      <h4 className='title-h4'>
        {title === 'Design' || title === 'Pattern'
          ? `Select ${title}`
          : title === 'Color'
          ? 'Choose Colors'
          : title === 'Text'
          ? 'Add Text'
          : 'Upload Logos'}
      </h4>
      <p className='description'>{desc}</p>
      <hr />
    </>
  );
};

export default ViewerHeader;
