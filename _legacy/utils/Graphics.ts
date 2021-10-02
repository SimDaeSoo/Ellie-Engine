import * as PIXI from 'pixi.js';
import { Line } from '../interfaces';

function drawTiles(
  graphics: PIXI.Graphics,
  tileGrid: Array<Array<[Uint8Array, Float64Array]>>,
  tilesize: number = 8,
  color: number = 0x666666
): void {
  graphics.beginFill(color);
  for (let y = 0; y < tileGrid.length; y++) {
    for (let x = 0; x < tileGrid[y].length; x++) {
      if (tileGrid[y][x][0][0]) {
        graphics.drawRect(x * tilesize, y * tilesize, tilesize, tilesize);
      }
    }
  }
  graphics.endFill();
}

function drawPoints(
  graphics: PIXI.Graphics,
  points: Array<[number, number]>,
  radius: number = 1,
  color: number = 0xff0000
): void {
  graphics.beginFill(color);

  for (const point of points) {
    graphics.drawCircle(point[0], point[1], radius);
  }

  graphics.endFill();
}

function drawLines(
  graphics: PIXI.Graphics,
  lines: Array<Line>,
  options: PIXI.ILineStyleOptions = { width: 1, color: 0x00ff00 }
) {
  graphics.lineStyle(options);

  for (const [begin, end] of lines) {
    graphics.moveTo(...begin);
    graphics.lineTo(...end);
  }

  graphics.endFill();
  graphics.line.reset();
}

export { drawTiles, drawPoints, drawLines };
