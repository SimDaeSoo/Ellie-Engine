import { WORKER_CALLBACK_COMMAND, WORKER_COMMAND } from '../src/constants';
import run from '../src/core/Thread';

type MessageEventData = {
  data: Message;
};

type Message = {
  id: number;
  threadQuantity: number;
  command: WORKER_COMMAND;
  data: any;
};

onmessage = async (e) => {
  const { data: message }: MessageEventData = e;

  await run(message);

  postMessage({ command: WORKER_CALLBACK_COMMAND.DONE });
};

postMessage({ command: WORKER_CALLBACK_COMMAND.INITIALIZED });
