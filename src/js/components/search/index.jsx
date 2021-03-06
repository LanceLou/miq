/**
 * 搜索栏组件，redux接入
 */
import React from 'react';
import Uuid from 'uuid/v4';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tools from 'Util/tool';
import GApi from 'Util/platform';
import eventemit from 'Util/event';
import { getUserDetail, getUserCircles, globalToastMessage } from 'Actions/global';
import * as action from 'Actions/search';
import Style from './index.scss';
import ReminderList from './reminderList';


class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    let reminderList = Tools.getDataFromLocalStorage('searchReminderList');
    reminderList = reminderList || [];
    this.state = {
      searchContent: '', // 搜索内容
      reminderList, // 搜索提示
      showReminder: false,
    };
  }
  componentDidMount() {
    const me = this;
    // 全局文档被点击，关闭remenders
    eventemit.on('documentclick', () => {
      me.setState({
        showReminder: false,
      });
    });
    // 做一些全局数据初始化的工作：如用户基础信息获取，圈子信息获取等
    // 用户基础信息
    this.props.getUserDetail().then((data) => {
      if (data.thirdpartUniq.indexOf('gmail.com') > 0) { // 初始化Google认证相关
        GApi.load('auth2', () => {
          GApi.auth2.init();
        });
      }
    }, () => {
      this.props.globalToastMessage({
        message: '获取用户信息失败！',
        toastType: 2,
      });
    });
    this.props.getUserCircles(undefined, () => {
      this.props.globalToastMessage({
        message: '圈子信息获取失败啦！',
        toastType: 2,
      });
    }); // 用户圈子信息
  }
  /**
   * fat arrow function and ES2015+ class properties.(property initializer.)
   *
   * @memberof SearchComponent
   */
  onChange = (ev) => {
    this.setState({
      searchContent: ev.target.value,
    });
  }
  handlerReminderItemClick = (text) => {
    this.searchByKV(text);
  }
  handlerRemoveReminderItem = (id) => {
    let reminderList = this.state.reminderList;
    reminderList = reminderList.filter(remenderItem => remenderItem.id !== id);
    this.setState({
      reminderList,
    });
    Tools.setDataTOLocalStorage('searchReminderList', reminderList);
  }
  handlerShowReminder = () => {
    this.setState({
      showReminder: true,
    });
  }
  handlerSearch = () => {
    const value = this.state.searchContent;
    // 开启搜索
    this.searchByKV(value);
    // 存储localstate搜索记录
    const reminderList = this.state.reminderList;
    reminderList.unshift({
      id: Uuid(),
      text: value,
    });
    Tools.setDataTOLocalStorage('searchReminderList', reminderList);
    this.setState({
      reminderList,
    });
  }
  searchByKV = (keyword) => {
    const me = this;
    this.props.fetchSearchResult(keyword).then(() => {
      me.setState({
        showReminder: false,
      });
    });
  }
  render() {
    return (<div className={Style.searchContainer}>
      <input
        type="text"
        placeholder="搜索圈子、文件、主题"
        value={this.state.searchContent}
        onChange={this.onChange}
        onClick={ev => ev.stopPropagation()}
        onFocus={this.handlerShowReminder}
      />
      <div className={Style.search_btn} onClick={this.handlerSearch} role="button" tabIndex="-1" />
      { this.state.reminderList.length > 0 && this.state.showReminder &&
      <ReminderList
        removeReminderItem={this.handlerRemoveReminderItem}
        selctReminderItem={this.handlerReminderItemClick}
        reminderList={this.state.reminderList}
      />
      }
    </div>);
  }
}

SearchComponent.propTypes = {
  fetchSearchResult: PropTypes.func.isRequired,
  getUserDetail: PropTypes.func.isRequired,
  getUserCircles: PropTypes.func.isRequired,
  globalToastMessage: PropTypes.func.isRequired,
};

const SearchComponentWithRedux = connect(
  undefined,
  { ...action, getUserDetail, getUserCircles, globalToastMessage },
)(SearchComponent);

export default SearchComponentWithRedux;
