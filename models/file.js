const Lib = require('../lib/lib.js');
const ModelError = require('./modelerror.js');

/**
 * 文件model
 * 对应数据表: file
 * @class File
 */
class File {
  /**
   * 根据id获取File
   *
   * @static
   * @param {any} id 圈子id
   * @memberof File
   */
  static async get(id) {
    const [files] = await global.db.query('Select * From file Where id = ?', [id]);
    const file = files[0];
    return file;
  }

  /**
   * 根据File的某些field获取File对象s
   *
   * @static
   * @param [any] field 键名列表
   * @param [any] value 键值列表
   * @returns [File] File对象
   * @memberof File
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
      const sql = `Select * From file Where${wherePart}`;
      const [files] = await global.db.query(sql, queryParamsArr);
      return files;
    } catch (e) {
      switch (e.code) {
        case 'ER_BAD_FIELD_ERROR': throw new ModelError(403, `Unrecognised user fields ${fields}`);
        default: Lib.logException('File.getBy', e); throw new ModelError(500, e.message);
      }
    }
  }

  /**
   * 插入File
   *
   * @static
   * @param {any} values File对象
   * @returns 插入成功的ID
   * @memberof File
   */
  static async insert(values) {
    try {
      const [result] = await global.db.query('Insert Into file Set ?', [values]);
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
          Lib.logException('File.insert', e);
          throw new ModelError(500, e.message); // Internal Server Error for uncaught exception
      }
    }
  }

  /**
   * 更新File
   *
   * @static
   * @param {any} id 对应File id
   * @param {any} values 对应键值对象
   * @memberof File
   */
  static async update(id, values) {
    try {
      await global.db.query('Update file Set ? Where id = ?', [values, id]);
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
          Lib.logException('File.update', e);
          throw new ModelError(500, e.message); // Internal Server Error for uncaught exception
      }
    }
  }

  /**
   * 根据圈子id获取所有相关的文件
   *
   * @static
   * @param {any} circleId 圈子id
   * @returns [File] 文件对象s
   * @memberof File
   */
  static async getFilesByCircleId(circleId) {
    const [files] = await global.db.query('Select * From file Where circle = ?', [circleId]);
    return files;
  }

  /**
   * 根据用户id获取所有相关的文件
   *
   * @static
   * @param {any} userId 用户id
   * @returns [File] 文件对象s
   * @memberof File
   */
  static async getFilesByUserId(userId) {
    const [files] = await global.db.query('Select * From file Where user = ?', [userId]);
    return files;
  }
}

module.exports = File;
