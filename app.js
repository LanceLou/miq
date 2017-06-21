const logger = require('koa-logger');
const koaBody = require('koa-body');
const Koa = require('koa');
const { mysqlConnectionInitialize } = require('./models/connectionPool');

const app = new Koa();
module.exports = app;

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
        const context404 = { msg: e.message == 'Not Found' ? null : e.message };
        await ctx.render('404-not-found', context404);
        break;
      }
      default:
      case 500: { // Internal Server Error
        console.error(ctx.status, e.message);
        const context500 = app.env === 'production' ? {} : { e };
        await ctx.render('500-internal-server-error', context500);
        ctx.app.emit('error', e, ctx); // github.com/koajs/koa/wiki/Error-Handling
        break;
      }
    }
  }
});
// 此处可放置模板渲染服务或者静态文件请求middleware
app.use(require('koa-static')(`${__dirname}/public`));
// 请求体解析
app.use(koaBody);


app.use(async (ctx) => {
  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  ctx.status = 404;

  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p>Page Not Found</p>';
      break;
    case 'json':
      ctx.body = {
        code: 404,
        message: 'Page Not Found',
      };
      break;
    default:
      ctx.type = 'text';
      ctx.body = 'Page Not Found';
  }
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
