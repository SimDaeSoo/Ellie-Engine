const fs = require('fs');
const TILE_BYTES = 8;

function create(width, height, options: { splitSize?: number } = {}) {
  const { splitSize = 0 } = options;

  if (splitSize === 0) {
    const arrayBuffer = new ArrayBuffer(width * height * TILE_BYTES + 16);

    for (let i = 0; i < width * height; i++) {
      const properties = new Uint8Array(arrayBuffer, i * TILE_BYTES, 4);
      const liquid = new Float32Array(arrayBuffer, i * TILE_BYTES + 4, 1);

      properties[0] = Math.round(Math.random()); // tileType
      properties[1] = 0; // backgroundType
      properties[2] = 0; // liquidType
      properties[3] = 0; // lightingLevel
      liquid[0] = 0;
    }

    const size = new Float64Array(arrayBuffer, arrayBuffer.byteLength - 16, 2);
    size[0] = height; // height
    size[1] = width; // width

    return [[arrayBuffer]];
  } else if (width % splitSize !== 0 || height % splitSize !== 0) {
    throw new Error(
      'width and height must be perfectly was divided by split size'
    );
  } else {
    const arrayBufferGrid = new Array(height / splitSize)
      .fill(true)
      .map(() => new Array(width / splitSize));

    for (let gridY = 0; gridY < height / splitSize; gridY++) {
      for (let gridX = 0; gridX < width / splitSize; gridX++) {
        const arrayBuffer = new ArrayBuffer(splitSize ** 2 * TILE_BYTES + 16);

        for (let i = 0; i < splitSize ** 2; i++) {
          const properties = new Uint8Array(arrayBuffer, i * TILE_BYTES, 4);
          const liquid = new Float32Array(arrayBuffer, i * TILE_BYTES + 4, 1);

          properties[0] = Math.round(Math.random()); // tileType
          properties[1] = 0; // backgroundType
          properties[2] = 0; // liquidType
          properties[3] = 0; // lightingLevel
          liquid[0] = 0;
        }

        const size = new Float64Array(
          arrayBuffer,
          arrayBuffer.byteLength - 16,
          2
        );
        size[0] = splitSize; // height
        size[1] = splitSize; // width

        arrayBufferGrid[gridY][gridX] = arrayBuffer;
      }
    }

    return arrayBufferGrid;
  }
}

function merge(arrayBufferGrid) {
  const size = new Float64Array(
    arrayBufferGrid[0][0],
    arrayBufferGrid[0][0].byteLength - 16,
    2
  );
  const height = size[0];
  const width = size[1];
  const grid = new Array(height * arrayBufferGrid.length)
    .fill(true)
    .map(() => new Array(width * arrayBufferGrid[0].length));

  for (let y = 0; y < grid.length; y++) {
    const [baseY, offsetY] = [Math.floor(y / height), y % height];
    for (let x = 0; x < grid[y].length; x++) {
      const [baseX, offsetX] = [Math.floor(x / width), x % width];

      grid[y][x] = [
        new Uint8Array(
          arrayBufferGrid[baseY][baseX],
          (offsetY * width + offsetX) * TILE_BYTES,
          4
        ),
        new Float32Array(
          arrayBufferGrid[baseY][baseX],
          (offsetY * width + offsetX) * TILE_BYTES + 4,
          1
        ),
      ];
    }
  }

  return grid;
}

function print(grid) {
  for (let y = 0; y < grid.length; y++) {
    const tiles = [];

    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x][0][0]) {
        tiles.push('■');
      } else {
        tiles.push(' ');
      }
    }

    console.log(tiles.toString().replace(/,/g, ' '));
  }
}

function main() {
  const arrayBufferGrid = create(128, 128, { splitSize: 32 });
  const grid = merge(arrayBufferGrid);
  print(grid);
}

function writingTest() {
  // Writing
  const arrayBufferGrid = create(8448, 2432, { splitSize: 64 });

  for (let y = 0; y < arrayBufferGrid.length; y++) {
    for (let x = 0; x < arrayBufferGrid[y].length; x++) {
      fs.writeFileSync(
        `./mapdatas/${y}_${x}.ellie`,
        Buffer.from(arrayBufferGrid[y][x])
      );
    }
  }
}

function readingTest() {
  // Reading
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 2; x++) {
      const buffer = fs.readFileSync(`./mapdatas/${y}_${x}.ellie`);
      const arrayBuffer = new ArrayBuffer(buffer.byteLength);
      const view = new Uint8Array(arrayBuffer);

      for (let i = 0; i < arrayBuffer.byteLength; i++) {
        view[i] = buffer[i];
      }

      const size = new Float64Array(
        arrayBuffer,
        arrayBuffer.byteLength - 16,
        2
      );
      console.log(size[0], size[1]);
    }
  }
}

main();
