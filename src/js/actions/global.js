import * as userApi from 'Api/user.api';
/**
 * 全局性action creator
 * 如：Toast提示，全局User基础信息，等
 */

/**
 * 全局Toast Message ac
 */
export const globalToastMessage = (message, toastType) => (dispatch) => {
  dispatch({
    type: 'GLOBAL_MESSAGE_TOAST',
    message,
    toastType,
  });
};

/**
 * 导航栏开关flag
 * @param {*} flag nav导航栏开关flag
 */
export const changeNavCollapse = flag => (dispatch) => {
  const type = flag ? 'GLOBAL_NAV_COLLAPSE' : 'GLOBAL_NAV_OPRN';
  dispatch({
    type,
  });
};

export const getUserDetail = () => dispatch => userApi.getUserDetail().then((response) => {
  dispatch({
    type: 'USERDETAIL_FETCH_SECCESS',
    response,
  });
});
