const open = require('open');
const path = require('path');
const webpack = require('webpack');
const express = require('express');
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

app.use('/api', createProxyMiddleware({
  target,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
}));

app.use(middleware);
app.use(webpackHotMiddleware(compiler, {
  log: console.log,  // eslint-disable-line
}));

app.get(`/${appName}/:version/:pageName/:item`, (req, res) => {
  let result = '';
  const htmlPath = path.join(`${devConfig.output.path}/${req.params.version}/${req.params.pageName}/index.html`);

  if (target.indexOf('gongkongsaas') > 0) {
    res.cookie('traceId', '6fec0648ab9dffb336f56c89ef7a4f25');
    res.cookie('ticket', 'SHP_9_1_USER-SESSION_C1CC2452C9F76302C883922FE5516D73');
    res.cookie('JSESSIONID', 'node0z3yf2z9gsfbbb5phiic8c8dj0.node0');
  } else {
    res.cookie('traceId', '12499d63d526a23d927f6d026389d46b');
    res.cookie('ticket', 'SHP_2_11094_USER-SESSION_2F3ECAE3BEC6EA5A3F19D7482E509D7D');
    res.cookie('JSESSIONID', 'node01d5vyn8h0kc1w1uz05xg4c5qof11.node0');
  }

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
    open(`http://localhost:${port}/${appName}/v5/index`);
  }
});
