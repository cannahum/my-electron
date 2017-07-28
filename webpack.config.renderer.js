// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require('awesome-typescript-loader');
const path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {

  entry: path.resolve(__dirname, 'src', 'renderer', 'main.ts'),

  output: {
    filename: 'index.renderer.js',
    path: __dirname + '/build'
  },

  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  // Source maps support ('inline-source-map' also works)
  devtool: 'inline-source-map',

  // Add the loader for .ts files.
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'tsconfig.main.json'
        },
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new TransferWebpackPlugin([
      {
        from: './static/',
        to: '.'
      }
    ])
  ],
  externals: {
    spellchecker: 'electron-spellchecker'
  },
  target: 'electron-renderer'
};