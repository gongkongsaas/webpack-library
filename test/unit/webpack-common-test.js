const assert = require('assert');
const commonConfig = require('../../library/webpack.common');
  
describe('webpack.common.js test case', () => {
  it('entry', () => {
    assert.equal(commonConfig.entry.index.indexOf('webpack-library/test/smoke/template/src/index/index.js') > 0, true);
    assert.equal(commonConfig.entry.search.indexOf('webpack-library/test/smoke/template/src/search/index.js') > 0, true);
  });

  it('output', () => {
    console.log('commonConfig.output', commonConfig.output)
    assert.equal(commonConfig.output.path.indexOf('webpack-library/test/smoke/template/dist') > -1, true);
    assert.equal(commonConfig.output.filename.indexOf('[name]/index_[chunkhash:8].bundle.js') > -1, true);
  });
})
