#!/usr/bin/env node

/* eslint no-console: "off" */

process.on('unhandledRejection', (err) => {
  throw err;
});

const webpack = require('webpack');
const open = require('open');
const express = require('express');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const devConfig = require('../library/webpack.dev');
const prodConfig = require('../library/webpack.prod');

const configPath = path.resolve(devConfig.output.path, '../config/config');
const { appName, port } = require(configPath);

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
  const app = express();
  const compiler = webpack(devConfig);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
  }));

  app.get(`/${appName}/:pageName`, (req, res) => {
    let result = '';
    const htmlPath = path.join(`${devConfig.output.path}/${req.params.pageName}/index.html`);

    try {
      result = middleware.fileSystem.readFileSync(htmlPath);
    } catch (err) {
      result = err.toString();
    }

    res.write(result);
    res.end();
  });

  // process.env.PORT
  app.listen(port, (err) => {
    if (!err) {
      open(`http://localhost:${port}/${appName}/index`);
    }
  });
}
