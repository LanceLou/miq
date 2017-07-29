const userModel = require('../models/user');
const messageModel = require('../models/message');
/**
 * -------------------------------------------------------------
 * topic.controller.js
 * 用户相关controller(非认证相关)
 * 用户个人信息修改，查询
 * 用户相关信息查询(我的主题，我的收藏，我的数据等)
 * -------------------------------------------------------------
 */

const getUserDetail = async (ctx) => {
  const userId = ctx.session.userId;
  let user = null;
  try {
    user = await userModel.get(userId);
    ctx.body = user;
  } catch (e) {
    //  print log and return error message
    ctx.throw(500, e);
  }
};

const getUserMessage = async (ctx) => {
  const userId = ctx.session.userId;
  let messages = null;
  try {
    messages = await messageModel.get(userId);
    ctx.body = messages;
  } catch (e) {
    ctx.throw(500, e);
  }
};

module.exports = {
  getUserDetail,
  getUserMessage,
};
