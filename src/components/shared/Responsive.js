import React from 'react';
import { useAspectRatioContainer } from '../../hooks/aspectRatioContainer';

export const Responsive = ({ children }) => {
  const [width, height] = useAspectRatioContainer(9 / 16);

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        top: '50vh',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {children}
    </div>
  );
};
