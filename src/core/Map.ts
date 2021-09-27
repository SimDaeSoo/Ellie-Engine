import { TILE_BYTES } from '../constants';

function getSize(buffer: SharedArrayBuffer): [number, number] {
  const size = new Float64Array(buffer, buffer.byteLength - 16, 2);
  return [size[0], size[1]];
}

function create(width: number, height: number): SharedArrayBuffer {
  const buffer = new SharedArrayBuffer(width * height * TILE_BYTES + 16);

  for (let i = 0; i < width * height; i++) {
    const properties = new Uint8Array(buffer, i * TILE_BYTES, 4);
    const value = new Float32Array(buffer, i * TILE_BYTES + 4, 1);
    const foreground = Math.random() < 0.5 ? 1 : 0;

    properties[0] = foreground; // frontground
    properties[1] = 1; // background
    properties[2] = 2; // other property 1
    properties[3] = 3; // other property 2
    value[0] = 100; // tile value
  }

  const size = new Float64Array(buffer, buffer.byteLength - 16, 2);
  size[0] = width; // height
  size[1] = height; // width

  return buffer;
}

export { create, getSize };
