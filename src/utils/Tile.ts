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

  if (!top && !left && right && bottom) return 1;
  if (!top && left && right && bottom && !bottomLeft && bottomRight) return 41;
  if (!top && left && right && bottom && !bottomLeft && !bottomRight) return 42;
  if (!top && left && right && bottom && bottomLeft && !bottomRight) return 43;
  if (!top && left && right && bottom) return 2;
  if (!top && left && !right && bottom) return 3;
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
    return 4;
  if (top && left && right && !bottom && !topLeft && topRight) return 51;
  if (top && left && right && !bottom && topLeft && !topRight) return 53;
  if (top && left && right && !bottom && !topLeft && !topRight) return 52;
  if (top && left && right && !bottom) return 5;
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
    return 6;
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
    return 12;
  if (top && !left && right && bottom && !topRight && bottomRight) return 36;
  if (top && !left && right && bottom && !topRight && !bottomRight) return 37;
  if (top && !left && right && bottom && topRight && !bottomRight) return 38;
  if (top && !left && right && bottom) return 11;
  if (top && left && !right && bottom && topLeft && !bottomLeft) return 44;
  if (top && left && !right && bottom && !topLeft && !bottomLeft) return 45;
  if (top && left && !right && bottom && !topLeft && bottomLeft) return 46;
  if (top && left && !right && bottom) return 13;
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
    return 17;
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
    return 18;
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
    return 19;
  if (top && !left && right && !bottom) return 21;
  if (top && left && !right && !bottom) return 23;
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
    return 24;
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
    return 57;
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
    return 27;
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
    return 28;
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
    return 29;
  if (!top && !left && right && !bottom) return 32;
  if (!top && left && right && !bottom) return 33;
  if (!top && left && !right && !bottom) return 34;
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
    return 35;
  if (!top && !left && !right && bottom) return 54;
  if (top && !left && !right && bottom) return 55;
  if (top && !left && !right && !bottom) return 56;
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
    return 35;
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
    return 35;
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
    return 35;
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
    return 35;

  return 31;
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

export { getTileNumber, getWaterTileNumber };
