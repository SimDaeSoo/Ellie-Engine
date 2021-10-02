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
      // Each Map Block Resolution
      const splitQuantity = 4;
      const width = Math.round(window.innerWidth / splitQuantity);
      const height = Math.round(window.innerHeight / splitQuantity);

      // Set Multi Thread Controller
      const threadQuantity = window.navigator.hardwareConcurrency;
      const threadController = new MultiThread(threadQuantity);
      await threadController.initialize();

      // Create Map
      const map = new Map();
      map.create(0, 0, width, height, splitQuantity);

      // Set Renderer
      const renderer = new Renderer('WEB_GL_CANVAS');
      const vertexShader = renderer.createVertexShader(vertexShaderGLSL);
      const fragmentShader = renderer.createFragmentShader(fragmentShaderGLSL);
      const program = renderer.createProgram(vertexShader, fragmentShader);

      renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
      renderer.useProgram(program);
      renderer.setPixelsRenderer(program, width, height, splitQuantity);
      renderer.deleteProgram(program);

      setUpdater(async () => {
        // Logic
        // Multi Thread
        await threadController.run(WORKER_COMMAND.SAMPLE_COMMAND, {
          map: map.export(),
        });

        // Render
        renderer.pixelsRendering(map.tileProperties, width, height);
      });

      setCallback((_x: number, _y: number) => {});
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
