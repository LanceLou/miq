var webpack = require('webpack');
const glob = require('glob');

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
 * 
 * new webpack.optimize.CommonsChunkPlugin({name: ['vendor'], minChunks: Infinity}) // 多个 html共用一个js文件
 * new webpack.LoaderOptionsPlugin() 
 * 用于将参数直接传给对应的loaders 和 plugins，migration from webpack @1.0(此版本可直接在webpack.config.js配置)
 * 
 * 
 * 问题： 配置了entry，那么处理style时，它还会去找style路径下的东西吗？
 */
// 基础配置
var config = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router'
    ],
    index: __dirname + '/src/index.js'
  },
  output: {
    path: __dirname + '/bin/js/', // temp打包目录：bin
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, 
        loader: "eslint-loader", 
        exclude: /node_modules/,
        options: {
          name: ['vendor'],
          minChunks: Infinity
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: [ 'es2015', 'stage-0', 'react' ] }
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, 'src/styles'),
        loader: 'style!css?modules&localIdentName=[name]__[local]!sass?sourceMap=true'
      }, {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/styles'),
        loader: 'style!css!sass?sourceMap=true'
      }
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'})
  ]
};

module.exports = config;
