import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { v4 as uuidv4 } from 'uuid';

export const useSpawner = () => {
  const { gameObjects } = useContext(GlobalContext);

  const getType = name => {
    switch (name) {
      case 'diamond':
        return 'diamond';
      case 'crossing-tile':
      case 't-crossing-tile':
      case 'turn-tile':
      case 'straight-tile':
        return 'tile';
      case 'green-pawn':
      case 'blue-pawn':
      case 'brown-pawn':
      case 'grey-pawn':
        return 'pawn';
      case 'overlay':
        return 'overlay';
      default:
        return 'item';
    }
  };

  const getCollisionCircle = (type) => {
    switch (type) {
      case 'diamond':
        return 3;
      case 'overlay':
        return 2;
      default:
        return 8;
    }
  };

  const isTurnable = type => {
    switch (type) {
      case 'diamond':
      case 'item:':
      case 'pawn':
      case 'overlay':
        return false;
      default:
        return true;
    }
  };

  const isFlippable = type => {
    switch (type) {
      case 'diamond':
      case 'pawn':
      case 'overlay': //todo: add overlays
        return false;
      default:
        return true;
    }
  };

  const spawn = (name, x, y, turn = 0, childrenIds = []) => {
    const type = getType(name);
    const id = uuidv4();

    gameObjects[id] = {
      id,
      type,
      name,
      x,
      y,
      collisionCircle: getCollisionCircle(type),
      turnable: isTurnable(type),
      flippable: isFlippable(type),
      turn,
      flipped: false,
      childrenIds,
    }

    return id;
  };

  const spawnRandom = () => {
    //todo
  };

  return { spawn, spawnRandom };
};
