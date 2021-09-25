import * as PIXI from 'pixi.js';

function drawTiles(
  graphics: PIXI.Graphics,
  tileGrid: Array<Array<[Uint8Array, Float64Array]>>,
  tilesize: number = 8
): void {
  graphics.beginFill(0x666666);
  for (let y = 0; y < tileGrid.length; y++) {
    for (let x = 0; x < tileGrid[y].length; x++) {
      if (tileGrid[y][x][0][0]) {
        graphics.drawRect(x * tilesize, y * tilesize, tilesize, tilesize);
      }
    }
  }
  graphics.endFill();
}

export { drawTiles };
