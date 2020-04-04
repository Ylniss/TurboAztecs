import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../../hooks/windowSize'

export const Responsive = ({ children }) => {

  const [width, height] = useWindowSize();
  const [aspectRatio] = useState(9 / 16);

  const [marginTop, setMarginTop] = useState();
  const [scale, setScale] = useState(1);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const ratio = height / width;
    const margin = (ratio - 0.5) / 2 * 100;

    if (margin < 0) setMarginTop(0);
    else setMarginTop(margin);

    if (ratio < 0.5) {
      setScale(ratio * 2);
      setTranslateY(-25 / ratio + 50);
    } else {
      setScale(1);
      setTranslateY(0);
    }
    console.log(`${width}x${height}  -  ${ratio}  -  ${translateY}`);
  }, [width, height]);

  return (
    <div style={{
      position: 'relative',
      marginTop: `${marginTop}%`,
      width,
      height: width * aspectRatio,
      transform: `scale(${scale}) translate(0, ${translateY}%)`
    }}>
      {children}
    </div>
  )
}
