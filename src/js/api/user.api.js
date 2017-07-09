import Fetch from './common';

const baseUrl = {
  userDetail: '/xhr/user/detail',
  userMessage: '/xhr/user/message',
};

/**
 * 获取用户基础信息
 *
 * 用户通知相关:
 *                 分类                                               解决方案
 *  圈子主题未读型(文件上传，圈子创建，发表主题)        用户圈子关系表字段(circle_message_readedId: 前提，圈子主题id自增)
 *  有参与的评论更新，这个直接推入message表           推入message表，用户登录去相应的数据
 */

/**
 * 信息查询(通知数, 所有的圈子，及用户基础信息)
 */
export const getUserDetail = Fetch.get(baseUrl.userDetail);

/**
 * 用户通知详细
 */
export const getUserMessage = Fetch.get(baseUrl.userMessage);
