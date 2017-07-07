import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../layoutComponent/app';
import { Circle } from '../layoutComponent/displayContent';

const AppRouter = () => (<Router path="/" component={App}>
  <Route path="/index" component={Circle} />
</Router>);

export default AppRouter;
