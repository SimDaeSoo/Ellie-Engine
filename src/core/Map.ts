import { TILE_BYTES } from '../constants';

function getSize(buffer: SharedArrayBuffer): [number, number] {
  const size = new Float64Array(buffer, buffer.byteLength - 16, 2);
  return [size[0], size[1]];
}

function createGrid<T>(width: number, height: number): Array<Array<T>> {
  return new Array(height).fill(true).map(() => new Array(width));
}

function createTilemapSharedArrayBuffer(
  width: number,
  height: number
): SharedArrayBuffer {
  const buffer = new SharedArrayBuffer(width * height * TILE_BYTES + 16);

  for (let i = 0; i < width * height; i++) {
    const properties = new Uint8Array(buffer, i * TILE_BYTES, 4);
    const value = new Float32Array(buffer, i * TILE_BYTES + 4, 1);
    const tileType = Math.random() < 0.5 ? 1 : 0;

    properties[0] = tileType; // frontground
    properties[1] = 0; // background
    properties[2] = 0; // other property 1
    properties[3] = 0; // other property 2
    value[0] = 0; // tile value
  }

  const size = new Float64Array(buffer, buffer.byteLength - 16, 2);
  size[0] = width; // height
  size[1] = height; // width

  return buffer;
}

function create(
  width: number,
  height: number,
  options: {
    splitWidth: number;
    splitHeight: number;
  }
): Array<Array<SharedArrayBuffer>> {
  const { splitWidth, splitHeight } = options;

  if (!splitWidth || !splitHeight) {
    return [[createTilemapSharedArrayBuffer(width, height)]];
  } else if (width % splitWidth !== 0 || height % splitHeight !== 0) {
    throw new Error(
      'width and height must be perfectly was divided by split size'
    );
  } else {
    const bufferGrid = createGrid<SharedArrayBuffer>(
      height / splitHeight,
      width / splitWidth
    );

    for (let tilemapY = 0; tilemapY < height / splitHeight; tilemapY++) {
      for (let tilemapX = 0; tilemapX < width / splitWidth; tilemapX++) {
        bufferGrid[tilemapY][tilemapX] = createTilemapSharedArrayBuffer(
          splitWidth,
          splitHeight
        );
      }
    }

    return bufferGrid;
  }
}

function merge(
  bufferGrid: Array<Array<SharedArrayBuffer>>
): Array<Array<[Uint8Array, Float32Array]>> {
  const [width, height] = getSize(bufferGrid[0][0]);
  const tileGrid = createGrid<[Uint8Array, Float32Array]>(
    width * bufferGrid[0].length,
    height * bufferGrid.length
  );

  for (let y = 0; y < tileGrid.length; y++) {
    const [baseY, offsetY] = [Math.floor(y / height), y % height];

    for (let x = 0; x < tileGrid[y].length; x++) {
      const [baseX, offsetX] = [Math.floor(x / width), x % width];

      tileGrid[y][x] = [
        new Uint8Array(
          bufferGrid[baseY][baseX],
          (offsetY * width + offsetX) * TILE_BYTES,
          4
        ),
        new Float32Array(
          bufferGrid[baseY][baseX],
          (offsetY * width + offsetX) * TILE_BYTES + 4,
          1
        ),
      ];
    }
  }

  return tileGrid;
}

export { create, merge };
