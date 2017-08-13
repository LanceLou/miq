/* eslint no-underscore-dangle: 0 */
const userCircle = require('../models/userCircle');
const circle = require('../models/circle');
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

const createCircle = async (ctx) => {
  try {
    const userId = ctx.session.userId;
    const params = Object.assign(ctx.request.body);
    delete params._csrf;
    params.creator = userId;
    params.createdAt = new Date();
    params.status = 1;
    const circleId = await circle.insert(params);
    ctx.body = { id: circleId };
  } catch (e) {
    ctx.throw(500, e);
  }
};

const _getCircleMenbers = async (bcircle) => {
  const localCircle = bcircle;
  const acircle = await circle.getCircleMenbers(bcircle.id, 1, 10);
  localCircle.circleMenbers = acircle;
  return localCircle;
};

const search = async (ctx) => {
  const kv = ctx.query.keyword;
  let bCircles = [];
  try {
    const circles = await circle.getCircleByCreatorName(kv);
    circles.concat(await circle.findAllWithCircleName(kv));
    for (let i = 0; i < circles.length; i += 1) {
      bCircles.push(_getCircleMenbers(circles[i]));
    }
    bCircles = await Promise.all(bCircles);
    ctx.body = bCircles;
  } catch (e) {
    ctx.throw(500, e);
  }
};

module.exports = {
  getUserAllCircles,
  createCircle,
  search,
};
