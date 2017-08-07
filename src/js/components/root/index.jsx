/* eslint react/prop-types: 0 */
import React from 'react';
import { Provider } from 'react-redux';
import App from '../../layoutComponent/app';

/**
 * 根组件， 路由接入，store接入等
 */
const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);


export default Root;
