const open = require('open');
const path = require('path');
const webpack = require('webpack');
const express = require('express');
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const devConfig = require('./webpack.dev');

const configPath = path.resolve(devConfig.output.path, '../config/config');
const { appName, port, target } = require(configPath);  // eslint-disable-line

const app = express();

const compiler = webpack(devConfig);
const middleware = webpackDevMiddleware(compiler, {
  publicPath: devConfig.output.publicPath,
});

app.use(cookieParser());

app.use('/api', createProxyMiddleware({
  target,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
}));

app.use(middleware);
app.use(webpackHotMiddleware(compiler, {
  log: console.log,  // eslint-disable-line
}));

app.get(`/${appName}/:pageName/:item`, (req, res) => {
  let result = '';
  const htmlPath = path.join(`${devConfig.output.path}/${req.params.pageName}/index.html`);

  res.cookies('traceId', '12499d63d526a23d927f6d026389d46b');
  res.cookies('ticket', 'SHP_2_11094_USER-SESSION_2F3ECAE3BEC6EA5A3F19D7482E509D7D');

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
