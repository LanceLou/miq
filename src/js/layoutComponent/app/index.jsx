/**
 * 页面布局合成组件，进行nav，header，bar等的布局位置规划
 */
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import Nav from '../nav';
import DisplayContent from '../displayContent';

import styles from './index.scss';

const App = props => (<div>
  <Header />
  <div className={styles.appContainer}>
    <Nav />
    <DisplayContent>{props.children}</DisplayContent>
  </div>
</div>);
App.propTypes = {
  children: PropTypes.shape.isRequired,
};

export default App;
