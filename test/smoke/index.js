const { resolve, join } = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha();

process.chdir(join(__dirname, 'template'));

rimraf('./dist', () => {
  const prodConfig = require('../../library/webpack.prod.js');
  
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err);
      process.exit(2);
    }

    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false
    }));

    mocha.addFile(join(__dirname, 'html-test.js'));
    mocha.addFile(join(__dirname, 'css-test.js'));
    mocha.addFile(join(__dirname, 'js-test.js'));
    mocha.addFile(join(__dirname, 'image-test.js'));

    mocha.run();
  });
});


