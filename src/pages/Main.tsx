import { useEffect, useState } from 'react';
import { MENU_TYPES, WORKER_COMMAND } from '../constants';
import Map from '../core/Map';
import MultiThread from '../core/MultiThread';
import Renderer from '../core/Renderer';
import { fragmentShaderGLSL, vertexShaderGLSL } from '../shaders/PixelShader';
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
  const [resolution, setResolution] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const initialize = async (zoom: number) => {
      // Container Settings
      const container = document.getElementById('content') as HTMLElement;
      const innerWidth = container.getBoundingClientRect().width;
      const innerHeight = container.getBoundingClientRect().height;

      // Each Map Block Resolution
      const splitQuantity = 1;
      const width = Math.ceil(innerWidth / splitQuantity / zoom);
      const height = Math.ceil(innerHeight / splitQuantity / zoom);

      // Create Map
      const map = new Map(0, 1);
      map.create(0, 0, width, height, splitQuantity);

      // Test
      setResolution({ height: map.totalHeight, width: map.totalWidth });

      // Set Multi Thread Controller
      const threadQuantity = window.navigator.hardwareConcurrency;
      const threadController = new MultiThread(threadQuantity);
      await threadController.initialize();
      threadController.run(WORKER_COMMAND.MAP_INITIALIZE, {
        map: map.export(),
      });

      // Set Renderer
      const renderer = new Renderer('WEB_GL_CANVAS', innerWidth, innerHeight);
      const vertexShader = renderer.createVertexShader(vertexShaderGLSL);
      const fragmentShader = renderer.createFragmentShader(fragmentShaderGLSL);
      const program = renderer.createProgram(vertexShader, fragmentShader);

      renderer.setViewport(0, 0, width * splitQuantity * zoom, height * splitQuantity * zoom);
      renderer.useProgram(program);
      renderer.setPixelsRenderer(program, width * zoom, height * zoom, splitQuantity);
      renderer.deleteProgram(program);

      let reverse = false;
      setUpdater(async () => {
        if (!paused) {
          reverse = !reverse;

          await threadController.run(WORKER_COMMAND.MAP_UPDATE, {
            offset: Math.floor((Math.random() * (map.totalWidth / (threadQuantity - 1))) / 2),
            reverse,
          });

          map.updateChunks();
        }

        // Render
        renderer.clear(0, 0, 0, 0);
        renderer.pixelsRendering(map.tileRgbaView, width, height);
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

    initialize(3);
  }, [setMouseEventCallback, setUpdater, setMenuSelectCallback]);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '72px',
          color: '#FFFFFF',
          width: '100%',
          textAlign: 'center',
        }}
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
      <canvas id='WEB_GL_CANVAS' className='noselect' />
    </>
  );
};

export default Main;
