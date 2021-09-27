import * as Map from '../src/core/Map';

onmessage = (e) => {
  const { data } = e;
  const { buffer } = data;
  const [width, height] = Map.getSize(buffer);

  const [x, y] = [0, 0];
  const gridProperties = new Uint8Array(buffer);
  const gridValues = new Float32Array(buffer);
  const bufferIndex = y * width + x;
  const foreground = bufferIndex * 8;
  const background = bufferIndex * 8 + 1;
  const value = bufferIndex * 2 + 1;
  console.log(gridProperties[foreground]);
  console.log(gridProperties[background]);
  console.log(gridValues[value]);
};
