import { combineReducers } from 'redux';
import search, * as fromSearch from './search';
import global, * as fromGlobal from './global';

/**
 * 根reducer
 */
const indexReducer = combineReducers({
  search,
  global,
});

export default indexReducer;


// index -> Selector
/**
 * search -> isFetching
 * @param {*} state
 */
export const getSearchIsFetching = state => fromSearch.getIsFetching(state.search);

/**
 * search -> errorMessagr
 * @param {*} state
 */
export const getSearchErrorMessage = state => fromSearch.getErrorMessage(state.search);

/**
 * search -> result
 * @param {*} state
 */
export const getSearchResult = state => fromSearch.getResult(state.search);

/**
 * global -> toastMessage
 * @param {*} state
 */
export const getGlobalToastMessage = state => fromGlobal.getToastMessage(state.global);

/**
 * global -> userDetail
 * @param {*} state
 */
export const getGlobalUserDetail = state => fromGlobal.getUserDetail(state.global);

/**
 * global -> navCollapse
 * @param {*} state
 */
export const getGlobalNavCollapse = state => fromGlobal.getNavCollapse(state.global);

/**
 * global -> userCircles
 * @param {*} state
 */
export const getGlobalUserCircles = state => fromGlobal.getUserCircles(state.global);
