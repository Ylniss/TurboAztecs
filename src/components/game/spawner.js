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

  const isTurnable = (name) => {
    switch (name) {
      case 'diamond':
      case 'pawn': //todo: add pawns
        return false;
      default: //tiles and items
        return true;
    }
  }

  const spawn = (name, x, y) => {
    addGameObject({
      id: uuidv4(),
      type: getType(name),
      name,
      x,
      y,
      turnable: isTurnable(name),
      flippable: isTurnable(name),
      turn: 0,
      flipped: false
    })
  }

  const spawnRandom = () => {
    //todo
  }

  return [spawn, spawnRandom];
}
