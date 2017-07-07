import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from '../../routes';
/**
 * 根组件， 路由接入，store接入等
 */
console.log(AppRouter);
const Root = ({ store }) => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default Root;
