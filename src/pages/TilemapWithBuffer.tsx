import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { TILE_SIZE } from '../constants';
import { getClientSize, setRenderer } from '../utils';
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
  }, [setCallback]);

  return <></>;
};

export default TilemapWithBuffer;
