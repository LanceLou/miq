/**
 * 页面布局合成组件，进行nav，header，bar等的布局位置规划
 */
import React from 'react';
import PropTypes from 'prop-types';
import 'Styles/app.scss';
import Header from '../header';
import Nav from '../nav';

import styles from './index.scss';

const App = props => (<div>
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
