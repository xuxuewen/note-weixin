// 玩呗模块路由
import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import PlayChatPage from './PlayChatPage';
import GoodsDetailPage from './PlayGoodsDetailPage';

const PlayChatRoutes = () => (
  <Switch>
    <Route exact path="/" component={PlayChatPage} />
    <Route exact path="/play/goodsdetail/:id" component={GoodsDetailPage} />
  </Switch>
);

export default PlayChatRoutes;
