import { WORKER_COMMAND } from '../constants';
import Map from './Map';

type Message = {
  id: number;
  threadQuantity: number;
  command: WORKER_COMMAND;
  data: any;
};

// Generator 짤 생각에 벌써 머리가 아프다.
async function run(message: Message): Promise<void> {
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
      break;
    }
    default: {
      throw new Error(`${command} is not defined`);
    }
  }
}

export default run;
