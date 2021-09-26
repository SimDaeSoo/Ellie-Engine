import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { getClientSize, setRenderer, setUpdater } from '../utils';
import { createLabel } from '../utils/Label';
import * as Map from '../utils/Map';
import * as CaveGenerator from '../utils/CaveGenerator';
import * as LiquidSimulator from '../utils/LiquidSimulator';
import {
  getTileNumber,
  getTileTextures,
  getWaterTextures,
  getWaterTileNumber,
} from '../utils/Tile';
import { TileProperties } from '../interfaces';
import { TILE_SIZE } from '../constants';

const LiquidSimulation2 = ({
  setCallback,
}: {
  setCallback: (callback: (x: number, y: number) => void) => void;
}) => {
  useEffect(() => {
    // Buffer Tile Map Generate
    const [clientWidth, clientHeight] = getClientSize();
    const width = Math.ceil(clientWidth / TILE_SIZE);
    const height = Math.ceil(clientHeight / TILE_SIZE);
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
              margin: Math.round(height / 6),
            }
          : {
              deathLimit: 4,
              birthLimit: 4,
              clearSky: true,
              margin: Math.round(height / 6),
            }
      );
    }

    // Set Click Callback
    setCallback((_x: number, _y: number) => {
      const [x, y] = [Math.floor(_x / TILE_SIZE), Math.floor(_y / TILE_SIZE)];

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
    const { stage } = setRenderer();
    const { container: labelContainer } = createLabel('Click to create water');
    labelContainer.x = Math.round(clientWidth / 2 - labelContainer.width / 2);
    labelContainer.y = 60;

    // const tileContainer = new PIXI.Container();
    const tileContainer = new PIXI.ParticleContainer(width * height, {
      uvs: true,
      position: false,
    });
    const waterContainer = new PIXI.ParticleContainer(width * height, {
      uvs: true,
      position: false,
      alpha: true,
    });
    const tileParticleTextures = getTileTextures();
    const waterParticleTextures = getWaterTextures();
    const tileSprites: Array<Array<PIXI.Sprite>> = new Array(height)
      .fill(true)
      .map(() => new Array(width));
    const background = new PIXI.Sprite(PIXI.Texture.WHITE);
    background.tint = 0x87ceeb;
    background.width = clientWidth;
    background.height = clientHeight;
    background.cacheAsBitmap = true;
    stage.addChild(background);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (tileGrid[y][x][0][0]) {
          const sprite = new PIXI.Sprite(
            tileParticleTextures[getTileNumber(x, y, tileGrid)]
          );
          sprite.width = TILE_SIZE;
          sprite.height = TILE_SIZE;
          sprite.x = x * TILE_SIZE;
          sprite.y = y * TILE_SIZE;
          tileContainer.addChild(sprite);
        } else {
          const waterTileNumber = tileGrid[y][x][1][0]
            ? getWaterTileNumber(x, y, tileGrid)
            : 37;
          const waterSprite = new PIXI.Sprite(
            waterParticleTextures[waterTileNumber]
          );
          waterSprite.width = TILE_SIZE;
          waterSprite.height = TILE_SIZE;
          waterSprite.x = x * TILE_SIZE;
          waterSprite.y = y * TILE_SIZE;
          tileSprites[y][x] = waterSprite;
          waterContainer.addChild(waterSprite);

          if (tileGrid[y][x][0][1]) {
            const sprite = new PIXI.Sprite(
              tileGrid[y][x][0][1] === 1
                ? tileParticleTextures[60]
                : tileParticleTextures[61]
            );
            sprite.width = TILE_SIZE;
            sprite.height = TILE_SIZE;
            sprite.x = x * TILE_SIZE;
            sprite.y = y * TILE_SIZE;
            tileContainer.addChild(sprite);
          }
        }
      }
    }

    stage.addChild(tileContainer);
    stage.addChild(waterContainer);
    stage.addChild(labelContainer);
    // tileContainer.cacheAsBitmap = true;

    // Update Logic
    const step = LiquidSimulator.stepGenerator(tileGrid, tileGridProperties);

    setUpdater(() => {
      step.next();

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (tileGrid[y][x][0][0]) continue;

          const waterTileNumber = tileGrid[y][x][1][0]
            ? getWaterTileNumber(x, y, tileGrid)
            : 37;
          tileSprites[y][x].texture = waterParticleTextures[waterTileNumber];
          tileSprites[y][x].alpha = Math.min(
            0.4 + tileGrid[y][x][1][0] * 0.1,
            0.8
          );
        }
      }
    });
  }, [setCallback]);

  return <></>;
};

export default LiquidSimulation2;
