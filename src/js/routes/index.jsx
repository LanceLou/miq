import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../layoutComponent/app';
import { Circle } from '../layoutComponent/displayContent';

const AppRouter = () => (<Router>
  <App>
    <Route exex path="/" component={Circle} />
  </App>
</Router>);

export default AppRouter;
