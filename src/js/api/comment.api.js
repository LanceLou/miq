/**
 * Topic 评论相关API
 */
import Fetch from './common';

const baseUrl = {
  topic: '/xhr/comment',
  like: '/xhr/coment/like',
};

/**
 * 添加评论
 */
export const addComment = Fetch.post(baseUrl.topic);

/**
 * 删除评论
 */
export const deleteComment = Fetch.delete(baseUrl.topic);

/**
 * 点赞Topic
 */
export const likeTopic = Fetch.post(baseUrl.like);

/**
 * 取消点赞Topic
 */
export const dislikeTopic = Fetch.delete(baseUrl.like);
