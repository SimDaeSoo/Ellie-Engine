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
  }, []);

  return <></>;
};

export default TilemapWithBuffer;
