import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Sprite } from '@inlet/react-pixi';

import boardImage from '../../../assets/img/table/board.png';

export const Board = () => {
  const { screenDefaults } = useContext(GlobalContext);
  const [size, setSize] = useState(1102);
  const [scale] = useState(0.93);

  useEffect(() => {
    setSize(size*scale);
  }, [scale])

  return (
    <Sprite
      image={boardImage}
      x={screenDefaults.width / 2 - size / 2}
      y={screenDefaults.height / 2 - size / 2}
      scale={scale}
    />
  );
};
