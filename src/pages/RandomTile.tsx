import { useEffect } from 'react';
import Map from '../core/Map';
import Renderer from '../core/Renderer';

const RandomTile = ({
  setCallback,
  setUpdater,
}: {
  setCallback: (callback: (x: number, y: number) => void) => void;
  setUpdater: (callback: () => void) => void;
}) => {
  useEffect(() => {
    const thread = Math.floor(Math.sqrt(window.navigator.hardwareConcurrency));
    const [width, height] = [
      Math.ceil(window.innerWidth / thread) * thread,
      Math.ceil(window.innerHeight / thread) * thread,
    ];
    const map = new Map();
    map.create(width, height);

    for (let y = 0; y < thread; y++) {
      for (let x = 0; x < thread; x++) {
        const worker: Worker = new Worker('worker.js');
        worker.postMessage({ buffer: map.buffer });
      }
    }

    const canvas = document.getElementById('glCanvas') as HTMLCanvasElement;
    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
    new Renderer(gl);

    setCallback((_x: number, _y: number) => {});
    setUpdater(() => {});
  }, [setCallback, setUpdater]);

  return (
    <>
      <canvas
        id='glCanvas'
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
};

export default RandomTile;
