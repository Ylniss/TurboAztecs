import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Sprite } from '@inlet/react-pixi';

import boardImage from '../../../assets/img/table/board.png';

export const Board = () => {
  const { screenDefaults } = useContext(GlobalContext);
  const [size] = useState(1034);

  return (
    <Sprite
      image={boardImage}
      x={screenDefaults.width / 2 - size / 2}
      y={screenDefaults.height / 2 - size / 2}
    />
  );
};
