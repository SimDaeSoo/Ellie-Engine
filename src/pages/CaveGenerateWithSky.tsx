import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { getClientSize, setRenderer, setUpdater } from '../utils';
import { drawTiles } from '../utils/Graphics';
import * as Map from '../utils/Map';
import * as CaveGenerator from '../utils/CaveGenerator';
import { getTileNumber } from '../utils/Tile';
import { TILE_SIZE } from '../constants';

const CaveGenerateWithSky = ({
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
          liquid: 0.5,
        },
      }
    );
    const tileGrid: Array<Array<[Uint8Array, Float64Array]>> =
      Map.merge(tileBufferGrids);

    // Rendering
    const { stage } = setRenderer();
    const graphics = new PIXI.Graphics();
    const background = new PIXI.Sprite(PIXI.Texture.WHITE);
    background.tint = 0x87ceeb;
    background.width = clientWidth;
    background.height = clientHeight;
    background.cacheAsBitmap = true;

    graphics.clear();
    drawTiles(graphics, tileGrid);

    stage.addChild(graphics);

    // Update Logic
    let frames = 0;
    let stepCount = 0;
    setUpdater(() => {
      if (frames++ >= 10 && stepCount < 10) {
        CaveGenerator.nextStep(
          tileGrid,
          stepCount < 4
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

        graphics.clear();
        drawTiles(graphics, tileGrid);

        stepCount++;
        frames = 0;

        if (stepCount === 10) {
          stage.removeChild(graphics);
          stage.addChild(background);

          const tileContainer = new PIXI.Container();
          const tileSprites: Array<Array<PIXI.Sprite>> = new Array(height)
            .fill(true)
            .map(() => new Array(width));

          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const sprite = new PIXI.Sprite(
                tileGrid[y][x][0][0]
                  ? PIXI.Texture.from(
                      `tiles/Tile_${getTileNumber(x, y, tileGrid)
                        .toString()
                        .padStart(2, '0')}.png`
                    )
                  : tileGrid[y][x][0][1] === 1
                  ? PIXI.Texture.from(`tiles/Tile_61.png`)
                  : tileGrid[y][x][0][1] === 2
                  ? PIXI.Texture.from(`tiles/Tile_62.png`)
                  : PIXI.Texture.EMPTY
              );
              sprite.width = TILE_SIZE;
              sprite.height = TILE_SIZE;
              sprite.x = x * TILE_SIZE;
              sprite.y = y * TILE_SIZE;
              tileSprites[y][x] = sprite;
              tileContainer.addChild(sprite);
            }
          }

          stage.addChild(tileContainer);
          tileContainer.cacheAsBitmap = true;
        }
      }
    });
  }, [setCallback]);

  return <></>;
};

export default CaveGenerateWithSky;
