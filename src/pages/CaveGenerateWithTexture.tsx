import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { setRenderer, setUpdater } from '../utils';
import { drawTiles } from '../utils/Graphics';
import * as Map from '../utils/Map';
import * as CaveGenerator from '../utils/CaveGenerator';
import { getTileNumber } from '../utils/Tile';

const CaveGenerateWithTexture = () => {
  useEffect(() => {
    (async () => {
      // Buffer Tile Map Generate
      const width = Math.ceil(window.innerWidth / 8);
      const height = Math.ceil(window.innerHeight / 8);
      const arrayBufferGrid: Array<Array<ArrayBuffer>> = Map.create(
        width,
        height
      );
      const grid: Array<Array<[Uint8Array, Float64Array]>> =
        Map.merge(arrayBufferGrid);

      // Rendering
      const app: PIXI.Application = await setRenderer();
      const graphics = new PIXI.Graphics();

      graphics.clear();
      drawTiles(graphics, grid);

      app.stage.addChild(graphics);

      // Update Logic
      let frames = 0;
      let stepCount = 0;
      setUpdater(() => {
        if (frames++ >= 10 && stepCount < 10) {
          CaveGenerator.nextStep(
            grid,
            stepCount < 4
              ? { deathLimit: 3, birthLimit: 5 }
              : { deathLimit: 4, birthLimit: 4 }
          );

          graphics.clear();
          drawTiles(graphics, grid);

          stepCount++;
          frames = 0;

          if (stepCount === 10) {
            app.stage.removeChild(graphics);

            const tileContainer = new PIXI.Container();
            const tileSprites: Array<Array<PIXI.Sprite>> = new Array(height)
              .fill(true)
              .map(() => new Array(width));

            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                const sprite = new PIXI.Sprite(
                  grid[y][x][0][0]
                    ? PIXI.Texture.from(
                        `tiles/Tile_${getTileNumber(x, y, grid)
                          .toString()
                          .padStart(2, '0')}.png`
                      )
                    : PIXI.Texture.from(`tiles/Tile_61.png`)
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
    })();
  }, []);

  return <></>;
};

export default CaveGenerateWithTexture;
