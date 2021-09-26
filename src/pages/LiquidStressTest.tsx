import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { getClientSize, setRenderer, setUpdater } from '../utils';
import { createLabel } from '../utils/Label';
import * as Map from '../utils/Map';
import * as LiquidSimulator from '../utils/LiquidSimulator';
import { getWaterTextures, getWaterTileNumber } from '../utils/Tile';
import { TileProperties } from '../interfaces';
import { TILE_SIZE } from '../constants';

const LiquidStressTest = ({
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
      const [x, y] = [Math.floor(_x / TILE_SIZE), Math.floor(_y / TILE_SIZE)];

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
    const { stage } = setRenderer();
    const { container: tileLabelContainer } = createLabel(
      `${width * height} sprites`
    );
    const { container: labelContainer } = createLabel('Click to create water');
    tileLabelContainer.x = Math.round(
      clientWidth / 2 - tileLabelContainer.width / 2
    );
    tileLabelContainer.y = 60;
    labelContainer.x = Math.round(clientWidth / 2 - labelContainer.width / 2);
    labelContainer.y = 80;

    const waterContainer = new PIXI.ParticleContainer(width * height, {
      uvs: true,
      position: false,
    });
    const waterParticleTextures = getWaterTextures();
    const tileSprites: Array<Array<PIXI.Sprite>> = new Array(height)
      .fill(true)
      .map(() => new Array(width));

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
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
      }
    }

    stage.addChild(waterContainer);
    stage.addChild(labelContainer);
    stage.addChild(tileLabelContainer);

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

export default LiquidStressTest;
