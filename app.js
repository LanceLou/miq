/**
 * -------------------------------------------------------------
 * app.js
 * koa backend 入口JavaScript
 * 项目初始化，数据库初始化，总middleware注入
 * 现面临问题： 我们需要针对相关后台错误进行统一处理，但: 请求形式存在ajax以及url形式？？？
 *
 * TODO: ***************下阶段需求
 * 1. 优雅退出
 * -------------------------------------------------------------
 */
const logger = require('koa-logger');
const koaBody = require('koa-body');
const send = require('koa-send');
const CSRF = require('koa-csrf');
const Koa = require('koa');
const config = require('./config');
const session = require('koa-session');
const { auth } = require('./controllers/auth');
const { mysqlConnectionInitialize } = require('./models/connectionPool');
const router = require('./routes');

const app = new Koa();
module.exports = app;

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
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
      case 302: {
        console.log(e.message);
        if (e.message.indexOf('redirect to index') > 0) { // 重定向至主页
          console.log('red to index');
          ctx.redirect('/');
        }
        break;
      }
      case 401: { // unauthorize
        ctx.body = { message: e.message, statue: ctx.status };
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
// view相关login，404，500文件处理，后期接入模板渲染
app.use(require('koa-static')(`${__dirname}/views`));
// session开启
app.use(session(CONFIG, app));
// 数据库实体初始化，挂载到global上
app.use(mysqlConnectionInitialize);
// 用户认证， auth相关，Google auth接入
app.use(auth);

// ->> 认证完毕，正式进入index，服务
// csrf, session, cookie
app.use(new CSRF());
// 加csrf token
app.use(async (ctx, next) => {
  if (ctx.path === '/') {
    ctx.cookies.set('csrfToken', ctx.csrf, { httpOnly: false });
  }
  await next();
});
// 此处可放置模板渲染服务或者静态文件请求middleware
app.use(require('koa-static')(`${__dirname}/public`));

// 前端路由刷新，index回传
app.use(async (ctx, next) => {
  let done = false;
  // 纯HTML请求accept
  if (ctx.request.header.accept.indexOf('text/html,application/xhtml+xml,application/xml') === 0) {
    // 前端路由处理，返回首页
    ctx.response.type = 'text/html';
    done = await send(ctx, '/index.html', { root: `${__dirname}/public` });
  }
  if (!done) {
    await next();
  }
});

// 请求体解析
app.use(koaBody());

// 路由设置开启
app.use(router);

// 最终无处理错误处理404, 全部当做json accept返回。
app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body = {
    code: 404,
    message: 'Page Not Found',
  };
});

if (!module.parent) app.listen(config.port);
