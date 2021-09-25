import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { setRenderer, setUpdater } from '../utils';
import { createLabel } from '../utils/Label';
import * as Map from '../utils/Map';
import * as LiquidSimulator from '../utils/LiquidSimulator';
import { getWaterTileNumber } from '../utils/Tile';
import { TileProperties } from '../interfaces';

const LiquidStressTest = ({
  setCallback,
}: {
  setCallback: (callback: (x: number, y: number) => void) => void;
}) => {
  useEffect(() => {
    // Buffer Tile Map Generate
    const width = Math.ceil(window.innerWidth / 8);
    const height = Math.ceil(window.innerHeight / 8);
    const tileBufferGrids: Array<Array<ArrayBuffer>> = Map.create(
      width,
      height,
      {
        splitSize: 0,
        clearHeight: 0,
        density: {
          block: 0,
          liquid: 1,
        },
      }
    );
    const tileGrid: Array<Array<[Uint8Array, Float64Array]>> =
      Map.merge(tileBufferGrids);
    const tileGridProperties: Array<Array<TileProperties>> =
      Map.createTileGridProperties(width, height);

    // Set Click Callback
    setCallback((_x: number, _y: number) => {
      const [x, y] = [Math.floor(_x / 8), Math.floor(_y / 8)];

      for (let offsetY = -5; offsetY <= 5; offsetY++) {
        for (let offsetX = -5; offsetX <= 5; offsetX++) {
          if (
            x + offsetX >= 0 &&
            x + offsetX < width &&
            y + offsetY >= 0 &&
            y + offsetY < height &&
            !tileGrid[y + offsetY][x + offsetX][0][0]
          ) {
            tileGrid[y + offsetY][x + offsetX][1][0] += 1;
          }
        }
      }
    });

    // Rendering
    const app: PIXI.Application = setRenderer();
    const { container: labelContainer } = createLabel('Click to create water');
    labelContainer.x = Math.round(
      window.innerWidth / 2 - labelContainer.width / 2
    );
    labelContainer.y = 60;

    const waterContainer = new PIXI.Container();
    const tileSprites: Array<Array<PIXI.Sprite>> = new Array(height)
      .fill(true)
      .map(() => new Array(width));

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const waterTileNumber = getWaterTileNumber(x, y, tileGrid);
        const waterSprite = new PIXI.Sprite(
          waterTileNumber >= 0
            ? PIXI.Texture.from(
                `waters/${waterTileNumber.toString().padStart(2, '0')}.png`
              )
            : PIXI.Texture.EMPTY
        );
        waterSprite.width = 8;
        waterSprite.height = 8;
        waterSprite.x = x * 8;
        waterSprite.y = y * 8;
        tileSprites[y][x] = waterSprite;
        waterContainer.addChild(waterSprite);
      }
    }

    app.stage.addChild(waterContainer);
    app.stage.addChild(labelContainer);

    // Update Logic
    const step = LiquidSimulator.stepGenerator(tileGrid, tileGridProperties);

    setUpdater(() => {
      step.next();

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (!tileGrid[y][x][0][0]) {
            const waterTileNumber = getWaterTileNumber(x, y, tileGrid);
            tileSprites[y][x].texture =
              tileGrid[y][x][1][0] && waterTileNumber >= 0
                ? PIXI.Texture.from(
                    `waters/${waterTileNumber.toString().padStart(2, '0')}.png`
                  )
                : PIXI.Texture.EMPTY;
            tileSprites[y][x].alpha = Math.min(
              0.4 + tileGrid[y][x][1][0] * 0.1,
              0.8
            );
          }
        }
      }
    });
  }, [setCallback]);

  return <></>;
};

export default LiquidStressTest;
