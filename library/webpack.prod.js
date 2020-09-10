const { merge } = require('webpack-merge');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/index_[contenthash:8].css',
    }),
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
