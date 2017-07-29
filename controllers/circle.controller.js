const userCircle = require('../models/userCircle');
/**
 * -------------------------------------------------------------
 * circle.controller.js
 * 圈子相关的controller
 * 新建圈子，圈子添加标签，圈子上传文件
 * -------------------------------------------------------------
 */

const getUserAllCircles = async (ctx) => {
  try {
    const userId = ctx.session.userId;
    const circles = await userCircle.findUserAllCircleByUid(userId);
    ctx.body = circles;
  } catch (e) {
    ctx.throw(500, e);
  }
};

module.exports = {
  getUserAllCircles,
};
