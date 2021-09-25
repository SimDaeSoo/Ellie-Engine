import { TileProperties } from '../interfaces';

const TILE_BYTES = 8;

function create(
  width: number,
  height: number,
  options?: {
    splitSize: number;
    density: {
      block: number;
      liquid: number;
    };
  }
): Array<Array<ArrayBuffer>> {
  const { splitSize = 0, density = { block: 0.5, liquid: 0.5 } } =
    options || {};

  if (splitSize === 0) {
    const arrayBuffer = new ArrayBuffer(width * height * TILE_BYTES + 16);

    for (let i = 0; i < width * height; i++) {
      const properties = new Uint8Array(arrayBuffer, i * TILE_BYTES, 4);
      const liquid = new Float32Array(arrayBuffer, i * TILE_BYTES + 4, 1);
      const tileType = Math.random() < density.block ? 1 : 0;

      properties[0] = tileType; // tileType
      properties[1] = 0; // backgroundType
      properties[2] = 0; // liquidType
      properties[3] = 0; // lightingLevel
      liquid[0] = tileType === 0 && Math.random() < density.liquid ? 1 : 0; // liquid
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

    for (let tileGridY = 0; tileGridY < height / splitSize; tileGridY++) {
      for (let tileGridX = 0; tileGridX < width / splitSize; tileGridX++) {
        const arrayBuffer = new ArrayBuffer(splitSize ** 2 * TILE_BYTES + 16);

        for (let i = 0; i < splitSize ** 2; i++) {
          const properties = new Uint8Array(arrayBuffer, i * TILE_BYTES, 4);
          const liquid = new Float32Array(arrayBuffer, i * TILE_BYTES + 4, 1);
          const tileType = Math.random() < density.block ? 1 : 0;

          properties[0] = tileType; // tileType
          properties[1] = 0; // backgroundType
          properties[2] = 0; // liquidType
          properties[3] = 0; // lightingLevel
          liquid[0] = tileType === 0 && Math.random() < density.liquid ? 1 : 0; // liquid
        }

        const size = new Float64Array(
          arrayBuffer,
          arrayBuffer.byteLength - 16,
          2
        );
        size[0] = splitSize; // height
        size[1] = splitSize; // width

        arrayBufferGrid[tileGridY][tileGridX] = arrayBuffer;
      }
    }

    return arrayBufferGrid;
  }
}

function merge(
  arrayBufferGrid: Array<Array<ArrayBuffer>>
): Array<Array<[Uint8Array, Float64Array]>> {
  const size = new Float64Array(
    arrayBufferGrid[0][0],
    arrayBufferGrid[0][0].byteLength - 16,
    2
  );
  const height = size[0];
  const width = size[1];
  const tileGrid = new Array(height * arrayBufferGrid.length)
    .fill(true)
    .map(() => new Array(width * arrayBufferGrid[0].length));

  for (let y = 0; y < tileGrid.length; y++) {
    const [baseY, offsetY] = [Math.floor(y / height), y % height];
    for (let x = 0; x < tileGrid[y].length; x++) {
      const [baseX, offsetX] = [Math.floor(x / width), x % width];

      tileGrid[y][x] = [
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

  return tileGrid;
}

function createTileGridProperties(
  width: number,
  height: number
): Array<Array<TileProperties>> {
  const tileGridProperties: Array<Array<TileProperties>> = new Array(height)
    .fill(true)
    .map(() =>
      new Array(width)
        .fill(true)
        .map(() => ({ diff: 0, isStable: false, stableLevel: 0 }))
    );

  return tileGridProperties;
}

export { create, merge, createTileGridProperties };
