// https://gamedevelopment.tutsplus.com/tutorials/generate-random-cave-levels-using-cellular-automata--gamedev-9664

function countAliveNeighbours(
  x: number,
  y: number,
  tileGrid: Array<Array<[Uint8Array, Float64Array]>>,
  length: number = 1,
  edgeCounting: boolean = true,
  index: number = 0
): number {
  let aliveNeighbours = 0;

  for (let offsetY = -length; offsetY <= length; offsetY++) {
    for (let offsetX = -length; offsetX <= length; offsetX++) {
      const neighborX: number = x + offsetX;
      const neighborY: number = y + offsetY;

      if (
        edgeCounting &&
        !(offsetX === 0 && offsetY === 0) &&
        (neighborX < 0 ||
          neighborY < 0 ||
          neighborX >= tileGrid[0].length ||
          neighborY >= tileGrid.length)
      ) {
        aliveNeighbours++;
      } else if (
        !(offsetX === 0 && offsetY === 0) &&
        neighborX >= 0 &&
        neighborY >= 0 &&
        neighborX < tileGrid[0].length &&
        neighborY < tileGrid.length &&
        tileGrid[neighborY][neighborX][0][index]
      ) {
        aliveNeighbours++;
      }
    }
  }

  return aliveNeighbours;
}

function nextStep(
  tileGrid: Array<Array<[Uint8Array, Float64Array]>>,
  options: {
    deathLimit: number;
    birthLimit: number;
    clearSky: boolean;
    margin: number;
  }
): void {
  const afterGrid: Array<Array<boolean>> = new Array(tileGrid.length)
    .fill(true)
    .map(() => new Array(tileGrid[0].length).fill(false));
  const { deathLimit, birthLimit, clearSky, margin } = options;

  for (let y = 0; y < tileGrid.length; y++) {
    for (let x = 0; x < tileGrid[0].length; x++) {
      const alives: number = countAliveNeighbours(
        x,
        y,
        tileGrid,
        1,
        clearSky ? y > birthLimit : true
      );

      if (tileGrid[y][x][0][0]) {
        if (alives < birthLimit) {
          afterGrid[y][x] = false;
        } else {
          afterGrid[y][x] = true;
        }
      } else {
        if (alives > deathLimit) {
          afterGrid[y][x] = true;
        } else {
          afterGrid[y][x] = false;
        }
      }
    }
  }

  let baseY: number = 0;

  for (let y = 0; y < afterGrid.length; y++) {
    for (let x = 0; x < afterGrid[0].length; x++) {
      const alives = countAliveNeighbours(x, y, tileGrid, 1, false, 1);
      if (!baseY && alives) baseY = y + margin;

      tileGrid[y][x][0][0] = afterGrid[y][x] ? 1 : 0;
      tileGrid[y][x][0][1] = tileGrid[y][afterGrid[0].length - 1 - x][0][0]
        ? 1
        : alives > 4
        ? 1
        : 0;
      if (
        baseY &&
        baseY <= y &&
        !tileGrid[y][afterGrid[0].length - 1 - x][0][0]
      ) {
        tileGrid[y][x][0][1] = 2;
      }
    }
  }
}

export { nextStep };
