import React from 'react';

const Center = ({ children }) => {
  return (
    <div 
        style={{
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            width: 1200,
            margin: 0,
            paddingTop: 56,
            paddingBottom: 56,
            //backgroundColor: 'orange',
        }}
    >
      {children}
    </div>
  );
};

export default Center;