import * as PIXI from 'pixi.js';

function getTileNumber(
  x: number,
  y: number,
  tileGrid: Array<Array<[Uint8Array, Float64Array]>>
): number {
  const topLeft =
    y > 0 && x > 0 && tileGrid[y - 1][x - 1][0][0] === tileGrid[y][x][0][0];
  const top = y > 0 && tileGrid[y - 1][x][0][0] === tileGrid[y][x][0][0];
  const topRight =
    y > 0 &&
    x < tileGrid[0].length - 1 &&
    tileGrid[y - 1][x + 1][0][0] === tileGrid[y][x][0][0];
  const left = x > 0 && tileGrid[y][x - 1][0][0] === tileGrid[y][x][0][0];
  const right =
    x < tileGrid[0].length - 1 &&
    tileGrid[y][x + 1][0][0] === tileGrid[y][x][0][0];
  const bottomLeft =
    y < tileGrid.length - 1 &&
    x > 0 &&
    tileGrid[y + 1][x - 1][0][0] === tileGrid[y][x][0][0];
  const bottom =
    y < tileGrid.length - 1 &&
    tileGrid[y + 1][x][0][0] === tileGrid[y][x][0][0];
  const bottomRight =
    y < tileGrid.length - 1 &&
    x < tileGrid[0].length - 1 &&
    tileGrid[y + 1][x + 1][0][0] === tileGrid[y][x + 1][0][0];

  if (!top && !left && right && bottom) return 0;
  if (!top && left && right && bottom && !bottomLeft && bottomRight) return 40;
  if (!top && left && right && bottom && !bottomLeft && !bottomRight) return 41;
  if (!top && left && right && bottom && bottomLeft && !bottomRight) return 42;
  if (!top && left && right && bottom) return 1;
  if (!top && left && !right && bottom) return 2;
  if (
    top &&
    left &&
    right &&
    bottom &&
    topLeft &&
    topRight &&
    bottomLeft &&
    !bottomRight
  )
    return 3;
  if (top && left && right && !bottom && !topLeft && topRight) return 50;
  if (top && left && right && !bottom && topLeft && !topRight) return 52;
  if (top && left && right && !bottom && !topLeft && !topRight) return 51;
  if (top && left && right && !bottom) return 4;
  if (
    top &&
    left &&
    right &&
    bottom &&
    topLeft &&
    topRight &&
    !bottomLeft &&
    bottomRight
  )
    return 5;
  if (
    top &&
    left &&
    right &&
    bottom &&
    topLeft &&
    topRight &&
    bottomLeft &&
    bottomRight
  )
    return 11;
  if (top && !left && right && bottom && !topRight && bottomRight) return 35;
  if (top && !left && right && bottom && !topRight && !bottomRight) return 36;
  if (top && !left && right && bottom && topRight && !bottomRight) return 37;
  if (top && !left && right && bottom) return 10;
  if (top && left && !right && bottom && topLeft && !bottomLeft) return 43;
  if (top && left && !right && bottom && !topLeft && !bottomLeft) return 44;
  if (top && left && !right && bottom && !topLeft && bottomLeft) return 45;
  if (top && left && !right && bottom) return 12;
  if (
    top &&
    left &&
    right &&
    bottom &&
    !topLeft &&
    topRight &&
    !bottomLeft &&
    bottomRight
  )
    return 16;
  if (
    top &&
    left &&
    right &&
    bottom &&
    topLeft &&
    topRight &&
    !bottomLeft &&
    !bottomRight
  )
    return 17;
  if (
    top &&
    left &&
    right &&
    bottom &&
    !topLeft &&
    topRight &&
    bottomLeft &&
    !bottomRight
  )
    return 18;
  if (top && !left && right && !bottom) return 20;
  if (top && left && !right && !bottom) return 22;
  if (
    top &&
    left &&
    right &&
    bottom &&
    topLeft &&
    !topRight &&
    bottomLeft &&
    bottomRight
  )
    return 23;
  if (
    top &&
    left &&
    right &&
    bottom &&
    !topLeft &&
    topRight &&
    bottomLeft &&
    bottomRight
  )
    return 56;
  if (
    top &&
    left &&
    right &&
    bottom &&
    topLeft &&
    !topRight &&
    bottomLeft &&
    !bottomRight
  )
    return 26;
  if (
    top &&
    left &&
    right &&
    bottom &&
    !topLeft &&
    !topRight &&
    bottomLeft &&
    bottomRight
  )
    return 27;
  if (
    top &&
    left &&
    right &&
    bottom &&
    topLeft &&
    !topRight &&
    !bottomLeft &&
    bottomRight
  )
    return 28;
  if (!top && !left && right && !bottom) return 31;
  if (!top && left && right && !bottom) return 32;
  if (!top && left && !right && !bottom) return 33;
  if (
    top &&
    left &&
    right &&
    bottom &&
    !topLeft &&
    !topRight &&
    !bottomLeft &&
    !bottomRight
  )
    return 34;
  if (!top && !left && !right && bottom) return 53;
  if (top && !left && !right && bottom) return 54;
  if (top && !left && !right && !bottom) return 55;
  if (
    top &&
    left &&
    right &&
    bottom &&
    topLeft &&
    !topRight &&
    !bottomLeft &&
    !bottomRight
  )
    return 34;
  if (
    top &&
    left &&
    right &&
    bottom &&
    !topLeft &&
    topRight &&
    !bottomLeft &&
    !bottomRight
  )
    return 34;
  if (
    top &&
    left &&
    right &&
    bottom &&
    !topLeft &&
    !topRight &&
    bottomLeft &&
    !bottomRight
  )
    return 34;
  if (
    top &&
    left &&
    right &&
    bottom &&
    !topLeft &&
    !topRight &&
    !bottomLeft &&
    bottomRight
  )
    return 34;

  return 30;
}

function getWaterTileNumber(
  x: number,
  y: number,
  tileGrid: Array<Array<[Uint8Array, Float64Array]>>
): number {
  const waterLevel = Math.floor(33 - Math.min(tileGrid[y][x][1][0], 1) * 33);

  if (
    y < tileGrid.length - 1 &&
    y > 0 &&
    x < tileGrid[0].length - 1 &&
    x > 0 &&
    !tileGrid[y - 1][x][1][0] &&
    tileGrid[y + 1][x][1][0] &&
    ((tileGrid[y][x - 1][1][0] &&
      tileGrid[y - 1][x - 1][1][0] &&
      tileGrid[y][x - 1][1][0] < 1 &&
      tileGrid[y - 1][x - 1][1][0] < 1 &&
      tileGrid[y + 1][x + 1][1][0] < 1) ||
      (tileGrid[y][x + 1][1][0] &&
        tileGrid[y - 1][x + 1][1][0] &&
        tileGrid[y][x + 1][1][0] < 1 &&
        tileGrid[y - 1][x + 1][1][0] < 1 &&
        tileGrid[y + 1][x - 1][1][0] < 1))
  ) {
    if (
      tileGrid[y - 1][x - 1][1][0] &&
      tileGrid[y - 1][x + 1][1][0] &&
      (!tileGrid[y][x + 1][1][0] || tileGrid[y][x + 1][0][0]) &&
      (!tileGrid[y][x - 1][1][0] || tileGrid[y][x - 1][0][0])
    ) {
      return 36;
    } else if (tileGrid[y - 1][x - 1][1][0] && !tileGrid[y][x + 1][1][0]) {
      return 35;
    } else if (tileGrid[y - 1][x + 1][1][0] && !tileGrid[y][x - 1][1][0]) {
      return 34;
    }
  }
  if (
    waterLevel <= 1 &&
    (y === 0 || (!tileGrid[y - 1][x][0][0] && !tileGrid[y - 1][x][1][0]))
  ) {
    return 2;
  } else if (y > 0 && tileGrid[y - 1][x][1][0] && !tileGrid[y - 1][x][0][0]) {
    return 0;
  } else {
    return waterLevel;
  }
}

function getTileTextures(): Array<PIXI.Texture> {
  return new Array(63).fill(true).map((_v, i) => {
    const [x, y] = [i % 9, Math.floor(i / 9)];
    return new PIXI.Texture(
      PIXI.Texture.from(`tiles.png`).baseTexture,
      new PIXI.Rectangle(x * 16 + (x + 1), y * 16 + (y + 1), 16, 16)
    );
  });
}

function getWaterTextures(): Array<PIXI.Texture> {
  return new Array(38)
    .fill(true)
    .map(
      (_v, i) =>
        new PIXI.Texture(
          PIXI.Texture.from(`waters.png`).baseTexture,
          new PIXI.Rectangle(i * 16 + (i + 1), 1, 16, 16)
        )
    );
}

export { getTileNumber, getWaterTileNumber, getTileTextures, getWaterTextures };
