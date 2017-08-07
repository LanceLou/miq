import React from 'react';
import { Route } from 'react-router-dom';
import { Circle } from '../layoutComponent/displayContent';

import CircleJoin from '../layoutComponent/circleJoin';
import CircleCreate from '../layoutComponent/circleCreate';

const AppRouter = () => (
  <div>
    <Route exact path="/" component={Circle} />
    <Route path="/create" component={CircleCreate} />
    <Route path="/join" component={CircleJoin} />
  </div>
);

export default AppRouter;
