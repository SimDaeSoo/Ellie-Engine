import { useEffect } from 'react';
import { MENU_TYPES, WORKER_COMMAND } from '../constants';
import Map from '../core/Map';
import MultiThread from '../core/MultiThread';
import Renderer from '../core/Renderer';
import { fragmentShaderGLSL, vertexShaderGLSL } from '../shaders/PixelShader';
import { fillTile } from '../utils';

let menuType = MENU_TYPES.DIRT;
let paused = false;
let border = 0;

const Main = ({
  setMouseEventCallback,
  setMenuSelectCallback,
  setUpdater,
}: {
  setMouseEventCallback: (callback: (x: number, y: number) => void) => void;
  setMenuSelectCallback: (callback: (type: MENU_TYPES) => void) => void;
  setUpdater: (callback: () => void) => void;
}) => {
  useEffect(() => {
    const initialize = async (zoom: number) => {
      // Container Settings
      const container = document.getElementById('content') as HTMLElement;
      const innerWidth = container.getBoundingClientRect().width;
      const innerHeight = container.getBoundingClientRect().height;

      // Each Map Block Resolution
      const splitQuantity = 1;
      const width = Math.round(innerWidth / splitQuantity / zoom);
      const height = Math.round(innerHeight / splitQuantity / zoom);

      // Create Map
      const map = new Map();
      map.create(0, 0, width, height, splitQuantity);

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

      renderer.setViewport(
        0,
        0,
        width * splitQuantity * zoom,
        height * splitQuantity * zoom
      );
      renderer.useProgram(program);
      renderer.setPixelsRenderer(
        program,
        width * zoom,
        height * zoom,
        splitQuantity
      );
      renderer.deleteProgram(program);

      setUpdater(async () => {
        if (!paused) {
          await threadController.run(WORKER_COMMAND.MAP_PROCESSING, {
            map: map.export(),
          });
        }

        // Render
        renderer.clear(0, 0, 0, 0);
        renderer.pixelsRendering(map.tileTypeProperties, width, height);
      });

      setMenuSelectCallback((type: MENU_TYPES) => {
        switch (type) {
          case MENU_TYPES.CLEAR: {
            threadController.run(WORKER_COMMAND.MAP_CLEAR, {});
            break;
          }
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
          case MENU_TYPES.PIXEL_5: {
            border = 2;
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
          case MENU_TYPES.ZOOM_1: {
            initialize(1);
            break;
          }
          case MENU_TYPES.ZOOM_2: {
            initialize(2);
            break;
          }
          case MENU_TYPES.ZOOM_4: {
            initialize(4);
            break;
          }
          case MENU_TYPES.ZOOM_8: {
            initialize(8);
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

    initialize(1);
  }, [setMouseEventCallback, setUpdater, setMenuSelectCallback]);

  return <canvas id='WEB_GL_CANVAS' />;
};

export default Main;
