import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Sprite } from '@inlet/react-pixi';

import panelImage from '../../../assets/img/table/green-panel.png';

export const PlayerPanel = () => {
  const { screenDefaults } = useContext(GlobalContext);
  const [scale] = useState(0.93);

  return <Sprite image={panelImage} x={50} y={200} scale={scale} />;
};
