/**
 * 主题相关api
 */
import Fetch from './commons';

const baseUrl = {
  topic: '/xhr/topic.json',
  topicFile: '/xhr/topicFile.json',
  topicCollect: '/xhr/collect.json',
};


/**
 * 获取当前的topic，分页加载by: count, endTime
 */
export const getTopics = Fetch.get(baseUrl.topic);

/**
 * 更新，by topic，可部分
 */
export const updateToipc = Fetch.patch(baseUrl.topic);

/**
 * 删除topic。by： id
 */
export const deleteTopic = Fetch.delete(baseUrl.topic);

/**
 * 添加Topic，by Toipc
 */
export const addTopic = Fetch.post(baseUrl.topic);

/**
 * 添加文件，文件上传完之后插入topic，文件无法单独上传，需跟随Topic
 */
export const uplodaFile = Fetch.postByFormData(baseUrl.topicFile);

/**
 * 收藏主题
 */
export const collectTopic = Fetch.post(baseUrl.topicCollect);

/**
 * 取消收藏
 */
export const cancelCollectTopic = Fetch.delete(baseUrl.topicCollect);

