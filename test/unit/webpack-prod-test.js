const assert = require('assert');
const prodConfig = require('../../library/webpack.prod');
  
describe('webpack.prod.js test case', () => {
  it('mode', () => {
    assert.equal(prodConfig.mode, 'production');
  });
})
