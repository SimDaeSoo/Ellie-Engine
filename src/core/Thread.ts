import { WORKER_COMMAND } from '../constants';
import Map from './Map';

type Message = {
  id: number;
  threadQuantity: number;
  command: WORKER_COMMAND;
  data: any;
};

type Store = any;
const store: Store = {};

async function run(message: Message): Promise<void> {
  const { id, threadQuantity, command, data }: Message = message;

  switch (command) {
    case WORKER_COMMAND.MAP_INITIALIZE: {
      const { map: mapData } = data;
      store.map = new Map(id, threadQuantity);
      store.map.import(mapData);
      break;
    }
    case WORKER_COMMAND.MAP_CLEAR: {
      store.map.clear(id, threadQuantity);
      break;
    }
    case WORKER_COMMAND.MAP_PROCESSING: {
      store.map.update(id, threadQuantity, 1);
      break;
    }
    default: {
      throw new Error(`${command} is not defined`);
    }
  }
}

export default run;