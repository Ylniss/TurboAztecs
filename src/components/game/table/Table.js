import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { PlayerPanels } from '../player-panels/PlayerPanels';
import { GameObject } from '../game-object/GameObject';
import { useWindowSize } from '../../../hooks/windowSize'
import { useSpawner } from '../../../hooks/spawner';
import { useImages } from '../../../hooks/images';
import './Table.css';

import tableImage from '../../../assets/img/table/table.jpg';
import boardImage from '../../../assets/img/table/board.jpg';

export const Table = () => {
  const { gameObjects } = useContext(GlobalContext);

  const [width, height] = useWindowSize();
  const [aspectRatio] = useState(9 / 16);
  const images = useImages();
  const [spawn] = useSpawner();

  const [marginTop, setMarginTop] = useState();
  const [scale, setScale] = useState(1);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const ratio = height / width;
    const margin = (ratio - 0.50) / 2 * 100;

    if (margin < 0) setMarginTop(0);
    else setMarginTop(margin);

    if (ratio < 0.5) {
      setScale(ratio * 2);
      setTranslateY(-25/ratio+50);
    } else {
      setScale(1);
      setTranslateY(0);
    }

  }, [width, height]);

  useEffect(() => {
    // spawn('diamond', 915, 440);
    // spawn('crossing-tile', 808, 423);
    // spawn('barrel', 890, 423);
    // spawn('heart', 908, 483);
  }, []);

  return (
    <>
      {console.log(`${width}x${height}  -  ${height / width}  -  ${translateY}`)}
      <img className='table' draggable="false" src={tableImage} alt='table' />

      <div style={{
        position: 'relative',
        marginTop: `${marginTop}%`,
        width,
        height: width * aspectRatio,
        transform: `scale(${scale}) translate(0, ${translateY}%)`
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
