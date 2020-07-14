#!/usr/bin/env node

'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

const webpack = require('webpack');
const open = require('open');
const WebpackDevServer = require('webpack-dev-server');

const args = process.argv.slice(2);

if (args[0] === 'build') {
  const prodConfig = require('../library/webpack.prod');

  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err);
      process.exit(2);
    }

    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false
    }));
  });
} else if (args[0] === 'start') {
  const devConfig = require('../library/webpack.dev');
  const compiler = webpack(devConfig);
  const server = new WebpackDevServer(compiler);

  server.listen('8000', 'localhost', err => {
    if (!err) {
      open(`http://localhost:8000`);
    }
  });
}
