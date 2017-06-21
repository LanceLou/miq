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
const db = null;

const connectionPool = mysql.createPool(config);

/**
 * 初始化数据库连接函数
 * 建议在服务启动前部分调用，至少的controller前介入此初始化方法
 * @param {any} ctx koa middleware相关
 * @param {any} next koa middleware相关
 */
async function mysqlConnectionInitialize(ctx, next) {
  global.db = await connectionPool.getConnection();
  db.connection.config.namedPlaceholders = true;
  await db.query('SET SESSION sql_mode = "TRADITIONAL"');
  await next();
  db.release();
}
module.exports = {
  db,
  mysqlConnectionInitialize,
};
