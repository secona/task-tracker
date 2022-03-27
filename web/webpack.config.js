const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const SRC = join(__dirname, 'src');
module.exports = ({ production: isProd }) => {
  return /** @type {import('webpack').Configuration} */ ({
    mode: isProd ? 'production' : 'development',

    entry: SRC,

    output: {
      filename: 'bundle.js',
      path: resolve(__dirname, 'dist'),
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: join(SRC, 'index.html'),
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],

    devServer: {
      port: 3000,
    },
  });
};
