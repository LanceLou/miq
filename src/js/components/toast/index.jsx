import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { getGlobalToastMessage } from 'Reducers';
import Style from './index.scss';

const cx = classNames.bind(Style);

// 节流函数放到action creator中处理
// import lodash from 'lodash';

/**
 * 全局toast提示组件
 */

const Toast = (props) => {
  console.log(props);
  if (!props.errorMessage) {
    return <i />;
  }
  const toastClassName = cx({
    toast: true,
    'toast-success': props.errorMessage.toastType === 1,
    'toast-error': props.errorMessage.toastType === 2,
  });
  return (<div className={toastClassName}>
    {props.errorMessage.message};
  </div>);
};

const mapStateToToastProps = state => ({
  errorMessage: getGlobalToastMessage(state),
});

Toast.propTypes = {
  errorMessage: PropTypes.shape({
    toastType: PropTypes.number,
    message: PropTypes.string,
  }),
};

const ToastWithRedux = connect(
  mapStateToToastProps,
  null,
)(Toast);

export default ToastWithRedux;
