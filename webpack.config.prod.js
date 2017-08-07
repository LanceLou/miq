const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

/**
 * webpack: 负责css处理，scss，css moudle
 *
 * bin: 开发时的临时打包文件
 * public: production(build)时打包文件文件
 */

/**
 * http://taobaofed.org/blog/2016/09/09/webpack-flow/
 *
 * https://github.com/mishoo/UglifyJS2
 * mangle
 *
 * new webpack.optimize.CommonsChunkPlugin({name: ['vendor'], minChunks: Infinity})
 * new webpack.LoaderOptionsPlugin()
 * 用于将参数直接传给对应的loaders 和 plugins，migration from webpack @1.0(此版本可直接在webpack.config.js配置)
 *
 *
 * 问题： 配置了entry，那么处理style时，它还会去找style路径下的东西吗？
 */
// 基础配置
const config = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
    ],
    index: `${__dirname}/src/js/index.js`,
  },
  output: {
    path: `${__dirname}/dist/js/`, // temp打包目录：bin
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss', '.css'],
    alias: {
      Components: path.resolve(__dirname, 'src/js/components/'),
      Actions: path.resolve(__dirname, 'src/js/actions/'),
      Api: path.resolve(__dirname, 'src/js/api/'),
      Styles: path.resolve(__dirname, 'src/styles/'),
      Images: path.resolve(__dirname, 'src/assets/images/'),
      Util: path.resolve(__dirname, 'src/js/util/'),
      Reducers: path.resolve(__dirname, 'src/js/reducers/'),
      Config: path.resolve(__dirname, 'config.js'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          name: ['vendor'],
          minChunks: Infinity,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'stage-0', 'stage-1', 'react'] },
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, 'src/styles'),
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]--[hash:base64:5]!postcss-loader?sourceMap=true!sass-loader?sourceMap=true',
      }, {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/styles'),
        loader: 'style-loader!css-loader!postcss-loader?sourceMap=true!sass-loader?sourceMap=true',
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192',
      }, {
        test: path.resolve(__dirname, 'src/js/util/platform'),
        loader: 'exports-loader?window.gapi!script-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
    autoprefixer,
  ],
};

module.exports = config;
