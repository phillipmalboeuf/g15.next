import React from 'react';

type SpacerProps = {
  height?: number;
  width?: number;
}

const Spacer: React.FC<SpacerProps> = ({
  height,
  width,
}) => {
  return (
    <div 
      style={{
        display: 'flex',
        height: 20,
        width: 12,
      }}
    />
  );
};

export default Spacer;