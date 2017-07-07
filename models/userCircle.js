
const Lib = require('../lib/lib.js');
const ModelError = require('./modelerror.js');

/**
 * 用户圈子映射表model
 * 对应数据表: user_circle
 * @class UserCircle
 */
class UserCircle {
  /**
   * 根据用户id和圈子id进行用户圈子绑定(加入)
   *
   * @static
   * @param {any} userId 用户id
   * @param {any} circleId 圈子id
   * @memberof UserCircle
   */
  static async insert(values) {
    try {
      const [result] = await global.db.query('Insert Into user_circle Set ?', [values]);
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
          Lib.logException('UserCircle.insert', e);
          throw new ModelError(500, e.message); // Internal Server Error for uncaught exception
      }
    }
  }

  /**
   * 找到用户所有绑定的有效的圈子(status: 1)
   *
   * @static
   * @param {any} userId 用户id
   * @memberof UserCircle
   */
  static async findUserAllCircleByUid(userId) {
    const sql = 'Select * From user_circle where user = ? and status = 1';
    const [circles] = await global.db.query(sql, [userId]);
    return circles;
  }

  /**
   * 根据圈子id来找到对应的创建者，验证创建者
   *
   * @static
   * @param {any} circleId 圈子id
   * @memberof UserCircle
   */
  static async getUserIdByCircle(circleId) {
    const sql = 'Select * From user_circle where id = ? and status = 1';
    const [circles] = await global.db.query(sql, [circleId]);
    if (circles[0]) {
      return circles[0].creator;
    }
    return null;
  }

  /**
   * 删除用户的圈子绑定(退出圈子，即更新status)
   *
   * @static
   * @param {any} userId 用户id
   * @param {any} circleId 圈子id
   * @memberof UserCircle
   */
  static async remove(userId, circleId) {
    try {
      await global.db.query('Update user_circle Set status = 2 Where user = ? and circle = ?', [userId, circleId]);
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
          Lib.logException('UserCircle.update', e);
          throw new ModelError(500, e.message); // Internal Server Error for uncaught exception
      }
    }
  }
}

module.exports = UserCircle;
