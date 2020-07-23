const { sync } = require('glob-all');

describe('Checking generated image files.', () => {
  it('should generated image files', (done) => {
    const files = sync([
      '**/dist/assets/*_*.png',
    ]);
    
    if (files.length > 0) {
      done();
    } else {
      throw new Error('no image files generated')    
    }
  })
})