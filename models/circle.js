const Lib = require('../lib/lib.js');
const ModelError = require('./modelerror.js');

/**
 * 圈子model
 * 对应数据表: circle
 * @class Circle
 */
class Circle {
  /**
   * 根据id获取圈子
   *
   * @static
   * @param {any} id 圈子id
   * @memberof Circle
   */
  static async get(id) {
    const [circles] = await global.db.query('Select * From circle Where id = ?', [id]);
    const circle = circles[0];
    return circle;
  }

  /**
   * 根据创建人名字模糊查找圈子
   * @static
   * @param {any} name 创建人姓名
   * @returns Circles
   * @memberof Circle
   */
  static async getCircleByCreatorName(name) {
    const [circles] = await global.db.query('SELECT c.id, c.name, c.intro, c.logUrl, c.createdAt, u.id as creatorId, u.name as creatorName FROM  circle as c, user as u where c.creator = u.id and u.id in ( SELECT id from user WHERE name LIKE ?)', [`%${name}%%`]);
    console.log(circles);
    return circles;
  }

  /**
   * 分页查找圈子中的所有用户id
   * @static
   * @param {any} circleId 圈子id
   * @param {any} page 第page页
   * @param {any} size 每页的大小
   * @returns 输出的用户
   * @memberof Circle
   */
  static async getCircleMenbers(circleId, page, size) {
    /**
      page: 1, size: 10   ->   0 -> 10  (page-1) * size -> page * size
     */
    const [users] = await global.db.query('SELECT  * from user where id in (SELECT user from user_circle where circle = ? ) LIMIT ?, ?', [circleId, (page - 1) * size, page * size]);
    return users;
  }

  /**
   * 根据圈子的某些field获取圈子对象 and select
   *
   * @static
   * @param [any] field 键名列表
   * @param [any] value 键值列表
   * @returns [Circle] 圈子对象
   * @memberof Circle
   */
  static async getByAnd(fields, values) {
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
      const sql = `Select * From circle Where${wherePart}`;
      const [circles] = await global.db.query(sql, queryParamsArr);
      return circles;
    } catch (e) {
      switch (e.code) {
        case 'ER_BAD_FIELD_ERROR': throw new ModelError(403, `Unrecognised user fields ${fields}`);
        default: Lib.logException('Circle.getBy', e); throw new ModelError(500, e.message);
      }
    }
  }

  /**
   * 根据圈子的某些field获取圈子对象 or select
   *
   * @static
   * @param [any] field 键名列表
   * @param [any] value 键值列表
   * @returns [Circle] 圈子对象
   * @memberof Circle
   */
  static async getByOr(fields, values) {
    try {
      if (!fields || !values || fields.length !== values.length) {
        throw new ModelError(400, 'Dao call error'); // bad call
      }
      const wherePart = fields.reduce((cum, field, index) => {
        const tempStr = index > 0 ? ' or ' : ' ';
        return `${cum}${tempStr}?? = ?`;
      }, '');
      const queryParamsArr = [];
      for (let i = 0; i < fields.length;) {
        queryParamsArr.push(fields[i]);
        queryParamsArr.push(values[i]);
        i += 1;
      }
      const sql = `Select * From circle Where${wherePart}`;
      const [circles] = await global.db.query(sql, queryParamsArr);
      return circles;
    } catch (e) {
      switch (e.code) {
        case 'ER_BAD_FIELD_ERROR': throw new ModelError(403, `Unrecognised user fields ${fields}`);
        default: Lib.logException('Circle.getBy', e); throw new ModelError(500, e.message);
      }
    }
  }

  /**
   * 插入Circle
   *
   * @static
   * @param {any} values circle对象
   * @returns 插入成功的ID
   * @memberof Circle
   */
  static async insert(values) {
    try {
      const [result] = await global.db.query('Insert Into circle Set ?', [values]);
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
   * 更新Circle
   *
   * @static
   * @param {any} id 对应circle id
   * @param {any} values 对应键值对象
   * @memberof Circle
   */
  static async update(id, values) {
    try {
      await global.db.query('Update circle Set ? Where id = ?', [values, id]);
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

  static async findAllWithCircleName(circleName) {
    try {
      const circle = await global.db.query('SELECT c.id, c.name, c.intro, c.logUrl, c.createdAt, u.id as creatorId, u.name as creatorName FROM  circle as c, user as u where c.name LIKE ? and c.creator = u.id;', [`%${circleName}%`]);
      console.log(circle);
      return circle;
    } catch (e) {
      switch (e.code) {
        case 'ER_BAD_FIELD_ERROR': throw new ModelError(403, 'Unrecognised circleName');
        default: Lib.logException('Circle.findAllWithCircleName', e); throw new ModelError(500, e.message);
      }
    }
  }
}

module.exports = Circle;
