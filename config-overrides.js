module.exports = {
  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);

      // Set header for using shared array buffer for shared memory with worker thread
      // config.headers = {
      //   "Cross-Origin-Opener-Policy": "same-origin",
      //   "Cross-Origin-Embedder-Policy": "require-corp"
      // };
      config.liveReload = false;

      return config;
    }
  }
};