const Lib = require('../lib/lib.js');
const ModelError = require('./modelerror.js');

class User {

  /**
   * 根据用户id获取数据库用户数据
   * get by id
   * @static
   * @param {any} id
   * @returns {Object} user
   * @memberof User
   */
  static async get(id) {
    const [users] = await global.db.query('Select * From User Where UserId = ?', [id]);
    const user = users[0];
    return user;
  }

  /**
   * 根据用户的某些特征获取用户
   * @static
   * @param {string} field 对应的列名
   * @param {string!number} 列名所对应的值
   * @returns 查询到的User
   * @memberof User
   */
  static async getBy(field, value) {
    try {
      const sql = `Select * From User Where ${field} = :${field}`;

      const [users] = await global.db.query(sql, { [field]: value });

      return users;
    } catch (e) {
      switch (e.code) {
        case 'ER_BAD_FIELD_ERROR': throw new ModelError(403, `Unrecognised User field ${field}`);
        default: Lib.logException('User.getBy', e); throw new ModelError(500, e.message);
      }
    }
  }

  static async insert(values) {
    try {
      const [result] = await global.db.query('Insert Into User Set ?', [values]);
            // console.log('User.insert', result.insertId, new Date); // eg audit trail?
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
          Lib.logException('User.insert', e);
          throw new ModelError(500, e.message); // Internal Server Error for uncaught exception
      }
    }
  }

  /**
     * 用户信息更新
     *
     * @param  {number} id - User id.
     * @param  {Object} values - User details.
     * @throws Error on referential integrity errors.
     */
  static async update(id, values) {
    try {
      await global.db.query('Update User Set ? Where UserId = ?', [values, id]);
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
          Lib.logException('User.update', e);
          throw new ModelError(500, e.message); // Internal Server Error for uncaught exception
      }
    }
  }
}
module.exports = User;
