import { useEffect } from 'react';
import * as Map from '../core/Map';

const TilemapWithBuffer = ({
  setCallback,
}: {
  setCallback: (callback: (x: number, y: number) => void) => void;
}) => {
  useEffect(() => {
    (async () => {
      const thread = Math.floor(
        Math.sqrt(window.navigator.hardwareConcurrency)
      );
      const [width, height] = [
        Math.ceil(window.innerWidth / thread) * thread,
        Math.ceil(window.innerHeight / thread) * thread,
      ];
      const buffer = Map.create(width, height);

      for (let y = 0; y < thread; y++) {
        for (let x = 0; x < thread; x++) {
          const worker: Worker = new Worker('worker.js');
          worker.postMessage({ buffer });
        }
      }
    })();

    setCallback((_x: number, _y: number) => {});
  }, [setCallback]);

  return <></>;
};

export default TilemapWithBuffer;
