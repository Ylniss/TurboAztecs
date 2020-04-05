import React from 'react';
import { useSpawner } from './spawner';

import bluePlayerPanel from '../assets/img/table/blue-panel.png';
import brownPlayerPanel from '../assets/img/table/brown-panel.png';
import greenPlayerPanel from '../assets/img/table/green-panel.png';
import greyPlayerPanel from '../assets/img/table/grey-panel.png';

export const useTableSettuper = () => {

  const { spawn } = useSpawner();

  const panelStyle = {
    position: 'absolute',
    height: '23.5%'
  }

  const getPlayerPanel = (color) => {
    switch (color) {
      case "#47cf31":
        return (<img style={{ ...panelStyle, top: '5.4%', left: '0.75%' }} className='shadow-around' draggable="false" src={greenPlayerPanel} alt='greenPlayerPanel' />);
      case "#0c81f2":
        return (<img style={{ ...panelStyle, top: '71%', left: '0.75%' }} className='shadow-around' draggable="false" src={bluePlayerPanel} alt='bluePlayerPanel' />);
      case "#d2952b":
        return (<img style={{ ...panelStyle, top: '5.4%', left: '77%' }} className='shadow-around' draggable="false" src={brownPlayerPanel} alt='brownPlayerPanel' />);
      case "#808080":
        return (<img style={{ ...panelStyle, top: '71%', left: '77%' }} className='shadow-around' draggable="false" src={greyPlayerPanel} alt='greyPlayerPanel' />);

      default:
        console.log(`Color ${color} is not supported!`);
    }
  }

  const spawnDiamond = () => {
    spawn('crossing-tile', 46.7, 44);
    spawn('diamond', 47.7, 45.7);
  }

  const spawnPlayer = (color) => {
    switch (color) {
      case "#47cf31":
        spawn('turn-tile', 31.8, 17.9, 2);
        spawn('green-pawn', 32.9, 19.7);
        break;
      case "#0c81f2":
        spawn('turn-tile', 31.8, 70, 1);
        spawn('blue-pawn', 32.9, 72);
        break;
      case "#d2952b":
        spawn('turn-tile', 61.4, 17.9, 3);
        spawn('brown-pawn', 62.6, 19.7);
        break;
      case "#808080":
        spawn('turn-tile', 61.4, 70, 0);
        spawn('grey-pawn', 62.6, 72);
        break;

      default:
        console.log(`Color ${color} is not supported!`);
    }
  }

  return { getPlayerPanel, spawnDiamond, spawnPlayer }
}



