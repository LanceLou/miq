import React from 'react';
import PropTypes from 'prop-types';

import Style from './index.scss';

class Dialog extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.shape()),
    getHeaderElement: PropTypes.func,
    title: PropTypes.string,
  }
  getHeaderElement = () => {
    if (this.props.getHeaderElement) {
      this.getHeaderElement = this.props.getHeaderElement;
      return this.props.getHeaderElement();
    }
    return (<div className={Style.header}>
      <span className={Style.title}>{this.props.title || '提示'}</span>
      <span className={Style.closeBtn}>×</span>
    </div>);
  }
  getFooterElement = () => {

  }
  handlerMaskClick = () => {

  }
  handlerDialigClose = () => {
    // 处理弹窗关闭，同时对给出的调用方的回调函数(或promise)进行处理

  }
  handlerConfirmClick = () => {
    // 处理弹窗确认点击，同时触发回调或promise

  }
  render() {
    return (<div>
      <div className={Style.mask} onClick={this.handlerMaskClick} role="presentation" />
      <div className={Style.dialogWrapper}>
        {this.getHeaderElement()}
        <div className={Style.dialogContent}>
          {this.props.children}
        </div>
        {this.getFooterElement()}
      </div>
    </div>);
  }
}

export default Dialog;
