const Lib = require('../lib/lib.js');
const ModelError = require('./modelerror.js');

/**
 * 用户收藏model
 * 对应数据表: user_collect
 * @class UserCollect
 */
class UserCollect {
  /**
   * 根据id获取UserCollect
   *
   * @static
   * @param {any} id UserCollect的id
   * @memberof UserCollect
   */
  static async get(id) {
    const [userCollects] = await global.db.query('Select * From user_collect Where id = ?', [id]);
    const userCollect = userCollects[0];
    return userCollect;
  }

  /**
   * 根据UserCollect的某些field获取UserCollect对象
   *
   * @static
   * @param [any] field 键名列表
   * @param [any] value 键值列表
   * @returns [UserCollect] UserCollect对象
   * @memberof UserCollect
   */
  static async getBy(fields, values) {
    try {
      if (!fields || !values || fields.length !== values.length) {
        throw new ModelError(400, 'Dao call error'); // bad call
      }
      const wherePart = fields.reduce((cum, field, index) => {
        const tempStr = index > 0 ? ' and ' : ' ';
        return `${cum}${tempStr}?? = ?`;
      }, '');
      const queryParamsArr = [];
      for (let i = 0; i < fields.length;) {
        queryParamsArr.push(fields[i]);
        queryParamsArr.push(values[i]);
        i += 1;
      }
      const sql = `Select * From user_collect Where${wherePart}`;
      const [circles] = await global.db.query(sql, queryParamsArr);
      return circles;
    } catch (e) {
      switch (e.code) {
        case 'ER_BAD_FIELD_ERROR': throw new ModelError(403, `Unrecognised user fields ${fields}`);
        default: Lib.logException('UserCollect.getBy', e); throw new ModelError(500, e.message);
      }
    }
  }

  /**
   * 插入UserCollect
   *
   * @static
   * @param {any} values UserCollect对象
   * @returns 插入成功的ID
   * @memberof UserCollect
   */
  static async insert(values) {
    try {
      const [result] = await global.db.query('Insert Into user_collect Set ?', [values]);
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
          Lib.logException('Circle.insert', e);
          throw new ModelError(500, e.message); // Internal Server Error for uncaught exception
      }
    }
  }

  /**
   * 更新UserCollect
   *
   * @static
   * @param {any} id 对应UserCollect id
   * @param {any} values 对应键值对象
   * @memberof UserCollect
   */
  static async update(id, values) {
    try {
      await global.db.query('Update user_collect Set ? Where id = ?', [values, id]);
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
          Lib.logException('Circle.update', e);
          throw new ModelError(500, e.message); // Internal Server Error for uncaught exception
      }
    }
  }

  /**
   * 根据用户id获取其所有的UserCollect
   *
   * @static
   * @param {any} userId 对应用户id
   * @returns [UserCollect]
   * @memberof UserCollect
   */
  static async getAllUserCollectsByUserId(userId) {
    const [userCollects] = await global.db.query('Select * From user_collect Where user = ?', [userId]);
    return userCollects;
  }
}

module.exports = UserCollect;
