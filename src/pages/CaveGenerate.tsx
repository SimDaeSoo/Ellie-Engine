import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { setRenderer, setUpdater } from '../utils';
import { drawTiles } from '../utils/Graphics';
import * as Map from '../utils/Map';
import * as CaveGenerator from '../utils/CaveGenerator';

const CaveGenerate = ({
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
      height
    );
    const tileGrid: Array<Array<[Uint8Array, Float64Array]>> =
      Map.merge(tileBufferGrids);

    // Rendering
    const app: PIXI.Application = setRenderer();
    const graphics = new PIXI.Graphics();

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
            ? { deathLimit: 3, birthLimit: 5 }
            : { deathLimit: 4, birthLimit: 4 }
        );

        graphics.clear();
        drawTiles(graphics, tileGrid);

        stepCount++;
        frames = 0;
      }
    });
  }, [setCallback]);

  return <></>;
};

export default CaveGenerate;
