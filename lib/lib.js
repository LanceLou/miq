/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  一些独立的，非常有用的方法啦                                                                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

const Lib = {};

/**
 * 处理无法捕获的错误，通知开发者(邮件或者save file，此处预留)
 * 当然，对于整个流程步无法处理而导致系统推出的错误，会由PM2进行统一管理并email
 * PM2原理: http://taobaofed.org/blog/2015/11/03/nodejs-cluster/
 */
Lib.logException = (method, e) => {
  console.error('UNHANDLED EXCEPTION', method, e.stack === undefined ? e.message : e.stack);
};

module.exports = Lib;
