/**
 * 搜索栏组件，redux接入
 */
import React from 'react';
import Uuid from 'uuid/v4';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tools from 'Util/tool';
import * as action from 'Actions/search';
import Style from './index.scss';
import ReminderList from './reminderList';

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    let reminderList = Tools.getDataFromLocalStorage('searchReminderList');
    console.log(reminderList);
    reminderList = reminderList || [];
    this.state = {
      searchContent: '', // 搜索内容
      reminderList, // 搜索提示
      showRemender: false,
    };
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
  handlerShowRemender = () => {
    this.setState({
      showRemender: true,
    });
  }
  handlerSearch = () => {
    const value = this.state.searchContent;
    // 开启搜索

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
    this.props.fetchSearchResult(keyword);
  }
  render() {
    return (<div className={Style.searchContainer}>
      <input
        type="text"
        placeholder="搜索圈子、文件、主题"
        value={this.state.searchContent}
        onChange={this.onChange}
        onFocus={this.handlerShowRemender}
      />
      <div className={Style.search_btn} onClick={this.handlerSearch} role="button" tabIndex="-1" />
      { this.state.reminderList.length > 0 && this.state.showRemender &&
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
};

const SearchComponentWithRedux = connect(
  undefined,
  action,
)(SearchComponent);

export default SearchComponentWithRedux;
