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
      const tileGrid = Map.create(width, height, {
        splitWidth: width / thread,
        splitHeight: height / thread,
      });

      console.log(tileGrid, thread);

      const worker: Worker = new Worker('WebWorker.js');
      worker.postMessage(tileGrid);
    })();

    setCallback((_x: number, _y: number) => {});
  }, [setCallback]);

  return <></>;
};

export default TilemapWithBuffer;
