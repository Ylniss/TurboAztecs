import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from '../context/GlobalState';
import { useSpawner } from './spawner';
import { shuffle, chunk } from '../services/arrayHelper';
import { tiles, items } from '../components/game/stacks/setup-counts.json';

export const useTableSettuper = () => {
  const { availableColors, stacks } = useContext(GlobalContext);
  const { spawn } = useSpawner();

  const spawnDiamondWithTile = () => {
    const diamondId = spawn('diamond', 910, 493);
    spawn('crossing-tile', 887, 468, 0, [diamondId]);
  };

  const spawnPlayerWithTile = color => {
    switch (color) {
      case availableColors[0]:
        const greenPawnId = spawn('green-pawn', 625, 206);
        spawn('turn-tile', 600, 182, 2, [greenPawnId]);
        break;
      case availableColors[1]:
        const bluePawnId = spawn('blue-pawn', 625, 778);
        spawn('turn-tile', 600, 755, 1, [bluePawnId]);
        break;
      case availableColors[2]:
        const brownPawnId = spawn('brown-pawn', 1197, 206);
        spawn('turn-tile', 1175, 182, 3, [brownPawnId]);
        break;
      case availableColors[3]:
        const greyPawnId = spawn('grey-pawn', 1197, 778);
        spawn('turn-tile', 1175, 755, 0, [greyPawnId]);
        break;
      default:
        console.log(`Color ${color} is not supported!`);
    }
  };

  const getArrayFromCounts = counts => {
    let array = [];
    counts.forEach(item => {
      for (let i = 0; i < item.count; ++i) {
        array.push(item.name);
      }
    });
    return array;
  };

  const createStack = (x, y, type, content) => {
    const id = uuidv4();
    stacks[id] = { x, y, type, content };
  };

  const getObjectNamesForAllStacks = numberOfStacks => {
    let tileStack = getArrayFromCounts(tiles);
    let itemStack = getArrayFromCounts(items);

    tileStack = shuffle(tileStack);
    itemStack = shuffle(itemStack);

    let tileStacks = chunk(tileStack, tileStack.length / numberOfStacks);
    let itemStacks = chunk(itemStack, itemStack.length / numberOfStacks);

    return { tileStacks, itemStacks };
  };

  const createStacks = (color, tileStack, itemStack) => {
    switch (color) {
      case availableColors[0]:
        createStack(30, 310, 'tile', tileStack);
        createStack(230, 310, 'item', itemStack);
        break;
      case availableColors[1]:
        createStack(30, 610, 'tile', tileStack);
        createStack(230, 685, 'item', itemStack);
        break;
      case availableColors[2]:
        createStack(1740, 310, 'tile', tileStack);
        createStack(1635, 310, 'item', itemStack);
        break;
      case availableColors[3]:
        createStack(1740, 610, 'tile', tileStack);
        createStack(1635, 685, 'item', itemStack);
        break;
      default:
        console.log(`Color ${color} is not supported!`);
    }
  };

  return { spawnDiamondWithTile, spawnPlayerWithTile, createStacks, getObjectNamesForAllStacks };
};
