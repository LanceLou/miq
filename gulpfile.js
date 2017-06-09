/**
 * gulp:
 *  任务编排，打包(合并，(图片，代码，扰乱)压缩，rv)，build，dev-server，调用webpack
 */

/**
 * bin: 开发时的临时打包文件
 * public: production(build)时打包文件文件
 */

// 基础config
var src = {
  // html: 
}

// 发布目录build
var public = {
  root: "public/",
  html: "public/index.html",
  style: "public/style",
  js: "public/js"
}

// 开发时的临时打包目录
var bin = {
  root: 'bin/',
  html: "bin/index.html",
  style: "bin/style",
  js: "bin/js"
}

// --------------------------清除之前build的结果(包含public和bin)-------------------------- start
function clean(done) {
  del.sync(public.root);
  done();
}
function cleanBin(done) {
  del.sync(bin.root);
  done();
}
// --------------------------清除之前build的结果(包含public和bin)-------------------------- end

/**
 * 相关规划：gulp处理，webpack打包统一到bin(临时)目录
 *         发布时，统一先构建到bin目录，再从bin目录拷贝到public目录，最后进行相关发布
 */
// --------------------------发布time，将最新的文件，如：html，assert，vendor, js文件拷贝至dist目录--------------------------start
function copyVendor() {
  return gulp.src(bin.vendor)
    .pipe(gulp.dest(public.vendor));
}
function copyAssets() {
  return gulp.src(bin.assets)
    .pipe(gulp.dest(public.assets));
}
function copyJs() {
  return gulp.src(bin.js)
    .pipe(gulp.dest(public.js));
}
function copyHtml() {
  return gulp.src(bin.html)
    .pipe(gulp.dest(public.html))
}
function copyCss() {
  return gulp.src(bin.style)
    .pipe(gulp.dest(public.style))
}
// --------------------------发布time，将最新的文件，如：html，assert，vendor文件拷贝至dist目录--------------------------start

