import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Container, useTick } from '@inlet/react-pixi';
import { Board } from './Board';
import { useTableSettuper } from './useTableSettuper';
import { useStacks } from '../stacks/useStacks';
import { useImages } from './useImages';
import { PlayerPanel } from './PlayerPanel';
import { GameObject } from '../game-object/GameObject';
import { Stack } from '../stacks/Stack';
import { useScreenResizer } from './useScreenResizer';

export const Game = ({ players }) => {
  const { gameObjects, stacks } = useContext(GlobalContext);
  const [gameObjectIds, setGameObjectIds] = useState(Object.keys(gameObjects));

  const images = useImages();
  useScreenResizer();
  const { spawnDiamondWithTile, spawnPlayerWithTile } = useTableSettuper();
  const { createStacks, getContentForAllStacks } = useStacks();

  useEffect(() => {
    // todo: only if(host) and then send gameObjects and stacks to rest players
    const { tileStacks, itemStacks } = getContentForAllStacks(players.length);

    spawnDiamondWithTile();
    players.forEach((player, i) => {
      spawnPlayerWithTile(player.color);
      createStacks(player.color, tileStacks[i], itemStacks[i]);
    });
  }, []);

  useTick(() => {
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
