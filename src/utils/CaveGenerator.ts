// https://gamedevelopment.tutsplus.com/tutorials/generate-random-cave-levels-using-cellular-automata--gamedev-9664

function countAliveNeighbours(
  x: number,
  y: number,
  tileGrid: Array<Array<[Uint8Array, Float64Array]>>
): number {
  let aliveNeighbours = 0;

  for (let offsetY = -1; offsetY <= 1; offsetY++) {
    for (let offsetX = -1; offsetX <= 1; offsetX++) {
      const neighborX: number = x + offsetX;
      const neighborY: number = y + offsetY;

      if (offsetX === 0 && offsetY === 0) {
      } else if (
        neighborX < 0 ||
        neighborY < 0 ||
        neighborX >= tileGrid[0].length ||
        neighborY >= tileGrid.length
      ) {
        aliveNeighbours++;
      } else if (tileGrid[neighborY][neighborX][0][0]) {
        aliveNeighbours++;
      }
    }
  }

  return aliveNeighbours;
}

function nextStep(
  tileGrid: Array<Array<[Uint8Array, Float64Array]>>,
  options: { deathLimit: number; birthLimit: number }
): void {
  const afterGrid: Array<Array<boolean>> = new Array(tileGrid.length)
    .fill(true)
    .map(() => new Array(tileGrid[0].length).fill(false));
  const { deathLimit, birthLimit } = options;

  for (let y = 0; y < tileGrid.length; y++) {
    for (let x = 0; x < tileGrid[0].length; x++) {
      let alives: number = countAliveNeighbours(x, y, tileGrid);

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

  for (let y = 0; y < afterGrid.length; y++) {
    for (let x = 0; x < afterGrid[0].length; x++) {
      tileGrid[y][x][0][0] = afterGrid[y][x] ? 1 : 0;
    }
  }
}

export { nextStep };
