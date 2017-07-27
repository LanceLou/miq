/**
 * 页面布局合成组件，进行nav，header，bar等的布局位置规划
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import eventemit from 'Util/event';
import { getGlobalNavCollapse } from 'Reducers';
import { getUserDetail } from 'Actions/global';
import 'Styles/app.scss';
import Header from '../header';
import Nav from '../nav';
import Style from './index.scss';

const cx = classNames.bind(Style);

const App = (props) => {
  const areaClassName = cx('app-appContainer', { 'app-appContainer-navCollapse': props.navCollapse });
  props.getUserDetail();
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
};
const mapStateToAppProps = state => ({
  navCollapse: getGlobalNavCollapse(state),
});
const AppComponent = connect(mapStateToAppProps, { getUserDetail })(App);
export default AppComponent;
