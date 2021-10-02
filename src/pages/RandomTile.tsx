import { useEffect } from 'react';
import { WORKER_COMMAND } from '../constants';
import Map from '../core/Map';
import MultiThread from '../core/MultiThread';
import Renderer from '../core/Renderer';
import { fragmentShaderGLSL, vertexShaderGLSL } from '../shaders/PixelShader';

const RandomTile = ({
  setCallback,
  setUpdater,
}: {
  setCallback: (callback: (x: number, y: number) => void) => void;
  setUpdater: (callback: () => void) => void;
}) => {
  useEffect(() => {
    (async () => {
      // Set Multi Thread Controller
      const threadQuantity = window.navigator.hardwareConcurrency;
      const threadController = new MultiThread(threadQuantity);
      await threadController.initialize();

      // Create Map
      const [width, height] = [window.innerWidth, window.innerHeight];
      const map = new Map();
      map.create(width, height);

      // Set Renderer
      const renderer = new Renderer('WEB_GL_CANVAS');
      const vertexShader = renderer.createVertexShader(vertexShaderGLSL);
      const fragmentShader = renderer.createFragmentShader(fragmentShaderGLSL);
      const program = renderer.createProgram(vertexShader, fragmentShader);

      renderer.setViewport(0, 0, width, height);
      renderer.useProgram(program);
      renderer.setPixelsRenderer(map.width, map.height, program);
      renderer.deleteProgram(program);

      setUpdater(async () => {
        // Logic
        // Multi Thread
        await threadController.run(WORKER_COMMAND.SAMPLE_COMMAND, {
          map: map.export(),
        });

        // Single Thread
        // for (let i = 0; i < map.width * map.height; i++) {
        //   const x = i % map.width;
        //   const y = Math.floor(i / map.width);

        //   map.setTileProperty(x, y, 0, Math.floor(Math.random() * 256));
        //   map.setTileProperty(x, y, 1, Math.floor(Math.random() * 256));
        //   map.setTileProperty(x, y, 2, Math.floor(Math.random() * 256));
        //   map.setTileProperty(x, y, 3, Math.floor(Math.random() * 256));
        // }

        // Render
        renderer.clear(0, 0, 0, 0);
        renderer.pixelsRendering(map.properties, map.width, map.height);
      });

      setCallback((_x: number, _y: number) => {
        const [x, y]: [number, number] = [Math.round(_x), Math.round(_y)];
        const boundary = {
          x: {
            min: Math.max(0, x - 10),
            max: Math.min(map.width, x + 10),
          },
          y: {
            min: Math.max(0, y - 10),
            max: Math.min(map.height, y + 10),
          },
        };
        for (let y = boundary.y.min; y < boundary.y.max; y++) {
          for (let x = boundary.x.min; x < boundary.x.max; x++) {
            map.setTileProperty(x, y, 0, Math.floor(Math.random() * 256));
            map.setTileProperty(x, y, 1, Math.floor(Math.random() * 256));
            map.setTileProperty(x, y, 2, Math.floor(Math.random() * 256));
            map.setTileProperty(x, y, 3, Math.floor(Math.random() * 256));
          }
        }
      });
    })();
  }, [setCallback, setUpdater]);

  return (
    <canvas
      id='WEB_GL_CANVAS'
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default RandomTile;
