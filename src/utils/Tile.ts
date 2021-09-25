function getTileNumber(
  x: number,
  y: number,
  grid: Array<Array<[Uint8Array, Float64Array]>>
): number {
  const topLeft =
    y > 0 && x > 0 && grid[y - 1][x - 1][0][0] === grid[y][x][0][0];
  const top = y > 0 && grid[y - 1][x][0][0] === grid[y][x][0][0];
  const topRight =
    y > 0 &&
    x < grid[0].length - 1 &&
    grid[y - 1][x + 1][0][0] === grid[y][x][0][0];
  const left = x > 0 && grid[y][x - 1][0][0] === grid[y][x][0][0];
  const right =
    x < grid[0].length - 1 && grid[y][x + 1][0][0] === grid[y][x][0][0];
  const bottomLeft =
    y < grid.length - 1 &&
    x > 0 &&
    grid[y + 1][x - 1][0][0] === grid[y][x][0][0];
  const bottom =
    y < grid.length - 1 && grid[y + 1][x][0][0] === grid[y][x][0][0];
  const bottomRight =
    y < grid.length - 1 &&
    x < grid[0].length - 1 &&
    grid[y + 1][x + 1][0][0] === grid[y][x + 1][0][0];

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
  grid: Array<Array<[Uint8Array, Float64Array]>>
): number {
  const waterLevel = Math.floor(33 - Math.min(grid[y][x][1][0], 1) * 33);

  if (
    y < grid.length - 1 &&
    y > 0 &&
    x < grid[0].length - 1 &&
    x > 0 &&
    !grid[y - 1][x][1][0] &&
    grid[y + 1][x][1][0] &&
    ((grid[y][x - 1][1][0] &&
      grid[y - 1][x - 1][1][0] &&
      grid[y][x - 1][1][0] < 1 &&
      grid[y - 1][x - 1][1][0] < 1 &&
      grid[y + 1][x + 1][1][0] < 1) ||
      (grid[y][x + 1][1][0] &&
        grid[y - 1][x + 1][1][0] &&
        grid[y][x + 1][1][0] < 1 &&
        grid[y - 1][x + 1][1][0] < 1 &&
        grid[y + 1][x - 1][1][0] < 1))
  ) {
    if (grid[y - 1][x - 1][1][0] && grid[y - 1][x + 1][1][0]) {
      return 36;
    } else if (grid[y - 1][x - 1][1][0] && !grid[y][x + 1][1][0]) {
      return 35;
    } else if (grid[y - 1][x + 1][1][0] && !grid[y][x - 1][1][0]) {
      return 34;
    }
  }
  if (
    waterLevel <= 1 &&
    (y === 0 || (!grid[y - 1][x][0][0] && !grid[y - 1][x][1][0]))
  ) {
    return 2;
  } else if (y > 0 && grid[y - 1][x][1][0]) {
    return 0;
  } else {
    return waterLevel;
  }
}

export { getTileNumber, getWaterTileNumber };
