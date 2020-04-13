import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Container, useApp } from '@inlet/react-pixi';
import { Board } from './Board';
import { useAspectRatioContainer } from '../../../hooks/aspectRatioContainer';
import { useTableSettuper } from '../../../hooks/tableSettuper';
import { useImages } from '../../../hooks/images';
import { PlayerPanel } from './PlayerPanel';
import { GameObject } from '../game-object/GameObject';

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
    <Container sortableChildren={true}>
      <Board />
      {/* {(() => {
        if (Object.keys(gameObjects)[0]) {
          return <GameObject id={Object.keys(gameObjects)[0]} gameObjects={gameObjects} images={images}/>
        }
      })()} */}

      {Object.keys(gameObjects).map(id => (
        <GameObject key={id} id={id} gameObjects={gameObjects} images={images} />
      ))}

      {players.map(player => (
        <PlayerPanel key={player.color} />
      ))}
    </Container>
  );
};
