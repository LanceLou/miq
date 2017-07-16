// gulpfile.js
const gulp = require('gulp');
const gutil = require('gulp-util');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const useref = require('gulp-useref');  // Parse build blocks(***语法解析是关键***) in HTML files to replace references to non-optimized scripts or stylesheets with useref
const filter = require('gulp-filter');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso');
const connect = require('gulp-connect'); // dev-server
const openurl = require('openurl');
const mockMiddleware = require('./test/frontEnd/mocks'); // 数据Mock
const del = require('del');
/**
 * gulp:
 *  任务编排，打包(合并，(图片，代码，扰乱)压缩，rv)，build，dev-server，调用webpack
 *
 *  TODO: 下阶段优化相关：*******************
 *  1. const cached = require('gulp-cached'); 使用catch & gulp-remember，优化gulp构建，增量build
 *  2. 部署自动化发布，deploy to git
 */

/**
 * 目录相关说明：
 *  src: 开发时，源代码目录
 *  dist: 开发时的临时打包文件
 *  bin: 放置production的打包文件(不进行ref, reversion, revreplace)
 *  publicDir: 服务目录(koa)，此目录下文件只拷贝进来
 *
 */

// 基础config
const src = {
  root: 'src',
  assets: 'src/assets/**/*',
  html: 'src/*.html',
};

// koa服务目录
const publicDir = {
  root: 'public/',
  assets: 'public/assets/',
};

// 放置production的打包文件(不进行ref, reversion, revreplace)
const bin = {
  root: 'bin/',
  assets: 'bin/assets/',
};

// 开发时的临时打包目录
const dist = {
  root: 'dist/',
  assets: 'dist/assets/',
  html: 'dist/',
};

const config = {
  isOpenUrl: true, // 是否自动打开
  openUrl: 'http://localhost:8080',
};

// --------------------------清除之前build的结果(包含publicDir和dist)-------------------------- start
function clean(done) { // 清除临时开发打包目录
  del.sync(dist.root);
  done();
}
function cleanBuild(done) { // 清除build时的打包目录
  del.sync(bin.root);
  del.sync(publicDir.root);
  done();
}
// --------------------------清除之前build的结果(包含publicDir和dist)-------------------------- end

/**
 * 相关规划：gulp处理，webpack打包统一到dist(临时)目录
 *         发布时，统一先构建到dist目录，再从dist目录拷贝到publicDir目录，最后进行相关发布
 */
// --------------------------文件copy--------------------------start
// -> dist
/**
 * 资源文件拷贝(图片等)
 * -> dist
 * @returns
 */
function copyAssets() {
  return gulp.src(src.assets)
    .pipe(gulp.dest(dist.assets));
}
/**
 * html文件拷贝, 其实只有index.html
 * -> dist
 * @returns
 */
function copyHtml() {
  return gulp.src(src.html)
    .pipe(gulp.dest(dist.html));
}

// -> bin build(prod)时
function copyToBin() {
  return gulp.src(`${dist.root}**/*`)
    .pipe(gulp.dest(bin.root));
}

function copyToPublic() {
  return gulp.src(`${bin.assets}**/*`)
    .pipe(gulp.dest(publicDir.assets));
}
//
// --------------------------文件copy--------------------------end


// --------------------------webpack任务定义--------------------------start
// 问题: 为何启用了gulp的connect，还需要使用webpack的webpack-dev-server？
/**
 * webpack-dev-server 与 gulp-connect的权责问题：
 * webpack-dev-server:
 *  The webpack-dev-server is a little Node.js Express server,
 *  which uses the webpack-dev-middleware to serve a webpack bundle. (这是主要的：主要是构建/打包服务)
 *  It also has a little runtime which is connected to the server via Sock.js.(这个只是also啦)
 *
 * gulp-connect：Gulp plugin to run a webserver (with LiveReload) (敲重点：webserver)
 *
 * webpack.DefinePlugin: The DefinePlugin allows you to create global constants
 * which can be configured at compile time.
 */
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.prod.js');

const devConfig = Object.create(webpackConfig);

devConfig.devtool = 'eval';
devConfig.plugins.push(new webpack.LoaderOptionsPlugin({
  debug: true,
}));

const devCompiler = webpack(devConfig);

// 开发环境下webpack任务 -------development
function webpackDevelopment(done) {
  devCompiler.run((err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build-dev', err);
    }
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true,
    }));
    done();
  });
}

// 生产环境下webpack任务 -------production
function webpackProduction(done) {
  const wconfig = Object.create(webpackConfig);
  wconfig.plugins = wconfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }));
  // new webpack.optimize.DedupePlugin()); Migrating: 不在需要啦
  // new webpack.optimize.UglifyJsPlugin(), 有gulp统一压缩，rev，revreplace

  webpack(wconfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:production]', stats.toString({
      colors: true,
    }));
    done();
  });
}
// --------------------------webpack任务定义--------------------------end

// --------------------------自动刷新与数据mock--------------------------start
function connectServer(done) {
  connect.server({
    root: dist.root, // dist 测试/开发时使用dist目录
    port: 8080,
    livereload: true,
    middleware: () => [mockMiddleware],
  });
  done();
}
// --------------------------自动刷新与数据mock--------------------------end

// --------------------------代码监控--------------------------start
function watch() {
  console.log('start watch');
  gulp.watch(src.html, copyHtml);
  gulp.watch('src/**/*.js', webpackDevelopment);
  gulp.watch('src/**/*.jsx', webpackDevelopment);
  gulp.watch('src/**/*.scss', webpackDevelopment);
  gulp.watch('dist/**/*').on('change', () => {
    gulp.src('dist/')
      .pipe(connect.reload());
  });
}
// --------------------------代码监控--------------------------end

// --------------------------浏览器链接打开--------------------------start
function openUrl(done) {
  if (config.isOpenUrl) {
    openurl.open(config.openUrl);
  }
  done();
}
// --------------------------浏览器链接打开--------------------------end

// ----------添加文件&压缩(所有静态文件)hash,rev,revreplace，deploy时----------start
function binToDeploy() {
  const jsFilter = filter('bin/**/*.js', { restore: true });
  const cssFilter = filter('bin/**/*.css', { restore: true });
  const indexHtmlFilter = filter(['bin/**/*', '!**/index.html'], { restore: true });

  return gulp.src('bin/index.html')
    .pipe(useref())      // Concatenate with gulp-useref
    .pipe(jsFilter)
    .pipe(uglify())             // Minify any javascript sources
    .pipe(jsFilter.restore)     // 取消过滤，而是针对所有的流
    .pipe(cssFilter)
    .pipe(csso())               // Minify any CSS sources
    .pipe(cssFilter.restore)    // 取消过滤，而是针对所有的流
    .pipe(indexHtmlFilter)
    .pipe(rev())                // Rename the concatenated files (but not index.html)
    .pipe(indexHtmlFilter.restore)  // 取消过滤，而是针对所有的流
    .pipe(revReplace())         // Substitute in new filenames(只是修改文件的hash，而文件具体路径已由useref修改)
    .pipe(gulp.dest('public'));
}
// ----------添加文件&压缩(所有静态文件)hash,rev,revreplace，deploy时----------end


// --------------------------任务编排--------------------------start
// dev
const devTask = gulp.series(
  clean,
  gulp.parallel(copyAssets, copyHtml, webpackDevelopment),
  connectServer,
  openUrl,
  watch);
gulp.task('default', devTask);

// production
gulp.task('build', gulp.series(
  clean,
  gulp.parallel(copyAssets, copyHtml, webpackProduction),
  cleanBuild,
  copyToBin, // copy至bin(tmp构建目录)： 下一步准备发布至发布目录
  gulp.parallel(copyToPublic, binToDeploy),
  (done) => {
    console.log('build success');
    done();
  }));
// --------------------------任务编排--------------------------end
