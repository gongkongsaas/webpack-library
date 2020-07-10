const assert = require('assert');
const devConfig = require('../../library/webpack.dev');
  
describe('webpack.dev.js test case', () => {
  it('mode', () => {
    assert.equal(devConfig.mode, 'development');
  });
})
