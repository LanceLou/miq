import { combineReducers } from 'redux';

/**
 * 全局toast对应的reducer
 * @param {*} state 当前reducer对应的state
 * @param {*} action .message: toast对应的文案，.toastType: toast类型，1: success 2: error以配置不同的提示配色
 */
const toastMessage = (state = null, action) => {
  switch (action.type) {
    case 'GLOBAL_MESSAGE_TOAST':
      return {
        message: action.message,
        toastType: action.toastType,
      };
    default:
      return state;
  }
};

const userDetail = (state = {}, action) => {
  switch (action.type) {
    case 'USERDETAIL_FETCH_SECCESS':
      return action.response;
    default:
      return state;
  }
};

/**
 * 导航栏开关state
 * @param {*} state
 * @param {*} action
 */
const navCollapse = (state = false, action) => {
  switch (action.type) {
    case 'GLOBAL_NAV_COLLAPSE':
      return true;
    case 'GLOBAL_NAV_OPRN':
      return false;
    default:
      return state;
  }
};

const userCircles = (state = [], action) => {
  switch (action.type) {
    case 'USERCIRCLES_FETCH_SUCCESS':
      return action.response;
    default:
      return state;
  }
};

export default combineReducers({
  toastMessage,
  userDetail,
  navCollapse,
  userCircles,
});

export const getNavCollapse = state => state.navCollapse;
export const getToastMessage = state => state.toastMessage;
export const getUserDetail = state => state.userDetail;
export const getUserCircles = state => state.userCircles;
