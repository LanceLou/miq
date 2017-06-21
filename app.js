const logger = require('koa-logger');
const koaBody = require('koa-body');
const Koa = require('koa');

const app = new Koa();
module.exports = app;

// 日志记录
app.use(logger());
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
