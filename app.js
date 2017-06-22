const logger = require('koa-logger');
const koaBody = require('koa-body');
const CSRF = require('koa-csrf');
const Koa = require('koa');
const config = require('./config');
const session = require('koa-session');
const { mysqlConnectionInitialize } = require('./models/connectionPool');

const app = new Koa();
module.exports = app;

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
};

// session 加密密匙配置
app.keys = [config.keys];
// 日志记录，命令行屌丝版
app.use(logger());
// 入口错误处理，包含throw的异常以及未捕获的异常
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.status = e.status || 500;
    switch (ctx.status) {
      case 404: { // Not Found
        ctx.body = { message: e.message, statue: 404 };
        break;
      }
      default:
      case 500: { // Internal Server Error and others
        ctx.body = { message: e.message, statue: ctx.status };
        ctx.app.emit('error', e, ctx); // github.com/koajs/koa/wiki/Error-Handling
        break;
      }
    }
  }
  // https://github.com/guo-yu/koa-guide
});
// 用户认证， auth相关，待Google auth接入

// csrf, session, cookie
app.use(new CSRF());
// 加csrf token
app.use(async (ctx, next) => {
  if (ctx.path === '/') {
    ctx.cookies.set('csrfToken', ctx.csrf, { httpOnly: false });
  }
  await next();
});
// session开启
app.use(session(CONFIG, app));
// 此处可放置模板渲染服务或者静态文件请求middleware
app.use(require('koa-static')(`${__dirname}/public`));
// 数据库实体初始化，挂载到global上
app.use(mysqlConnectionInitialize);
// 请求体解析
app.use(koaBody);
// 路由设置开启

// 最终无处理错误处理404, 全部当做json accept返回。
app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body = {
    code: 404,
    message: 'Page Not Found',
  };
});


// router.get('/', )

// // "database"

// const posts = [];

// // middleware

// app.use(logger());

// app.use(render);

// app.use(koaBody());

// // route definitions

// router.get('/', list)
//   .get('/post/new', add)
//   .get('/post/:id', show)
//   .post('/post', create);

// app.use(router.routes());

// /**
//  * Post listing.
//  */

// async function list(ctx) {
//   await ctx.render('list', { posts });
// }

// /**
//  * Show creation form.
//  */

// async function add(ctx) {
//   await ctx.render('new');
// }

// /**
//  * Show post :id.
//  */

// async function show(ctx) {
//   const id = ctx.params.id;
//   const post = posts[id];
//   if (!post) ctx.throw(404, 'invalid post id');
//   await ctx.render('show', { post });
// }

// /**
//  * Create a post.
//  */

// async function create(ctx) {
//   const post = ctx.request.body;
//   const id = posts.push(post) - 1;
//   post.created_at = new Date();
//   post.id = id;
//   ctx.redirect('/');
// }

// // listen

if (!module.parent) app.listen(3000);
