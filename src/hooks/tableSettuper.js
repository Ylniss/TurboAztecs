import { useSpawner } from './spawner';

export const useTableSettuper = () => {
  const { spawn } = useSpawner();

  const spawnDiamondWithTile = () => {
    const diamondId = spawn('diamond', 900, 500);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);

    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
    spawn('crossing-tile', 900, 500, 0, [diamondId]);
  };

  const spawnPlayerWithTile = color => {
    switch (color) {
      case '#47cf31':
        spawn('turn-tile', 31.8, 17.9, 2);
        spawn('green-pawn', 32.9, 19.7);
        break;
      case '#0c81f2':
        spawn('turn-tile', 31.8, 70, 1);
        spawn('blue-pawn', 32.9, 72);
        break;
      case '#d2952b':
        spawn('turn-tile', 61.4, 17.9, 3);
        spawn('brown-pawn', 62.6, 19.7);
        break;
      case '#808080':
        spawn('turn-tile', 61.4, 70, 0);
        spawn('grey-pawn', 62.6, 72);
        break;

      default:
        console.log(`Color ${color} is not supported!`);
    }
  };

  return { spawnDiamondWithTile, spawnPlayerWithTile };
};
