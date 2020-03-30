import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { PlayerPanels } from '../player-panels/PlayerPanels';
import { useSpawner } from '../spawner';
import './Table.css';

import tableImage from '../../../assets/img/table/table.jpg';
import boardImage from '../../../assets/img/table/board.jpg';

import { GameObject } from '../game-object/GameObject';

export const Table = () => {
  const { gameObjects } = useContext(GlobalContext)
  const [spawn] = useSpawner();

  useEffect(() => {
    spawn('diamond', 915, 440);
    spawn('crossing-tile', 808, 423);
    spawn('barrel', 890, 423);
    spawn('heart', 908, 483);
  }, []);

  return (
    <>
      <img className='table' draggable="false" src={tableImage} alt='table' />
      <img className='board shadow-around' draggable="false" src={boardImage} alt='board' />

      <PlayerPanels />

      {
        gameObjects.map(gameObj =>
          <GameObject key={gameObj.id} gameObjectInit={gameObj} />
        )
      }
    </>
  )
}
