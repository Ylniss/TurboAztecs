import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { v4 as uuidv4 } from 'uuid';

export const useSpawner = () => {

  const { addGameObject } = useContext(GlobalContext);

  const getType = (name) => {
    switch (name) {
      case 'diamond':
        return 'diamond';
      case 'crossing-tile':
      case 't-crossing-tile':
      case 'turn-tile':
      case 'straight-tile':
        return 'tile';
      default:
        return 'item';
    }
  }

  const getSize = (type) => {
    switch (type) {
      case 'diamond':
        return { width: 90, height: 90 };
      case 'tile':
        return { width: 124, height: 124 };
      case 'item':
        return { width: 71, height: 71 };
      default:
        return null;
    }
  }

  const isTurnable = (name) => {
    switch (name) {
      case 'diamond':
      case 'item:':
      case 'pawn': //todo: add pawns
        return false;
      default:
        return true;
    }
  }

  const isFlippable = (name) => {
    switch (name) {
      case 'diamond':
      case 'pawn': //todo: add pawns
      case 'overlay': //todo: add overlays
        return false;
      default:
        return true;
    }
  }

  const spawn = (name, x, y) => {
    
    const type = getType(name);
    const { width, height } = getSize(type);

    addGameObject({
      id: uuidv4(),
      type,
      name,
      x,
      y,
      width,
      height,
      turnable: isTurnable(name),
      flippable: isFlippable(name),
      turn: 0,
      flipped: false
    })
  }

  const spawnRandom = () => {
    //todo
  }

  return [spawn, spawnRandom];
}
