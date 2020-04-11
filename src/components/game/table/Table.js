import React, { useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Responsive } from '../../shared/Responsive';
import { GameObject } from '../game-object/GameObject';
import { useTableSettuper } from '../../../hooks/tableSettuper';
import { useImages } from '../../../hooks/images';
import './Table.css';

import tableImage from '../../../assets/img/table/table.jpg';
import boardImage from '../../../assets/img/table/board.jpg';

export const Table = () => {
  const { players, gameObjects } = useContext(GlobalContext);

  const images = useImages();
  const { getPlayerPanel, spawnDiamondWithTile, spawnPlayerWithTile } = useTableSettuper();

  useEffect(() => {
    spawnDiamondWithTile();
    players.forEach(player => {
      spawnPlayerWithTile(player.color);
    });
  }, []);

  return (
    <>
      <img className='table' draggable='false' src={tableImage} alt='table' />
      <Responsive>
        <img className='board shadow-around' draggable='false' src={boardImage} alt='board' />

        {players.map(player => getPlayerPanel(player.color))}

        {Object.keys(gameObjects).map(key => (
          <GameObject key={key + gameObjects[key].x} id={key} gameObjects={gameObjects} images={images} />
        ))}
      </Responsive>
    </>
  );
};
