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
    case WORKER_COMMAND.MAP_UPDATE: {
      const { offset, reverse } = data;
      if (!store.map.isBreakLoop) store.map.update(offset, reverse);
      break;
    }
    case WORKER_COMMAND.MAP_ID_SHFFLE: {
      const { ids } = data;
      store.map.id = ids[id];
      break;
    }
    default: {
      throw new Error(`${command} is not defined`);
    }
  }
}

export default run;
