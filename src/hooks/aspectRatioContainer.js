import { useState, useEffect } from 'react';
import { useWindowSize } from './windowSize'

export const useAspectRatioContainer = (aspectRatio) => {

  const [windowWidth, windowHeight] = useWindowSize();

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

  }, [windowWidth, windowHeight, aspectRatio]);

  return [ width, height ];
}
