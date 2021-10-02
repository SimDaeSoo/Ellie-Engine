import { WORKER_CALLBACK_COMMAND, WORKER_COMMAND } from '../src/constants';
import Map from '../src/core/Map';

type Store = {};

type MessageEventData = {
  data: Message;
};

type Message = {
  id: number;
  threadQuantity: number;
  command: WORKER_COMMAND;
  data: any;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const store: Store = {};

onmessage = (e) => {
  const { data: message }: MessageEventData = e;
  const { id, threadQuantity, command, data }: Message = message;

  switch (command) {
    case WORKER_COMMAND.CLEAR_MAP: {
      const { map: mapData } = data;
      const map = new Map();

      map.import(mapData);

      const begin = Math.ceil(
        ((map.totalWidth * map.totalHeight) / threadQuantity) * id
      );
      const end = Math.ceil(
        ((map.totalWidth * map.totalHeight) / threadQuantity) * (id + 1)
      );

      for (let i = begin; i < end; i++) {
        const x = i % map.totalWidth;
        const y = Math.floor(i / map.totalWidth);
        map.setTileProperties(x, y, 0, 0, 0, 0);
      }

      postMessage({ command: WORKER_CALLBACK_COMMAND.DONE });
      break;
    }
    default: {
      throw new Error(`${command} is not defined`);
    }
  }
};

postMessage({ command: WORKER_CALLBACK_COMMAND.INITIALIZED });
