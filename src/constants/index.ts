const TILE_BYTES = 4;
enum WORKER_COMMAND {
  SAMPLE_COMMAND,
}
enum WORKER_CALLBACK_COMMAND {
  INITIALIZED,
  DONE,
}

export { TILE_BYTES, WORKER_COMMAND, WORKER_CALLBACK_COMMAND };
