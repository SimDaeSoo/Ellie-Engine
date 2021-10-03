import { WORKER_CALLBACK_COMMAND, WORKER_COMMAND } from '../constants';
import { isSharedArrayBufferSupport } from '../utils';
import run from './Thread';

class MultiThread {
  private threads: Array<{
    id: number;
    worker: Worker;
  }>;
  public threadQuantity: number;
  private sharedArrayBufferSupport: boolean;

  constructor(threadQuantity: number) {
    this.threads = [];
    this.sharedArrayBufferSupport = isSharedArrayBufferSupport();
    this.threadQuantity = this.sharedArrayBufferSupport ? threadQuantity : 1;
  }

  public async initialize(): Promise<void> {
    if (!this.sharedArrayBufferSupport) return;
    await new Promise<void>((resolve) => {
      let initialized: number = 0;
      const messageCallback = ({ data }: { data: { command: WORKER_CALLBACK_COMMAND; data: any } }) => {
        const { command } = data;
        if (command === WORKER_CALLBACK_COMMAND.INITIALIZED) initialized++;
        if (initialized === this.threadQuantity) resolve();
      };

      for (let i = 0; i < this.threadQuantity; i++) {
        const worker: Worker = new Worker('worker.js');
        this.threads.push({
          id: i,
          worker,
        });
        worker.onmessage = messageCallback;
      }
    });

    for (const thread of this.threads) {
      thread.worker.onmessage = null;
    }
  }

  public async run(command: WORKER_COMMAND, data: any): Promise<void> {
    if (this.sharedArrayBufferSupport) {
      await new Promise<void>((resolve) => {
        let running: number = this.threadQuantity;
        const messageCallback = ({ data }: { data: { command: WORKER_CALLBACK_COMMAND; data: any } }) => {
          const { command } = data;
          if (command === WORKER_CALLBACK_COMMAND.DONE) running--;
          if (running === 0) resolve();
        };

        for (const thread of this.threads) {
          thread.worker.postMessage({
            id: thread.id,
            threadQuantity: this.threadQuantity,
            command,
            data,
          });
          thread.worker.onmessage = messageCallback;
        }
      });

      for (const thread of this.threads) {
        thread.worker.onmessage = null;
      }
    } else {
      // Not Support Threading...
      await run({ id: 0, threadQuantity: 1, command, data });
    }
  }
}

export default MultiThread;
