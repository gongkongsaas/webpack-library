const { sync } = require('glob-all');

describe('Checking generated javascript files.', () => {
  it('should generated javascript files', (done) => {
    const files = sync([
      '**/dist/**/index_*.js'
    ]);

    if (files.length > 2) {
      done();
    } else {
      throw new Error('no javascript files generated')    
    }
  })
})