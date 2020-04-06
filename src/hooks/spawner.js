import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { v4 as uuidv4 } from 'uuid';

export const useSpawner = () => {
  const { addGameObject } = useContext(GlobalContext);

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
        return 8.4;
      case 'tile':
        return 12;
      case 'item':
        return 6.4;
      case 'pawn':
        return 8;
      default:
        return null;
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

  const spawn = (name, x, y, turn = 0) => {
    const type = getType(name);
    addGameObject({
      id: uuidv4(),
      type,
      name,
      x,
      y,
      size: getSize(type),
      turnable: isTurnable(type),
      flippable: isFlippable(type),
      turn,
      flipped: false,
    });
  };

  const spawnRandom = () => {
    //todo
  };

  return { spawn, spawnRandom };
};
