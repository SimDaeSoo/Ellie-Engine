import { WORKER_CALLBACK_COMMAND, WORKER_COMMAND } from '../src/constants';
import Map from '../src/core/Map';

type Store = {
  testIndex: number;
};

type MessageEventData = {
  data: Message;
};

type Message = {
  id: number;
  threadQuantity: number;
  command: WORKER_COMMAND;
  data: any;
};

const store: Store = {
  testIndex: 0,
};

onmessage = (e) => {
  const { data: message }: MessageEventData = e;
  const { id, threadQuantity, command, data }: Message = message;

  switch (command) {
    case WORKER_COMMAND.SAMPLE_COMMAND: {
      const { map: mapData } = data;
      const map = new Map();

      map.import(mapData);

      if (!store.testIndex) store.testIndex = 0;
      const begin =
        Math.ceil(((map.width * map.height) / threadQuantity) * id) +
        store.testIndex;
      const end = Math.min(
        Math.ceil(((map.width * map.height) / threadQuantity) * (id + 1)),
        begin + 1
      );

      for (let i = begin; i < end; i++) {
        const x = i % map.width;
        const y = Math.floor(i / map.width);

        map.setTileProperty(x, y, 0, Math.floor(Math.random() * 256));
        map.setTileProperty(x, y, 1, Math.floor(Math.random() * 256));
        map.setTileProperty(x, y, 2, Math.floor(Math.random() * 256));
        map.setTileProperty(x, y, 3, Math.floor(Math.random() * 256));

        store.testIndex++;
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
