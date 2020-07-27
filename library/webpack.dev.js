const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(commonConfig, devConfig);
