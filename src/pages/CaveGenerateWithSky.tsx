import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { setRenderer, setUpdater } from '../utils';
import { drawTiles } from '../utils/Graphics';
import * as Map from '../utils/Map';
import * as CaveGenerator from '../utils/CaveGenerator';
import { getTileNumber } from '../utils/Tile';

const CaveGenerateWithSky = ({
  setCallback,
}: {
  setCallback: (callback: (x: number, y: number) => void) => void;
}) => {
  useEffect(() => {
    // Set Click Callback
    setCallback((_x: number, _y: number) => {});

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
          liquid: 0.5,
        },
      }
    );
    const tileGrid: Array<Array<[Uint8Array, Float64Array]>> =
      Map.merge(tileBufferGrids);

    // Rendering
    const app: PIXI.Application = setRenderer();
    const graphics = new PIXI.Graphics();
    const background = new PIXI.Sprite(PIXI.Texture.WHITE);
    background.tint = 0x87ceeb;
    background.width = window.innerWidth;
    background.height = window.innerHeight;
    background.cacheAsBitmap = true;

    graphics.clear();
    drawTiles(graphics, tileGrid);

    app.stage.addChild(graphics);

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
                margin: Math.round(height / 8),
              }
            : {
                deathLimit: 4,
                birthLimit: 4,
                clearSky: true,
                margin: Math.round(height / 8),
              }
        );

        graphics.clear();
        drawTiles(graphics, tileGrid);

        stepCount++;
        frames = 0;

        if (stepCount === 10) {
          app.stage.removeChild(graphics);
          app.stage.addChild(background);

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
              sprite.width = 8;
              sprite.height = 8;
              sprite.x = x * 8;
              sprite.y = y * 8;
              tileSprites[y][x] = sprite;
              tileContainer.addChild(sprite);
            }
          }

          app.stage.addChild(tileContainer);
          tileContainer.cacheAsBitmap = true;
        }
      }
    });
  }, [setCallback]);

  return <></>;
};

export default CaveGenerateWithSky;
