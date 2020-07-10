const path = require('path');

process.chdir(path.join(__dirname, 'smoke/template'));

describe('Builder webpack test case.', () => {
  require('./unit/webpack-common-test');
  require('./unit/webpack-prod-test');
  require('./unit/webpack-dev-test');
});
