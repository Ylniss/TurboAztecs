import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
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

  const getSize = type => {
    switch (type) {
      case 'diamond':
        return { width: 103, height: 103 };
      case 'tile':
        return { width: 145, height: 145 };
      case 'pawn':
        return { width: 95, height: 95 };
      case 'overlay':
        return { width: 117, height: 43 };
      case 'item':
        return { width: 78, height: 78 };
      default:
        return { width: 1, height: 1 };
    }
  };

  const getCollisionCircleRadius = type => {
    switch (type) {
      case 'tile':
        return 75;
      default:
        return 12;
    }
  };

  const getCollisionCircleOffset = type => {
    const size = getSize(type);
    switch (type) {
      case 'diamond':
        return { x: size.width / 2 - 2, y: size.height / 2 + 15 };
      default:
        return { x: size.width / 2, y: size.height / 2 };
    }
  };

  const getCollisionCircle = (type, id, x, y) => {
    const offset = getCollisionCircleOffset(type);
    const collisionCirclePosition = { x: x + offset.x, y: y + offset.y };
    const radius = getCollisionCircleRadius(type);

    return { id, x: collisionCirclePosition.x, y: collisionCirclePosition.y, radius };
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
      collisionCircleOffset: getCollisionCircleOffset(type),
      collisionCircle: getCollisionCircle(type, id, x, y),
      turnable: isTurnable(type),
      flippable: isFlippable(type),
      turn,
      flipped: false,
      childrenIds,
    };

    return id;
  };

  const spawnRandom = () => {
    //todo
  };

  return { spawn, spawnRandom };
};
