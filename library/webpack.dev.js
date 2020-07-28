const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const commonConfig = require('./webpack.common');

const MIDDLEWARE = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true';

const getDevEntry = () => {
  const devEntry = {};

  Object.keys(commonConfig.entry).map((index) => {
    const key = commonConfig.entry[index];
    devEntry[key] = [MIDDLEWARE, commonConfig.entry[key]];
    return index;
  });

  return devEntry;
};

const devConfig = {
  mode: 'development',
  entry: getDevEntry(),
  devtool: 'eval-source-map',
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(commonConfig, devConfig);
