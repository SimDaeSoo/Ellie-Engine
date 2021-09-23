import { peakBufferBit, setBufferBit } from './buffer';

function countAliveNeighbours(
  buffer: ArrayBuffer,
  x: number,
  y: number,
  width: number,
  height: number
): number {
  let aliveNeighboursCount = 0;

  for (let offsetY = -1; offsetY <= 1; offsetY++) {
    for (let offsetX = -1; offsetX <= 1; offsetX++) {
      const neighborX: number = x + offsetX;
      const neighborY: number = y + offsetY;
      if (offsetX === 0 && offsetY === 0) {
        continue;
      } else if (
        neighborX < 0 ||
        neighborY < 0 ||
        neighborX >= width ||
        neighborY >= height
      ) {
        aliveNeighboursCount++;
      } else if (peakBufferBit(buffer, neighborX, neighborY, width)) {
        aliveNeighboursCount++;
      }
    }
  }

  return aliveNeighboursCount;
}

function nextStep(
  buffer: ArrayBuffer,
  width: number,
  height: number,
  options: { deathLimit: number; birthLimit: number }
): void {
  const afterBuffer: ArrayBuffer = new ArrayBuffer(buffer.byteLength);
  const { deathLimit, birthLimit } = options;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alives: number = countAliveNeighbours(buffer, x, y, width, height);

      if (peakBufferBit(buffer, x, y, width)) {
        if (alives < birthLimit) {
          setBufferBit(afterBuffer, x, y, width, 0);
        } else {
          setBufferBit(afterBuffer, x, y, width, 1);
        }
      } else {
        if (alives > deathLimit) {
          setBufferBit(afterBuffer, x, y, width, 1);
        } else {
          setBufferBit(afterBuffer, x, y, width, 0);
        }
      }
    }
  }

  for (let i = 0; i < afterBuffer.byteLength; i++) {
    const before = new Uint8Array(buffer, i, 1);
    const after = new Uint8Array(afterBuffer, i, 1);
    before[0] = after[0];
  }
}

export { nextStep };
