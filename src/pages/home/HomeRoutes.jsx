// 理财模块路由
import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import HomePage from './HomePage';

const HomeRoutes = () => (
  <Switch>
    <Route exact path="/home" component={HomePage} />
  </Switch>
);

export default HomeRoutes;
