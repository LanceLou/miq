/**
 * 页面布局合成组件，进行nav，header，bar等的布局位置规划
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import eventemit from 'Util/event';
import { getGlobalNavCollapse } from 'Reducers';
import { getUserDetail, getUserCircles } from 'Actions/global';
import 'Styles/app.scss';
import Header from '../header';
import Nav from '../nav';
import Style from './index.scss';

const cx = classNames.bind(Style);

const App = (props) => {
  const areaClassName = cx('app-appContainer', { 'app-appContainer-navCollapse': props.navCollapse });
  // 做一些全局数据初始化的工作：如用户基础信息获取，圈子信息获取等
  props.getUserDetail(); // 用户基础信息
  props.getUserCircles(); // 用户圈子信息
  return (<div onClick={() => { eventemit.emit('documentclick'); }} role="presentation">
    <Header />
    <div className={areaClassName}>
      <Nav />
      <div className={Style['app-displayArea']}>{props.children}</div>
    </div>
  </div>);
};
App.propTypes = {
  children: PropTypes.element.isRequired,
  getUserDetail: PropTypes.func.isRequired,
  navCollapse: PropTypes.bool.isRequired,
  getUserCircles: PropTypes.func.isRequired,
};
const mapStateToAppProps = state => ({
  navCollapse: getGlobalNavCollapse(state),
});
const AppComponent = connect(mapStateToAppProps, { getUserDetail, getUserCircles })(App);
export default AppComponent;
