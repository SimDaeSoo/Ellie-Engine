const path = require('path');
const webpack = require('webpack');
const src = path.resolve(__dirname, './src');
const build = path.resolve(__dirname, './public');

const tsLoader = {
  loader: 'ts-loader',
  options: { compilerOptions: { module: 'esnext', noEmit: false } }
}

module.exports = {
  mode: 'none',
  target: "webworker",
  entry: './worker/worker.ts',
  output: {
    filename: 'worker.js',
    path: build
  },
  resolve: {
    modules: [src],
    extensions: [".ts"],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') })
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [tsLoader]
      },

    ]
  }
};
