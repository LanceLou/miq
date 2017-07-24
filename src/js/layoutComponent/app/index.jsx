/**
 * 页面布局合成组件，进行nav，header，bar等的布局位置规划
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import eventemit from 'Util/event';
import { getUserDetail } from 'Actions/global';
import 'Styles/app.scss';
import Header from '../header';
import Nav from '../nav';
import styles from './index.scss';

// 初始化用户信息
getUserDetail();

const App = (props) => {
  props.getUserDetail();
  return (<div onClick={() => { eventemit.emit('documentclick'); }} role="presentation">
    <Header />
    <div className={styles.appContainer}>
      <Nav />
      <div>{props.children}</div>
    </div>
  </div>);
};
App.propTypes = {
  children: PropTypes.element.isRequired,
  getUserDetail: PropTypes.func.isRequired,
};
const AppComponent = connect(null, { getUserDetail })(App);
export default AppComponent;
