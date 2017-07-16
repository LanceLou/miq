import Fetch from './commons';

const baseUrl = '/xhr/search.json';

/**
 * 关键词搜索接口(圈子，文件，主题)
 */
export const searchByParams = Fetch.get(baseUrl);

