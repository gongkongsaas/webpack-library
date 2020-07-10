const { merge } = require('webpack-merge');
const cssnano = require('cssnano');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      minChunks: 2,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = merge(commonConfig, prodConfig);
