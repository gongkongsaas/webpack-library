#!/usr/bin/env node

/* eslint no-console: "off" */

process.on('unhandledRejection', (err) => {
  throw err;
});
const webpack = require('webpack');
const prodConfig = require('../library/webpack.prod');

const args = process.argv.slice(2);

if (args[0] === 'build') {
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err);
      process.exit(2);
    }

    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
    }));
  });
} else if (args[0] === 'start') {
  require('../library/dev.server');
}
