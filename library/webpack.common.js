const { sync } = require('glob');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const WebpackBar = require('webpackbar');

const projectRoot = process.cwd();

/*
 * 兼容多页面应用
 * 默认入口为index.js,模板为index.html
 * {entry}
 * plugins[htmlWebpackPlugins]
 */
const setMultiPageApplication = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = sync(path.resolve(projectRoot, './src/*/index.js'));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pathName = match && match[1];

    entry[pathName] = entryFile;

    return htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(projectRoot, 'src/document.ejs'),
        filename: `${pathName}/index.html`,
        chunks: [pathName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMultiPageApplication();

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer],
            },
          },
          'less-loader',
        ],
        include: path.resolve(projectRoot, 'src'),
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: '[name]/index_[chunkhash:8].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new MiniCssExtractPlugin({
      filename: '[name]/index_[contenthash:8].css',
    }),
  ].concat(htmlWebpackPlugins),
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    extensions: ['.js', '.jsx', 'ts', '.tsx', '.json'],
    alias: {
      '@src': path.join(projectRoot, 'src'),
      '@config': path.join(projectRoot, 'config'),
      '@components': path.join(projectRoot, 'components'),
    },
  },
};
