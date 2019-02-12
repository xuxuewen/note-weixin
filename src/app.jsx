// 项目入口文件
/* eslint react/no-children-prop: 0 */
// 处理移动端点击延迟
import 'babel-polyfill';
import FastClick from 'fastclick';
import React from 'react';
import ReactDom from 'react-dom';
import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Util from './Util';

// 导入通用样式
import './common/style/common.scss';
import './common/style/normalize.css';
import './common/style/animate.scss';

// 最新的页面配置方式
import {
    HomeRoutesLoader,
    PlayChatLoader
} from './pages/PageLoader';

// 设置fastclick
FastClick.attach(document.body, {});

const RoutesWrap = () => (
    <Router history={history}>
        <Route
            children={({location}) => {
                Util.updatePageTitle(location);
                return (
                    <Switch>
                      <Route  path="/" component={PlayChatLoader} />
                      <Route path="/home" component={HomeRoutesLoader}/>
                    </Switch>
                );
            }}
        />
    </Router>
);

ReactDom.render(
    <RoutesWrap/>,
    document.getElementById('app')
);
