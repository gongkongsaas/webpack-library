const open = require('open');
const path = require('path');
const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const devConfig = require('./webpack.dev');

const configPath = path.resolve(devConfig.output.path, '../config/config');
const { appName, port } = require(configPath);  // eslint-disable-line

const app = express();

const compiler = webpack(devConfig);
const middleware = webpackDevMiddleware(compiler, {
  publicPath: devConfig.output.publicPath,
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler, {
  log: console.log,  // eslint-disable-line
}));

app.get(`/${appName}/:pageName/`, (req, res) => {
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
