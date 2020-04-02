import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { PlayerPanels } from '../player-panels/PlayerPanels';
import { useWindowSize } from '../../../hooks/windowSize'
import { useSpawner } from '../../../hooks/spawner';
import { useImages } from '../../../hooks/images';
import './Table.css';

import tableImage from '../../../assets/img/table/table.jpg';
import boardImage from '../../../assets/img/table/board.jpg';

import { GameObject } from '../game-object/GameObject';

export const Table = () => {
  const { gameObjects } = useContext(GlobalContext);

  const [windowWidth, windowHeight] = useWindowSize();
  const [aspectRatio] = useState(9 / 16);
  const images = useImages();
  const [spawn] = useSpawner();

  useEffect(() => {
    spawn('diamond', 915, 440);
    spawn('crossing-tile', 808, 423);
    spawn('barrel', 890, 423);
    spawn('heart', 908, 483);
  }, []);

  return (
    <>
      {console.log(`${windowWidth}x${windowHeight}`)}
      <img className='table' draggable="false" src={tableImage} alt='table' />

      <div className='aspect-ratio-container'
        style={{
          marginTop: `${((windowHeight / windowWidth) - aspectRatio) / 2 * 100}%`,
          paddingBottom: `${aspectRatio * 100}%`
        }}>

        <img className='board shadow-around' draggable="false" src={boardImage} alt='board' />

        <PlayerPanels />

        {
          gameObjects.map(gameObj =>
            <GameObject key={gameObj.id} gameObjectInit={gameObj} images={images} />
          )
        }
      </div>
    </>
  )
}
