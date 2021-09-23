import * as PIXI from 'pixi.js';
import { useState, useEffect } from 'react';
import { Progress } from 'rsuite';
import { preload, setRenderer, setUpdater } from '../utils';
import * as Map from '../utils/Map';
import * as CaveGenerator from '../utils/CaveGenerator';
import * as LiquidSimulator from '../utils/LiquidSimulator';
import { getTileNumber, getWaterTileNumber } from '../utils/Tile';

const LiquidSimulation = () => {
  const [percentage, setPercentage] = useState(0);
  const [asset, setAsset] = useState('');
  const [hide, setHide] = useState(false);

  useEffect(() => {
    (async () => {
      // Buffer Tile Map Generate
      const width = Math.ceil(window.innerWidth / 8);
      const height = Math.ceil(window.innerHeight / 8);
      const arrayBufferGrid: Array<Array<ArrayBuffer>> = Map.create(
        width,
        height,
        {
          splitSize: 0,
          density: {
            block: 0.5,
            liquid: 0.5,
          },
        }
      );
      const grid: Array<Array<[Uint8Array, Float64Array]>> =
        Map.merge(arrayBufferGrid);

      for (let i = 0; i < 10; i++) {
        CaveGenerator.nextStep(
          grid,
          i < 4
            ? { deathLimit: 3, birthLimit: 5 }
            : { deathLimit: 4, birthLimit: 4 }
        );
      }

      // Rendering
      const app: PIXI.Application = setRenderer();
      await preload((percentage: number, assetName: string) => {
        setPercentage(Math.floor(percentage * 100));
        setAsset(assetName);
      });
      setHide(true);
      const backgroundContainer = new PIXI.Container();
      const tileContainer = new PIXI.Container();
      const waterContainer = new PIXI.Container();
      const tileSprites: Array<Array<PIXI.Sprite>> = new Array(height)
        .fill(true)
        .map(() => new Array(width));

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (grid[y][x][0][0]) {
            const sprite = new PIXI.Sprite(
              PIXI.Texture.from(
                `tiles/Tile_${getTileNumber(x, y, grid)
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
            const waterTileNumber = getWaterTileNumber(x, y, grid);
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

            const sprite = new PIXI.Sprite(
              PIXI.Texture.from(`tiles/Tile_61.png`)
            );
            sprite.width = 8;
            sprite.height = 8;
            sprite.x = x * 8;
            sprite.y = y * 8;
            backgroundContainer.addChild(sprite);
          }
        }
      }

      app.stage.addChild(backgroundContainer);
      app.stage.addChild(tileContainer);
      app.stage.addChild(waterContainer);

      backgroundContainer.cacheAsBitmap = true;
      tileContainer.cacheAsBitmap = true;

      // Update Logic
      setUpdater(() => {
        LiquidSimulator.nextStep(grid);

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            if (!grid[y][x][0][0]) {
              const waterTileNumber = getWaterTileNumber(x, y, grid);
              tileSprites[y][x].texture =
                grid[y][x][1][0] && waterTileNumber >= 0
                  ? PIXI.Texture.from(
                      `waters/${waterTileNumber
                        .toString()
                        .padStart(2, '0')}.png`
                    )
                  : PIXI.Texture.EMPTY;
              tileSprites[y][x].alpha = Math.min(
                0.3 + grid[y][x][1][0] * 0.15,
                0.8
              );
            }
          }
        }
      });
    })();
  }, []);

  return (
    <>
      {
        <div
          style={{
            width: '100%',
            position: 'absolute',
            bottom: '20px',
            opacity: hide ? 0 : 1,
            transitionProperty: 'opacity',
            transitionDuration: '1s',
          }}
        >
          <div
            style={{ width: '100%', textAlign: 'center' }}
            className='noselect'
          >
            Loading Asset : {asset}
          </div>
          <Progress.Line
            percent={percentage}
            status={percentage === 100 ? 'success' : 'active'}
          />
        </div>
      }
    </>
  );
};

export default LiquidSimulation;
