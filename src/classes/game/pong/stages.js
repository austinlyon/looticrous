import Brick from './brick.js';

export function buildStage(game, stage) {
  const bricks = [];

  stage.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        const position = {x: 102+brickIndex*100, y: 100+rowIndex*35};
        bricks.push(new Brick(game, position));
      }
    });
  });

  return bricks;
}

export const stage1 = [
  [ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
  [ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
  [ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
  [ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
];

export const stage2 = [
  [ 1 , 1 , 1 , 0 , 1 , 1 , 1 , 0 ],
  [ 1 , 1 , 0 , 1 , 1 , 1 , 0 , 1 ],
  [ 1 , 0 , 1 , 1 , 1 , 0 , 1 , 1 ],
  [ 0 , 1 , 1 , 1 , 0 , 1 , 1 , 1 ],
];

export const stage3 = [
  [ 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 ],
  [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
];
