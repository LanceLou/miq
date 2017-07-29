import Fetch from './commons';

const baseUrl = {
  userDetail: '/xhr/user/detail.json',
  userMessage: '/xhr/user/message.json',
  userCircles: '/xhr/user/circles.json',
};


/**
 * 获取用户基础信息
 *
 * 用户通知相关:
 *                 分类                                               解决方案
 *  圈子主题未读型(文件上传，圈子创建，发表主题)        用户圈子关系表字段(circle_message_readedId: 前提，圈子主题id自增)
 *  有参与的评论更新，这个直接推入message表           推入message表，用户登录去相应的数据
 *
 *  返回数据结构组织:
 *  圈子id， 主题id，brief。
 */

/**
 * 信息查询(通知数, 所有的圈子，及用户基础信息)
 */
export const getUserDetail = Fetch.get(baseUrl.userDetail);

/**
 * 用户通知详细
 */
export const getUserMessage = Fetch.get(baseUrl.userMessage);

export const getUserCircles = Fetch.get(baseUrl.userCircles);
