import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Container, Sprite, useApp } from '@inlet/react-pixi';
import { Board } from './Board';
import { useAspectRatioContainer } from '../../../hooks/aspectRatioContainer';
import { useTableSettuper } from '../../../hooks/tableSettuper';
import { useImages } from '../../../hooks/images';
import { PlayerPanel } from './PlayerPanel';

import boardImage from '../../../assets/img/table/board.png';
import tile from '../../../assets/img/game-objects/crossing-tile.png';
import item from '../../../assets/img/game-objects/amulet.png';

export const Game = ({ players }) => {
  const app = useApp();
  const { screenDefaults, gameObjects } = useContext(GlobalContext);
  const { width, height } = useAspectRatioContainer(screenDefaults.aspectRatio);

  const images = useImages();
  const { spawnDiamondWithTile, spawnPlayerWithTile } = useTableSettuper();

  useEffect(() => {
    spawnDiamondWithTile();
    players.forEach(player => {
      spawnPlayerWithTile(player.color);
    });
  }, []);

  useEffect(() => {
    app.stage.position.set(app.renderer.width / 2, app.renderer.height / 2);
    app.stage.scale.set(width / screenDefaults.width, height / screenDefaults.height);
    app.stage.pivot.set(screenDefaults.width / 2, screenDefaults.height / 2);
  }, [app.renderer.width, app.renderer.height, width, height]);

  return (
    <Container>
      <Board />
      <Sprite image={tile} x={458} y={182} scale={0.93} />
      <Sprite image={item} x={465} y={209} scale={0.93} />
      

      {/* {players.forEach(player => (
        <PlayerPanel />
      ))} */}
      {players.forEach(player => (
        <Sprite image={boardImage} x={50} y={60} />
      ))}
    </Container>
  );
};
