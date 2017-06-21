/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  一些独立的，非常有用的方法啦                                                                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

const Lib = {};

/**
 * 处理无法捕获的错误，通知开发者(邮件或者save file，此处预留)
 */
Lib.logException = (method, e) => {
  console.error('UNHANDLED EXCEPTION', method, e.stack === undefined ? e.message : e.stack);
};
