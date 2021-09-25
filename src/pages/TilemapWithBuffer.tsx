import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { setRenderer } from '../utils';
import { drawTiles } from '../utils/Graphics';
import * as Map from '../utils/Map';

const TilemapWithBuffer = () => {
  useEffect(() => {
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
    const app: PIXI.Application = setRenderer();
    const graphics = new PIXI.Graphics();

    graphics.clear();
    drawTiles(graphics, grid);

    app.stage.addChild(graphics);
  }, []);

  return <></>;
};

export default TilemapWithBuffer;
