import { WORKER_CALLBACK_COMMAND, WORKER_COMMAND } from '../constants';

class MultiThread {
  private threads: Array<{
    id: number;
    worker: Worker;
  }>;
  public threadQuantity: number;

  constructor(threadQuantity: number) {
    this.threads = [];
    this.threadQuantity = threadQuantity;
  }

  public async initialize(): Promise<void> {
    await new Promise<void>((resolve) => {
      let initialized: number = 0;
      const messageCallback = ({
        data,
      }: {
        data: { command: WORKER_CALLBACK_COMMAND; data: any };
      }) => {
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
    await new Promise<void>((resolve) => {
      let running: number = this.threadQuantity;
      const messageCallback = ({
        data,
      }: {
        data: { command: WORKER_CALLBACK_COMMAND; data: any };
      }) => {
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
  }
}

export default MultiThread;
