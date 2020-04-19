import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Sprite } from '@inlet/react-pixi';

import greenPanelImage from '../../../assets/img/table/green-panel.png';
import bluePanelImage from '../../../assets/img/table/blue-panel.png';
import brownPanelImage from '../../../assets/img/table/brown-panel.png';
import greyPanelImage from '../../../assets/img/table/grey-panel.png';

export const PlayerPanel = ({ color }) => {
  const { availableColors } = useContext(GlobalContext);
  const [panel, setPanel] = useState();

  useEffect(() => {
    switch (color) {
      case availableColors[0]:
        setPanel({ image: greenPanelImage, x: 20, y: 40 });
        break;
      case availableColors[1]:
        setPanel({ image: bluePanelImage, x: 20, y: 790 });
        break;
      case availableColors[2]:
        setPanel({ image: brownPanelImage, x: 1490, y: 40 });
        break;
      case availableColors[3]:
        setPanel({ image: greyPanelImage, x: 1490, y: 790 });
        break;

      default:
        console.log(`${color} color not supported!`);
    }
  }, []);

  if(!panel) return <></>;
  return <Sprite image={panel.image} x={panel.x} y={panel.y} />;
};
