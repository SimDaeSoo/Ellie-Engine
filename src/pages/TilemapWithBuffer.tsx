import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { setRenderer } from '../utils';
import { drawTiles } from '../utils/Graphics';
import * as Map from '../utils/Map';

const TilemapWithBuffer = ({
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
  }, [setCallback]);

  return <></>;
};

export default TilemapWithBuffer;
