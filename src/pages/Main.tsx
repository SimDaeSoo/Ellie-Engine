import { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { BLOCKS, BLOCK_TYPES, MENU_TYPES, TILE_PROPERTY, WORKER_COMMAND } from '../constants';
import Map from '../core/Map';
import MultiThread from '../core/MultiThread';
import Renderer from '../core/Renderer';
import { fillTile } from '../utils';

let menuType = MENU_TYPES.DIRT;
let paused = false;
let border = 12;

const Main = ({
  setMouseEventCallback,
  setMenuSelectCallback,
  setUpdater,
}: {
  setMouseEventCallback: (callback: (x: number, y: number) => void) => void;
  setMenuSelectCallback: (callback: (type: MENU_TYPES) => void) => void;
  setUpdater: (callback: () => void) => void;
}) => {
  const [resolution, setResolution] = useState({ width: 0, height: 0, canvasWidth: 0 });
  useEffect(() => {
    const initialize = async (zoom: number) => {
      const container = document.getElementById('content') as HTMLElement;
      const innerWidth = container.getBoundingClientRect().width;
      const innerHeight = container.getBoundingClientRect().height;
      const splitQuantity = 12;
      const width = Math.ceil(innerWidth / splitQuantity / zoom);
      const height = Math.ceil(innerHeight / splitQuantity / zoom)
      // CPU Thread 가 찐이냐에 따라 달리 넣어야함.;
      const threadQuantity = window.navigator.hardwareConcurrency;
      const threadController = new MultiThread(threadQuantity);
      const map = new Map(0, threadQuantity);
      const renderer = new Renderer('render-canvas', innerWidth, innerHeight, window.devicePixelRatio);

      map.create(0, 0, width, height, splitQuantity);
      setResolution({ height: map.totalHeight, width: map.totalWidth, canvasWidth: innerWidth });

      for (let y = 0; y < map.totalHeight; y++) {
        for (let x = 0; x < map.totalWidth; x++) {
          if (y > Math.floor((map.totalHeight / 5) * 4)) {
            map.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.PEBBLE], Math.floor(171 + Math.random() * 84));
            map.setTileProperties(x, y, TILE_PROPERTY.LIFE, 100);
            map.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
            map.setTileProperties(x, y, TILE_PROPERTY.STABLE, 0);
          } else if (y > Math.floor((map.totalHeight / 5) * 3)) {
            map.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.LAVA], Math.floor(171 + Math.random() * 84));
            map.setTileProperties(x, y, TILE_PROPERTY.LIFE, 60);
            map.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
            map.setTileProperties(x, y, TILE_PROPERTY.STABLE, 0);
          } else if (y > Math.floor((map.totalHeight / 5) * 2)) {
            map.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.DIRT], Math.floor(171 + Math.random() * 84));
            map.setTileProperties(x, y, TILE_PROPERTY.LIFE, 80);
            map.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
            map.setTileProperties(x, y, TILE_PROPERTY.STABLE, 0);
          } else if (y > Math.floor(map.totalHeight / 5) * 1) {
            map.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.WATER], Math.floor(171 + Math.random() * 84));
            map.setTileProperties(x, y, TILE_PROPERTY.LIFE, 100);
            map.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
            map.setTileProperties(x, y, TILE_PROPERTY.STABLE, 0);
          } else {
            map.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.ACID], Math.floor(171 + Math.random() * 84));
            map.setTileProperties(x, y, TILE_PROPERTY.LIFE, 60);
            map.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
            map.setTileProperties(x, y, TILE_PROPERTY.STABLE, 0);
          }
        }
      }

      const textures: Array<Array<PIXI.Texture>> = [];

      for (let y = 0; y < map.tileRgbaView.length; y++) {
        textures.push([]);

        for (let x = 0; x < map.tileRgbaView[y].length; x++) {
          const texture = PIXI.Texture.fromBuffer(map.tileRgbaView[y][x], width, height);
          const sprite = new PIXI.Sprite(texture);

          sprite.x = width * x * zoom;
          sprite.y = height * y * zoom;
          sprite.width = width * zoom;
          sprite.height = height * zoom;

          renderer.app.stage.addChild(sprite);
          textures[y].push(texture);
        }
      }

      await threadController.initialize();
      threadController.run(WORKER_COMMAND.MAP_INITIALIZE, {
        map: map.export(),
      });

      let reverse = false;
      let offset = 0;

      setUpdater(async () => {
        if (!paused) {
          await threadController.run(WORKER_COMMAND.MAP_UPDATE, { offset, reverse });

          if (map.updated) {
            reverse = !reverse;
            offset = Math.floor((Math.random() * (map.totalWidth / (threadQuantity - 1))) / 2);

            for (let y = 0; y < splitQuantity; y++) {
              for (let x = 0; x < splitQuantity; x++) {
                if (map.isDirtyTextureChunk(x, y)) {
                  textures[y][x].update();
                }
              }
            }

            renderer.render();
            map.clean();
          }
        } else {
          for (let y = 0; y < splitQuantity; y++) {
            for (let x = 0; x < splitQuantity; x++) {
              if (map.isDirtyTextureChunk(x, y)) {
                textures[y][x].update();
              }
            }
          }
          renderer.render();
          map.clean();
        }
      });

      setMenuSelectCallback((type: MENU_TYPES) => {
        switch (type) {
          case MENU_TYPES.PLAY: {
            paused = false;
            break;
          }
          case MENU_TYPES.PAUSE: {
            paused = true;
            break;
          }
          case MENU_TYPES.PIXEL_1: {
            border = 0;
            break;
          }
          case MENU_TYPES.PIXEL_3: {
            border = 1;
            break;
          }
          case MENU_TYPES.PIXEL_9: {
            border = 4;
            break;
          }
          case MENU_TYPES.PIXEL_15: {
            border = 7;
            break;
          }
          case MENU_TYPES.PIXEL_25: {
            border = 12;
            break;
          }
          case MENU_TYPES.PIXEL_40: {
            border = 20;
            break;
          }
          case MENU_TYPES.PIXEL_60: {
            border = 30;
            break;
          }
          case MENU_TYPES.PIXEL_100: {
            border = 50;
            break;
          }
          case MENU_TYPES.ZOOM_1: {
            initialize(1);
            break;
          }
          case MENU_TYPES.ZOOM_2: {
            initialize(2);
            break;
          }
          case MENU_TYPES.ZOOM_3: {
            initialize(3);
            break;
          }
          case MENU_TYPES.ZOOM_4: {
            initialize(4);
            break;
          }
          case MENU_TYPES.ZOOM_5: {
            initialize(5);
            break;
          }
          case MENU_TYPES.ZOOM_6: {
            initialize(6);
            break;
          }
          case MENU_TYPES.ZOOM_7: {
            initialize(7);
            break;
          }
          case MENU_TYPES.ZOOM_8: {
            initialize(8);
            break;
          }
          case MENU_TYPES.ZOOM_9: {
            initialize(9);
            break;
          }
          default: {
            menuType = type;
          }
        }
      });

      setMouseEventCallback((_x: number, _y: number) => {
        const [x, y] = [Math.round(_x / zoom), Math.round(_y / zoom)];

        if (x < 0 || x >= map.totalWidth || y < 0 || y >= map.totalHeight) {
          return;
        }

        fillTile(map, x, y, border, menuType);
      });
    };

    initialize(2);
  }, [setMouseEventCallback, setUpdater, setMenuSelectCallback]);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '72px',
          color: '#FFFFFF',
          width: resolution.canvasWidth,
          textAlign: 'center',
        }}
        className='noselect'
      >
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            padding: '1px 4px',
            borderRadius: '4px',
            marginBottom: '2px',
            display: 'inline-block',
          }}
        >
          {resolution.width} x {resolution.height} ({resolution.width * resolution.height} tiles)
          <br />[ {window?.navigator?.hardwareConcurrency || 1} threads ]
        </div>
      </div>
      <canvas id='render-canvas' className='noselect' />
    </>
  );
};

export default Main;
