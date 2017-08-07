/**
 * 页面布局合成组件，进行nav，header，bar等的布局位置规划
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import classNames from 'classnames/bind';
import eventemit from 'Util/event';
import { getGlobalNavCollapse } from 'Reducers';
import Toast from 'Components/toast';
import 'Styles/app.scss';
import Header from '../header';
import Nav from '../nav';
import Style from './index.scss';
import AppRouter from '../../routes';

const cx = classNames.bind(Style);

const App = (props) => {
  const areaClassName = cx('app-appContainer', { 'app-appContainer-navCollapse': props.navCollapse });
  return (<Router>
    <div onClick={() => { eventemit.emit('documentclick'); }} role="presentation">
      <Toast />
      <Header />
      <div className={areaClassName}>
        <Nav />
        <div className={Style['app-displayArea']}>
          <AppRouter />
        </div>
      </div>
    </div>
  </Router>);
};
App.propTypes = {
  navCollapse: PropTypes.bool.isRequired,
};
const mapStateToAppProps = state => ({
  navCollapse: getGlobalNavCollapse(state),
});
const AppComponent = connect(mapStateToAppProps)(App);
export default AppComponent;
