import Fetch from './commons';

const searchTopicUrl = '/xhr/search/composite.json';
const searchCircleUrl = '/xhr/search/circle.json';

/**
 * 关键词搜索接口(圈子，文件，主题)
 */
export const searchByParams = Fetch.get(searchTopicUrl);

/**
 * 圈子搜索借口
 */
export const searchCircle = Fetch.get(searchCircleUrl);

