import { Configuration } from 'webpack';
import * as path from 'path';
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const env = 'development' as 'development' | 'production';
const config: Configuration = {
  mode: env,
  entry: path.resolve(__dirname, './src/app.ts'),
  module: {
    rules: [
      {
        test: /\.ts?$/,
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
    new CopyPlugin([
      {
        from: `./src/settings.${
          env === 'production' ? 'release' : 'debug'
        }.json`,
        to: '../settings.json',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
};

export default config;
