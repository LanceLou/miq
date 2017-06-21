/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* ModelError - model部分错误处理描述对象, 包括数据查询时先关的http状态报错                               */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


/**
 * 错误描述对象，包含http错误状态
 *
 * @param {Number} 错误状态码
 * @param {String} 错误信息
 * @class ModelError
 * @extends {Error}
 */
class ModelError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

module.exports = ModelError;
