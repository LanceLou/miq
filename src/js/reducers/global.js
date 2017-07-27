import { combineReducers } from 'redux';

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

export default combineReducers({
  toastMessage,
  userDetail,
  navCollapse,
});

export const getNavCollapse = state => state.navCollapse;
export const getToastMessage = state => state.toastMessage;
export const getUserDetail = state => state.userDetail;
