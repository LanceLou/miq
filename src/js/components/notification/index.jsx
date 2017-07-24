import React from 'react';
import classNames from 'classnames/bind';

import eventemit from 'Util/event';
import { getUserMessage } from 'Api/user.api';

import Style from './index.scss';

const cx = classNames.bind(Style);

class NotificationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationList: null,
      isShowNotiBrefList: false,
    };
  }
  componentWillMount() {
    const me = this;
    getUserMessage().then((data) => {
      this.setState({
        notificationList: data,
      });
    }, (error) => {
      // 全局性toast调用
      console.log(error);
      this.setState({
        notificationList: [],
      });
    });
    eventemit.on('documentclick', () => {
      me.setState({
        isShowNotiBrefList: false,
      });
    });
  }
  handlerIconClick = (ev) => {
    this.setState({
      isShowNotiBrefList: !this.state.isShowNotiBrefList,
    });
    ev.stopPropagation();
  }
  render() {
    const notificationList = this.state.notificationList;
    const noticeListClassName = cx({
      'm-motiList': true,
      'm-motiList-nothing': notificationList && notificationList.length <= 0,
    });
    return (
      <div className={Style['m-notifContainer']}>
        <span className={cx({ 'm-noticeIcon': true, 'element-outline_none': true })} onClick={this.handlerIconClick} role="button" tabIndex="-1">
          {notificationList && notificationList.length > 0 && <em />}
        </span>
        { this.state.isShowNotiBrefList &&
        <div className={cx({ 'm-notiContent': true, 'element-outline_none': true })} onClick={ev => ev.stopPropagation()} role="presentation" tabIndex="-1">
          <div className={Style['m-notiHeader']}>
            <h5>通知</h5>
            <span className={Style['m-notiHeader-resolveAll']} onClick={this.resolveAll} role="button" tabIndex="-1" />
          </div>
          <ul className={noticeListClassName}>
            {notificationList &&
            notificationList.map(notification => (<li key={notification.id}>
              {notification.brief}
            </li>))}
          </ul>
          <div className={Style['m-noticeFooter']}>查看全部</div>
        </div>
        }
      </div>
    );
  }
}

export default NotificationComponent;
