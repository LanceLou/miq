import * as userApi from 'Api/user.api';
import lodash from 'lodash';
/**
 * 全局性action creator
 * 如：Toast提示，全局User基础信息，等
 */

/**
 * 全局Toast Message ac
 */
export const globalToastMessage = toastMessage => lodash.throttle((dispatch) => {
  console.log('dispatch toast lalala');
  dispatch({
    type: 'GLOBAL_MESSAGE_TOAST',
    ...toastMessage,
  });
}, 5 * 1000);

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

/**
 * 用户基本信息获取(Details)
 */
export const getUserDetail = () => dispatch => userApi.getUserDetail().then((response) => {
  dispatch({
    type: 'USERDETAIL_FETCH_SECCESS',
    response,
  });
  return response;
});

/**
 * 用户所加入的圈子信息获取
 */
export const getUserCircles = () => dispatch => userApi.getUserCircles().then((response) => {
  dispatch({
    type: 'USERCIRCLES_FETCH_SUCCESS',
    response,
  });
});
