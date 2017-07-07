const Lib = require('../lib/lib.js');
const ModelError = require('./modelerror.js');
// const mysql = require('mysql2');

/**
 * 对于github auth： 我们通过url(即个人url，eg：https://github.com/LanceLou)来进行唯一性校验
 * 对于Google auth： 使用期email进行唯一性校验，当然，二者都要带上对应的第三方认证类型
 * @class user
 */
class User {

  /**
   * 根据用户id获取数据库用户数据
   * get by id
   * @static
   * @param {any} id
   * @returns {Object} user
   * @memberof user
   */
  static async get(id) {
    const [users] = await global.db.query('Select * From user Where id = ?', [id]);
    const user = users[0];
    return user;
  }

  /**
   * 根据用户的某些特征获取用户
   * @static
   * @param {string} field 对应的列名
   * @param {string!number} value 列名所对应的值
   * @returns 查询到的user
   * @memberof user
   */
  static async getBy(field, value) {
    try {
      const sql = 'Select * From user Where ?? = ?';
      const [users] = await global.db.query(sql, [field, value]);
      return users;
    } catch (e) {
      switch (e.code) {
        case 'ER_BAD_FIELD_ERROR': throw new ModelError(403, `Unrecognised user field ${field}`);
        default: Lib.logException('user.getBy', e); throw new ModelError(500, e.message);
      }
    }
  }

  static async insert(values) {
    try {
      const [result] = await global.db.query('Insert Into user Set ?', [values]);
            // console.log('user.insert', result.insertId, new Date); // eg audit trail?
      return result.insertId;
    } catch (e) {
      switch (e.code) { // just use default MySQL messages for now
        case 'ER_BAD_NULL_ERROR':
        case 'ER_NO_REFERENCED_ROW_2':
        case 'ER_NO_DEFAULT_FOR_FIELD':
          throw new ModelError(403, e.message); // Forbidden
        case 'ER_DUP_ENTRY':
          throw new ModelError(409, e.message); // Conflict
        case 'ER_BAD_FIELD_ERROR':
          throw new ModelError(500, e.message); // Internal Server Error for programming errors
        default:
          Lib.logException('user.insert', e);
          throw new ModelError(500, e.message); // Internal Server Error for uncaught exception
      }
    }
  }

  /**
     * 用户信息更新
     *
     * @param  {number} id - user id.
     * @param  {Object} values - user details.
     * @throws Error on referential integrity errors.
     */
  static async update(id, values) {
    try {
      await global.db.query('Update user Set ? Where id = ?', [values, id]);
    } catch (e) {
      switch (e.code) { // just use default MySQL messages for now
        case 'ER_BAD_NULL_ERROR':
        case 'ER_DUP_ENTRY':
        case 'ER_ROW_IS_REFERENCED_2':
        case 'ER_NO_REFERENCED_ROW_2':
          throw new ModelError(403, e.message); // Forbidden
        case 'ER_BAD_FIELD_ERROR':
          throw new ModelError(500, e.message); // Internal Server Error for programming errors
        default:
          Lib.logException('user.update', e);
          throw new ModelError(500, e.message); // Internal Server Error for uncaught exception
      }
    }
  }
}
module.exports = User;
