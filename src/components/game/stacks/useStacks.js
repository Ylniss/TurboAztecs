import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from '../../../context/GlobalState';
import { shuffle, chunk } from '../../../utils/arrayHelper';
import { tiles, items } from './setup-counts.json';

export const useStacks = () => {
  const { availableColors, stacks } = useContext(GlobalContext);

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

  const getContentForAllStacks = numberOfStacks => {
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

  return { createStacks, getContentForAllStacks };
};
