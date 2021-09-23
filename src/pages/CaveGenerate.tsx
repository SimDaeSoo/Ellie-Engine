import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { setRenderer, setUpdater } from '../utils';
import { drawTiles } from '../utils/Graphics';
import * as Map from '../utils/Map';
import * as CaveGenerator from '../utils/CaveGenerator';

const CaveGenerate = () => {
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
        }
      });
    })();
  }, []);

  return <></>;
};

export default CaveGenerate;
