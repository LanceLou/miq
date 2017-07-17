/**
 * 页面布局合成组件，进行nav，header，bar等的布局位置规划
 */
import React from 'react';
import PropTypes from 'prop-types';
import eventemit from 'Util/event';
import 'Styles/app.scss';
import Header from '../header';
import Nav from '../nav';
import styles from './index.scss';

const App = props => (<div onClick={() => { eventemit.emit('documentclick'); }} role="presentation">
  <Header />
  <div className={styles.appContainer}>
    <Nav />
    <div>{props.children}</div>
  </div>
</div>);
App.propTypes = {
  children: PropTypes.element.isRequired,
};
export default App;
