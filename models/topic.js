const Lib = require('../lib/lib.js');
const ModelError = require('./modelerror.js');

/**
 * 话题/问题model
 * 对应数据表: topic
 * @class Circle
 */
class Topic {
  /**
   * 根据id获取话题/提问
   *
   * @static
   * @param {any} id Topic id
   * @memberof Topic
   */
  static async get(id) {
    const [topics] = await global.db.query('Select * From topic Where id = ?', [id]);
    const topic = topics[0];
    return topic;
  }

  /**
   * 根据Topic的某些field获取Topic对象s
   *
   * @static
   * @param {any} fields 键名列表
   * @param {any} values 键值列表
   * @memberof Topic
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
      const sql = `Select * From topic Where${wherePart}`;
      const [circles] = await global.db.query(sql, queryParamsArr);
      return circles;
    } catch (e) {
      switch (e.code) {
        case 'ER_BAD_FIELD_ERROR': throw new ModelError(403, `Unrecognised topic fields ${fields}`);
        default: Lib.logException('Topic.getBy', e); throw new ModelError(500, e.message);
      }
    }
  }

  /**
   * 根据用户id获取其所有的问题(跨圈子，并不特指某一个圈子)
   *
   * @static
   * @param {any} userId 对应用户id
   * @memberof Topic
   */
  static async getAllTopicByUserId(userId) {
    const [topics] = await global.db.query('Select * From topic Where creator = ? and status = 1', [userId]);
    return topics;
  }

  /**
   * 插入Topic
   *
   * @static
   * @param {any} values Topic对象
   * @memberof Topic
   */
  static async insert(values) {
    try {
      const [result] = await global.db.query('Insert Into topic Set ?', [values]);
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
   * 更新Topic
   *
   * @static
   * @param {any} id 对应Topic id
   * @param {any} values 对应键值对象
   * @memberof Topic
   */
  static async update(id, values) {
    try {
      await global.db.query('Update topic Set ? Where id = ?', [values, id]);
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

  static async removeTopic(id) {
    try {
      await global.db.query('Update topic Set statue = 2 Where id = ?', [id]);
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
}

module.exports = Topic;
