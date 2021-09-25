import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { getClientSize, setRenderer } from '../utils';
import * as Map from '../utils/Map';
import * as CaveGenerator from '../utils/CaveGenerator';
import { getTileNumber } from '../utils/Tile';
import { getDefaultLightings } from '../utils/Lighting';
import { TILE_SIZE } from '../constants';

const DefaultLighting = ({
  setCallback,
}: {
  setCallback: (callback: (x: number, y: number) => void) => void;
}) => {
  useEffect(() => {
    // Set Click Callback
    setCallback((_x: number, _y: number) => {});

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
          liquid: 0.3,
        },
      }
    );
    const tileGrid: Array<Array<[Uint8Array, Float64Array]>> =
      Map.merge(tileBufferGrids);

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

    // Rendering
    const { stage, lightContainer } = setRenderer({ defaultLighting: false });
    const tileContainer = new PIXI.Container();
    const background = new PIXI.Sprite(PIXI.Texture.WHITE);
    const defaultLightingGraphic = new PIXI.Graphics();
    background.tint = 0x87ceeb;
    background.width = clientWidth;
    background.height = clientHeight;
    background.cacheAsBitmap = true;

    const defaultLightings = getDefaultLightings(
      width,
      height,
      TILE_SIZE,
      Math.round(height / 3),
      2 / Math.round((height / 4) * 3)
    );

    for (const defaultLighting of defaultLightings) {
      const [area, value] = defaultLighting;
      defaultLightingGraphic.beginFill(0xffffff, value);
      defaultLightingGraphic.drawRect(...area[0], ...area[1]);
      defaultLightingGraphic.endFill();
    }

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
          sprite.width = TILE_SIZE;
          sprite.height = TILE_SIZE;
          sprite.x = x * TILE_SIZE;
          sprite.y = y * TILE_SIZE;
          tileContainer.addChild(sprite);
        } else if (tileGrid[y][x][0][1]) {
          const sprite = new PIXI.Sprite(
            tileGrid[y][x][0][1] === 1
              ? PIXI.Texture.from(`tiles/Tile_61.png`)
              : tileGrid[y][x][0][1] === 2
              ? PIXI.Texture.from(`tiles/Tile_62.png`)
              : PIXI.Texture.EMPTY
          );
          sprite.width = TILE_SIZE;
          sprite.height = TILE_SIZE;
          sprite.x = x * TILE_SIZE;
          sprite.y = y * TILE_SIZE;
          tileContainer.addChild(sprite);
        }
      }
    }

    stage.addChild(background);
    stage.addChild(tileContainer);
    lightContainer.addChild(defaultLightingGraphic);

    tileContainer.cacheAsBitmap = true;
    defaultLightingGraphic.cacheAsBitmap = true;
  }, [setCallback]);

  return <></>;
};

export default DefaultLighting;
