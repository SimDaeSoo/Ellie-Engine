import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { getClientSize, setRenderer, setUpdater } from '../utils';
import { drawTiles } from '../utils/Graphics';
import * as Map from '../utils/Map';
import * as CaveGenerator from '../utils/CaveGenerator';
import { getTileNumber, getTileTextures } from '../utils/Tile';
import { TILE_SIZE } from '../constants';

const CaveGenerateWithTexture = ({
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
      height
    );
    const tileGrid: Array<Array<[Uint8Array, Float64Array]>> =
      Map.merge(tileBufferGrids);

    // Rendering
    const { stage } = setRenderer();
    const graphics = new PIXI.Graphics();

    graphics.clear();
    drawTiles(graphics, tileGrid, TILE_SIZE);

    stage.addChild(graphics);

    // Update Logic
    let frames = 0;
    let stepCount = 0;
    setUpdater(() => {
      if (frames++ >= 10 && stepCount < 10) {
        CaveGenerator.nextStep(
          tileGrid,
          stepCount < 4
            ? { deathLimit: 3, birthLimit: 5, clearSky: false, margin: 0 }
            : { deathLimit: 4, birthLimit: 4, clearSky: false, margin: 0 }
        );

        graphics.clear();
        drawTiles(graphics, tileGrid, TILE_SIZE);

        stepCount++;
        frames = 0;

        if (stepCount === 10) {
          stage.removeChild(graphics);

          // const tileContainer = new PIXI.Container();
          const tileContainer = new PIXI.ParticleContainer(width * height * 2, {
            uvs: true,
            position: false,
          });
          const tileParticleTextures = getTileTextures();

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
              } else if (tileGrid[y][x][0][1]) {
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

          stage.addChild(tileContainer);
          // tileContainer.cacheAsBitmap = true;
        }
      }
    });
  }, [setCallback]);

  return <></>;
};

export default CaveGenerateWithTexture;
