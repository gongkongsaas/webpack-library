const { sync } = require('glob-all');

describe('Checking generated css files.', () => {
  it('should generated css files', (done) => {
    const files = sync([
      '**/dist/**/index_*.css',
    ]);

    if (files.length > 0) {
      done();
    } else {
      throw new Error('no css files generated')    
    }
  })
})