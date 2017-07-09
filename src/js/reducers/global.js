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

export default combineReducers({
  toastMessage,
  userDetail,
});

export const getToastMessage = state => state.toastMessage;
export const getUserDetail = state => state.userDetail;
