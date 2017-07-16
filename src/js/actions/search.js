import * as searchApi from 'Api/search.api';
import { getSearchIsFetching } from 'Reducers';

/**
 * search 相关的action creator
 */
export const fetchSearchResult = keyword => (dispatch, getState) => {
  if (getSearchIsFetching(getState())) {
    return Promise.resolve();
  }
  dispatch({
    type: 'SEARCH_FETCH_REQUEST',
  });
  return searchApi.searchByParams({ keyword }).then((response) => {
    dispatch({
      type: 'SEARCH_FETCH_SUCCESS',
      response,
    });
  },
  (error) => {
    dispatch({
      type: 'SEARCH_FETCH_FAILURE',
      message: error.message || '搜索失败',
    });
  });
};
