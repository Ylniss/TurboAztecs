import React, { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';

import './PlayerPanels.css';

import bluePlayerPanel from '../../../assets/img/table/blue-panel.png';
import brownPlayerPanel from '../../../assets/img/table/brown-panel.png';
import greenPlayerPanel from '../../../assets/img/table/green-panel.png';
import greyPlayerPanel from '../../../assets/img/table/grey-panel.png';

export const PlayerPanels = () => {
  const { players } = useContext(GlobalContext);

  const getPlayerPanel = (color) => {
    //todo: get colors from available colors globalstate after merge
    switch (color) {
      case "#47cf31":
        return (<img key='1' className='green-panel shadow-around' draggable="false" src={greenPlayerPanel} alt='greenPlayerPanel' />);
      case "#0c81f2":
        return (<img key='2' className='blue-panel shadow-around' draggable="false" src={bluePlayerPanel} alt='bluePlayerPanel' />);
      case "#d2952b":
        return (<img key='3' className='brown-panel shadow-around' draggable="false" src={brownPlayerPanel} alt='brownPlayerPanel' />);
      case "#808080":
        return (<img key='4' className='grey-panel shadow-around' draggable="false" src={greyPlayerPanel} alt='greyPlayerPanel' />);

      default:
        console.log(`Color ${color} is not supported!`);
    }
  }

  return (
    <>
      {
        players.map(player => getPlayerPanel(player.color))
      }
    </>
  )
}
