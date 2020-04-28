import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Container, useApp, useTick } from '@inlet/react-pixi';
import { Board } from './Board';
import { useAspectRatioContainer } from '../../../hooks/useAspectRatioContainer';
import { useTableSettuper } from './useTableSettuper';
import { useStacks } from '../stacks/useStacks';
import { useImages } from './useImages';
import { PlayerPanel } from './PlayerPanel';
import { GameObject } from '../game-object/GameObject';
import { Stack } from '../stacks/Stack';

export const Game = ({ players }) => {
  const app = useApp();
  const { screenDefaults, gameObjects, stacks } = useContext(GlobalContext);
  const { width, height } = useAspectRatioContainer(screenDefaults.aspectRatio);
  const [triggerWindowChange, setTriggerWindowChange] = useState(false);
  const [gameObjectIds, setGameObjectIds] = useState(Object.keys(gameObjects));

  const images = useImages();
  const { spawnDiamondWithTile, spawnPlayerWithTile } = useTableSettuper();
  const { createStacks, getObjectNamesForAllStacks } = useStacks();

  useEffect(() => {
    // only if(host) and then send gameObjects and stacks to rest players
    const { tileStacks, itemStacks } = getObjectNamesForAllStacks(players.length);

    spawnDiamondWithTile();
    players.forEach((player, i) => {
      spawnPlayerWithTile(player.color);
      createStacks(player.color, tileStacks[i], itemStacks[i]);
    });
  }, []);

  useEffect(() => {
    setTriggerWindowChange(true);
  }, [app.renderer.width, app.renderer.height, width, height]);

  useTick(delta => {
    if (triggerWindowChange) {
      setTriggerWindowChange(false);
      app.stage.position.set(app.renderer.width / 2, app.renderer.height / 2);
      app.stage.scale.set(width / screenDefaults.width, height / screenDefaults.height);
      app.stage.pivot.set(screenDefaults.width / 2, screenDefaults.height / 2);
    }

    // triggers rerender when game object is added or removed
    if (gameObjectIds.length !== Object.keys(gameObjects).length) {
      setGameObjectIds(Object.keys(gameObjects));
    }
  });

  return (
    <Container sortableChildren={true}>
      <Board />

      {players.map(player => (
        <PlayerPanel key={player.nickname + player.color} color={player.color} />
      ))}

      {Object.keys(stacks).map(id => (
        <Stack key={id} id={id} />
      ))}

      {gameObjectIds.map(id => (
        <GameObject key={id} id={id} images={images} />
      ))}
    </Container>
  );
};
