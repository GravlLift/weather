const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (env, argv) {
  env = env || {};
  return {
    mode: env.production ? 'production' : 'development',
    entry: path.resolve(__dirname, './src/assets/main.ts'),
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
      filename: 'assets/main.js',
      path: path.resolve(__dirname, './app'),
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'assets/styles.css',
      }),
      new Dotenv(),
      new CopyPlugin([
        { from: './src/index.html', to: '.' },
        { from: './src/neutralino.js', to: './assets' },
        {
          from: `./environment/settings.${
            env.production ? 'release' : 'debug'
          }.json`,
          to: './settings.json',
        },
      ]),
      new CleanWebpackPlugin(),
    ],
  };
};
