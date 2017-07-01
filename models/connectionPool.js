/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* connectionPool - 数据库操作连接池                                                                 */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
const mysql = require('mysql2/promise'); // 数据库驱动
const appConfig = require('../config');

const config = {
  host: appConfig.DB_HOST,
  port: appConfig.DB_PORT,
  user: appConfig.DB_USER,
  password: appConfig.DB_PASSWORD,
  database: appConfig.DB_DATABASE,
};

// 咱们说连接池化不只是共享，其实还有复用
const connectionPool = mysql.createPool(config);

/**
 * 获取一个数据库连接
 * 建议在服务启动前部分调用，至少的controller前介入此初始化方法
 * @param {any} ctx koa middleware相关
 * @param {any} next koa middleware相关
 */
async function mysqlConnectionInitialize(ctx, next) {
  global.db = await connectionPool.getConnection();
  ctx.state.db = global.db;
  ctx.state.db.connection.config.namedPlaceholders = true;
  await ctx.state.db.query('SET SESSION sql_mode = "TRADITIONAL"');
  await next();
  ctx.state.db.release();
}
async function mysqlConnectionInitializeForTest() {
  global.db = await connectionPool.getConnection();
  global.db.connection.config.namedPlaceholders = true;
  await global.db.query('SET SESSION sql_mode = "TRADITIONAL"');
}
// 首先，为什么在中间件中初始化，话说这样每次链接到来都会建立一个连接挂到全局
module.exports = {
  mysqlConnectionInitialize,
  mysqlConnectionInitializeForTest,
};
