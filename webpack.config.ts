import { Configuration } from 'webpack';
import * as path from 'path';
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const env = 'production' as 'development' | 'production';
const config: Configuration = {
  mode: env,
  devtool: env == 'development' ? 'inline-source-map' : false,
  entry: {
    app: [
      'regenerator-runtime/runtime',
      'core-js/stable/promise',
      'core-js/stable/object/assign',
      'core-js/stable/number',
      'dom-node-polyfills',
      path.resolve(__dirname, './src/app.ts'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './app/assets'),
  },
  plugins: [
    new Dotenv(),
    new CopyPlugin([
      {
        from: `./src/settings.${
          env === 'production' ? 'release' : 'debug'
        }.json`,
        to: '../settings.json',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
  ],
};

export default config;
