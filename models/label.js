const Lib = require('../lib/lib.js');
const ModelError = require('./modelerror.js');

/**
 * 标签model
 * 对应数据表: label
 * @class Label
 *
 * 数据操作相关逻辑备注:
 *  Label: 只能有圈子创建者进行设置
 */
class Label {
  /**
   * 根据id获取Label圈子
   * @static
   * @param {any} id Label id
   * @memberof Label
   */
  static async get(id) {
    const [labels] = await global.db.query('Select * From label Where id = ?', [id]);
    const label = labels[0];
    return label;
  }

  /**
   * 根据Label的某些field获取Label对象
   * @static
   * @param [any] field 键名列表
   * @param [any] value 键值列表
   * @returns [Label] Label对象
   * @memberof Label
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
      const sql = `Select * From label Where${wherePart}`;
      const [labels] = await global.db.query(sql, queryParamsArr);
      return labels;
    } catch (e) {
      switch (e.code) {
        case 'ER_BAD_FIELD_ERROR': throw new ModelError(403, `Unrecognised user fields ${fields}`);
        default: Lib.logException('Circle.getBy', e); throw new ModelError(500, e.message);
      }
    }
  }

  /**
   * 插入Label
   *
   * @static
   * @param {any} values Label对象
   * @returns 插入成功的ID
   * @memberof Label
   */
  static async insert(values) {
    try {
      const [result] = await global.db.query('Insert Into label Set ?', [values]);
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
   * 更新Label
   *
   * @static
   * @param {any} id 对应Label id
   * @param {any} values 对应键值对象
   * @memberof Label
   */
  static async update(id, values) {
    try {
      await global.db.query('Update label Set ? Where id = ?', [values, id]);
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

module.exports = Label;
