const { sync } = require('glob-all');

describe('Checking generated html files.', () => {
  it('should generated html files', (done) => {
    const files = sync([
      '**/dist/**/index.html'
    ]);
    
    if (files.length > 1) {
      done();
    } else {
      throw new Error('no html files generated')    
    }
  })
})