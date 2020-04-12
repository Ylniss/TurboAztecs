import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Sprite } from '@inlet/react-pixi';

import boardImage from '../../../assets/img/table/board.png';

export const PlayerPanel = () => {
  const { screenDefaults } = useContext(GlobalContext);
  const [size, setSize] = useState(324);
  const [scale] = useState(0.31);

  useEffect(() => {
    setSize(size*scale);
  }, [scale])

  return (
    <Sprite
      image={boardImage}
      x={50}
      y={200}
      scale={scale}
    />
  );
};
