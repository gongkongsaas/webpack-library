const { sync } = require('glob-all');

describe('Checking generated javascript files.', () => {
  it('should generated javascript files', (done) => {
    const files = sync([
      '**/dist/index_*.js',
      '**/dist/search_*.js',
      '**/dist/commons_*.bundle.js',
    ]);

    if (files.length > 0) {
      done();
    } else {
      throw new Error('no javascript files generated')    
    }
  })
})