import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../../hooks/windowSize'

export const Responsive = ({ children }) => {

  const [windowWidth, windowHeight] = useWindowSize();
  const [aspectRatio] = useState(9 / 16);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const ratio = windowHeight / windowWidth;
    if (ratio < aspectRatio) {
      setHeight(windowHeight);
      setWidth(1 / aspectRatio * windowHeight);
    } else {
      setWidth(windowWidth);
      setHeight(aspectRatio * windowWidth);
    }

  }, [windowWidth, windowHeight]);

  console.log(`${windowWidth}x${windowHeight}  -  ratio:${windowHeight / windowWidth}  -  w:${width}  -  h:${height}`);
  return (
    <div style={{
      position: 'relative',
      width,
      height,
      top: '50vh',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}>
      {children}
    </div>
  )
}
