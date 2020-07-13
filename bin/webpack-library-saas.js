#!/usr/bin/env node

'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

const webpack = require('webpack');
const args = process.argv.slice(2);

if (args[0] === 'build') {
  const prodConfig = require('../../../node_modules/webpack-library-saas/library/webpack.prod');

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
  
}
