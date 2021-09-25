function getDefaultLightings(
  width: number,
  height: number,
  tileSize: number,
  lightingHeight: number,
  lightingDecrease: number,
  defaultLighting: number = 1
): Array<[[[number, number], [number, number]], number]> {
  const lightings: Array<[[[number, number], [number, number]], number]> = [];

  lightings.push([
    [
      [0, 0],
      [width * tileSize, lightingHeight * tileSize],
    ],
    defaultLighting,
  ]);

  for (let y = lightingHeight; y < height; y++) {
    const value = Math.max(
      0,
      defaultLighting - (y - lightingHeight + 1) * lightingDecrease
    );
    if (value) {
      lightings.push([
        [
          [0, y * tileSize],
          [width * tileSize, tileSize],
        ],
        value,
      ]);
    }
  }

  return lightings;
}

export { getDefaultLightings };
