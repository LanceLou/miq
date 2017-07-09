import { combineReducers } from 'redux';
/**
 * 搜索栏相关状态管理reducer
 */

const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'SEARCH_FETCH_REQUEST':
      return true;
    case 'SEARCH_FETCH_SUCCESS':
    case 'SEARCH_FETCH_FAILURE':
      return false;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'SEARCH_FETCH_FAILURE':
      return action.message;
    case 'SEARCH_FETCH_SUCCESS':
    case 'SEARCH_FETCH_REQUEST':
      return null;
    default:
      return state;
  }
};

const result = (state = [], action) => {
  switch (action.type) {
    case 'SEARCH_FETCH_SUCCESS':
      return action.response;
    case 'SEARCH_FETCH_FAILURE': // 搜索失败，原来结果质控
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  errorMessage,
  result,
});

export const getIsFetching = state => state.isFetching;
export const getResult = state => state.result;
export const getErrorMessage = state => state.errorMessage;
