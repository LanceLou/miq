const Lib = require('../lib/lib.js');
const ModelError = require('./modelerror.js');

class LabelTopic {
  static async getMessageByCTMap(circle, readedTopId) {
    const message = {};
    [message.topic] = await global.db.query('select * from topic where circle = ? and id > ?', [circle, readedTopId]);
    return message;
  }
  /**
   * 根据id获取 LabelTopic
   *
   * @static
   * @param {any} id LabelTopic id
   * @memberof LabelTopic
   */
  static async get(userId) {
    try {
      const [message] = await global.db.query('select * from message where id = ?', [userId]);
      const [circleTopicReadedMap] = await global.db.query('select circle, topic_readed_id from user_circle where user = ?', [userId]);
      let ctMessage = []; // 根据圈子id和最后已读topic id的map来获取对应的未读topic
      for (let i = 0; i < circleTopicReadedMap.length; i += 1) {
        ctMessage.push(LabelTopic.getMessageByCTMap(circleTopicReadedMap[i].circle,
          circleTopicReadedMap[i].topic_readed_id));
      }
      ctMessage = await Promise.all(ctMessage);
      message.concat(ctMessage);
      return message;
    } catch (e) {
      switch (e.code) {
        case 'ER_BAD_FIELD_ERROR': throw new ModelError(403, 'Unrecognised field');
        default: Lib.logException('user.getBy', e); throw new ModelError(500, 'DB error');
      }
    }
  }
}

module.exports = LabelTopic;
