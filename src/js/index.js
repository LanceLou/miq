/* eslint jsx-filename-extension:0*/
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import Root from './components/root';

/**
 * 入口文件，store配置，dom插入
 */
const store = configureStore();

/*eslint-disable */
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
/*eslint-enable */
