/**
 * Topic 评论相关API
 */
import Fetch from './commons';

const baseUrl = {
  circle: '/xhr/circle.json',
};

/**
 * 添加circle
 */
export const addCircle = Fetch.post(baseUrl.circle);

/**
 * 更新circle
 */
export const updateCircle = Fetch.put(baseUrl.circle);

