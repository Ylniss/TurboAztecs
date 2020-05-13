import { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { useSpawner } from '../useSpawner';

export const useTableSettuper = () => {
  const { availableColors } = useContext(GlobalContext);
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

  return { spawnDiamondWithTile, spawnPlayerWithTile };
};
