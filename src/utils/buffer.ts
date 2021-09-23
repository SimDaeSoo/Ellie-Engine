function peakBufferBit(
  buffer: ArrayBuffer,
  x: number,
  y: number,
  width: number
): boolean {
  const bytes = new Uint8Array(
    buffer,
    y * Math.ceil(width / 8) + Math.floor(x / 8),
    1
  );
  return !!(bytes[0] & (1 << x % 8));
}

function setBufferBit(
  buffer: ArrayBuffer,
  x: number,
  y: number,
  width: number,
  value: 1 | 0
): void {
  const bytes = new Uint8Array(
    buffer,
    y * Math.ceil(width / 8) + Math.floor(x / 8),
    1
  );

  if (value === 1) {
    bytes[0] = bytes[0] | (1 << x % 8);
  } else {
    bytes[0] = bytes[0] & (255 ^ (1 << x % 8));
  }
}

export { peakBufferBit, setBufferBit };
