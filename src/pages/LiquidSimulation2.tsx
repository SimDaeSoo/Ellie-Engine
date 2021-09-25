import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { setRenderer, setUpdater } from '../utils';
import { createLabel } from '../utils/Label';
import * as Map from '../utils/Map';
import * as CaveGenerator from '../utils/CaveGenerator';
import * as LiquidSimulator from '../utils/LiquidSimulator';
import { getTileNumber, getWaterTileNumber } from '../utils/Tile';
import { TileProperties } from '../interfaces';

const LiquidSimulation2 = ({
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
        clearHeight: Math.round(height / 4),
        density: {
          block: 0.5,
          liquid: 0,
        },
      }
    );
    const tileGrid: Array<Array<[Uint8Array, Float64Array]>> =
      Map.merge(tileBufferGrids);
    const tileGridProperties: Array<Array<TileProperties>> =
      Map.createTileGridProperties(width, height);

    for (let i = 0; i < 10; i++) {
      CaveGenerator.nextStep(
        tileGrid,
        i < 4
          ? {
              deathLimit: 3,
              birthLimit: 5,
              clearSky: true,
              margin: Math.round(height / 8),
            }
          : {
              deathLimit: 4,
              birthLimit: 4,
              clearSky: true,
              margin: Math.round(height / 8),
            }
      );
    }

    // Set Click Callback
    setCallback((_x: number, _y: number) => {
      const [x, y] = [Math.floor(_x / 8), Math.floor(_y / 8)];

      for (let offsetY = -3; offsetY <= 3; offsetY++) {
        for (let offsetX = -3; offsetX <= 3; offsetX++) {
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

    const backgroundContainer = new PIXI.Container();
    const tileContainer = new PIXI.Container();
    const waterContainer = new PIXI.Container();
    const tileSprites: Array<Array<PIXI.Sprite>> = new Array(height)
      .fill(true)
      .map(() => new Array(width));
    const background = new PIXI.Sprite(PIXI.Texture.WHITE);
    background.tint = 0x87ceeb;
    background.width = window.innerWidth;
    background.height = window.innerHeight;
    background.cacheAsBitmap = true;
    app.stage.addChild(background);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (tileGrid[y][x][0][0]) {
          const sprite = new PIXI.Sprite(
            PIXI.Texture.from(
              `tiles/Tile_${getTileNumber(x, y, tileGrid)
                .toString()
                .padStart(2, '0')}.png`
            )
          );
          sprite.width = 8;
          sprite.height = 8;
          sprite.x = x * 8;
          sprite.y = y * 8;
          tileSprites[y][x] = sprite;
          tileContainer.addChild(sprite);
        } else {
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

          if (tileGrid[y][x][0][1]) {
            const sprite = new PIXI.Sprite(
              tileGrid[y][x][0][1] === 1
                ? PIXI.Texture.from(`tiles/Tile_61.png`)
                : tileGrid[y][x][0][1] === 2
                ? PIXI.Texture.from(`tiles/Tile_62.png`)
                : PIXI.Texture.EMPTY
            );
            sprite.width = 8;
            sprite.height = 8;
            sprite.x = x * 8;
            sprite.y = y * 8;
            backgroundContainer.addChild(sprite);
          }
        }
      }
    }

    app.stage.addChild(backgroundContainer);
    app.stage.addChild(tileContainer);
    app.stage.addChild(waterContainer);
    app.stage.addChild(labelContainer);

    backgroundContainer.cacheAsBitmap = true;
    tileContainer.cacheAsBitmap = true;

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

export default LiquidSimulation2;
