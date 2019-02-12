import lodash from 'lodash';
import routesData from './routesData.json5';
import dsBridge from 'dsbridge';
import {
  getSessionStorage,
} from 'mixin';

const Util = {
  // 更新页面的标题
  updatePageTitle(location) {
    const routeObj = lodash.find(routesData, o => o.url.indexOf(location.pathname) !== -1);
    let pageTitle = '会员商城';
    if (routeObj) {
      pageTitle = routeObj.title;
    } else {
      pageTitle = '会员商城';
    }
    document.title = pageTitle;
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'display: none; width: 0; height: 0;';
    const listener = () => {
      setTimeout(() => {
        iframe.removeEventListener('load', listener);
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 20000);
      }, 0);
    };
    iframe.addEventListener('load', listener);
    document.body.appendChild(iframe);
  },
  // 获取sessionkty
  getSessionKey() {
    if (typeof window.LtnApp === 'undefined') {
      return sessionStorage.getItem('ltn_sessionKey');
    }
    const res = window.LtnApp.getSessionKey();
    return res.sid;
  },
  // 是否登录
  isLogin() {
    if (typeof window.LtnApp === 'undefined') {
      return !!sessionStorage.getItem('ltn_sessionKey');
    }
    const res = window.LtnApp.getSessionKey();
    return !!res.sid;
  },
  // 去登录
  goLogin(url) {
    if (typeof window.LtnApp === 'undefined') {
      window.location.href = `/native/user_login/user_login.html?url=${url}`;
    } else {
      window.LtnApp.login({
        url
      });
    }
  },
  // 去投资
  goProductList() {
    if (typeof window.LtnApp === 'undefined') {
      window.location.href = '/native/home/home.html?';
    } else {
      window.LtnApp.gotoAppPage({ type: 'gotoProductList' });
    }
  },
  // 去我的投资
  goMyInvest() {
    if (typeof window.LtnApp === 'undefined') {
      window.location.href = '/native/account_viewall/account_viewall.html';
    } else {
      window.LtnApp.gotoAppPage({ type: 'gotoMyInvestment' });
    }
  },
  // 获取url里面的参数
  getSearchParts(key) {
    const url = decodeURI(window.location.pathname + window.location.search + window.location.hash);
    const arys = url.split('?');
    const paramsd = {};
    for (let i = 0; i < arys.length; i += 1) {
      if (i > 0) {
        const pars = arys[i].split('&');
        for (let j = 0; j < pars.length; j += 1) {
          paramsd[pars[j].split('=')[0]] = pars[j].split('=')[1];
        }
      }
    }
    const value = paramsd[key];
    return value;
  },

  AppApiAction (params){
      var u = navigator.userAgent;
      //u.indexOf('newUserAgent') != -1 //ios老版本新版本用dsbrige 版本号来判断
      // if(!backUrl){
      //   backUrl = window.location.href;
      // }
      // KwebViewActionTypeLogin         = 0,//登录
      // KwebViewActionTypeGoods         = 1,//跳转商品详情页面
      // KwebViewActionTypeStore         = 2,//跳转店铺详情页面
      // KwebViewActionTypeHome          = 3,//回到首页
      // KwebViewActionTypeBalance       = 4,//跳转余额
      // KwebViewActionTypeLoveHelp      = 5,//跳转爱心帮
      // KwebViewActionTypeShopCar       = 6,//跳转购物车
      // KwebViewActionTypeH5            = 7,//跳转H5
      // KwebViewActionTypeClass         = 8,//跳转分类列表
      // KwebViewActionTypeBuyNow        = 9,//立即购买
      // KwebViewActionTypeGetToken      = 10,//获取token
      // KwebViewActionTypeStareGoods    = 11,//分享商品
      // KwebViewActionTypeSaveImage     = 12,//保存图片
      // KwebViewActionTypegGoBack       = 13,//返回上级
      // KwebViewActionTypegGoBack       = 14,//获取userid
      // KwebViewActionTypegGoApp       = 17,//跳淘宝 京东 拼多多
      // KwebViewActionTypegGoShareText   = 18,//分享文字
      // MHGetUserCoordinate2D   = 19,//获取用户的经纬度
      // MHCopyPicShareWeChat   = 20,//分享图片到微信
      // MHGetInviteCode   = 21,//获取用户头像邀请码用户名

      if (u.indexOf('mbsh') != -1) {//ios
        if(params.index == "13"){
          const back = () =>{
            window.history.go(-1);
          }
          return back;
        }else{
          window.webkit.messageHandlers.KwebViewAction.postMessage(params);
        }
      } else if (window.ymapp) {//安卓
        if(params.index=='13'){
          const back = () =>{
            ymapp.KwebViewAction(JSON.stringify(params));
          }
          return back;
        }else{
          return ymapp.KwebViewAction(JSON.stringify(params));
        }
      } else if (dsBridge.call('getAppVersion',{})&&(dsBridge.call('getAppVersion',{}).version>'1.0.5')) {
        switch(params.index){
          case '0':
            dsBridge.call('MHGoLogin',{})
            break;
          case '1':
            dsBridge.call('MHGoGoodsDetail',{goodsId:params.data.goodsId})
            break;
          case '3':
            dsBridge.call('MHGoRootController',{})
            break;
          case '9':
            dsBridge.call('MHOpenPaySDKWithData',{params},params.fun)
            break;
          case '10':
            return dsBridge.call('MHGetToken',{})
            break;
          case '11':
            dsBridge.call('MHShareGoods',{params})
            break;
          case '12':
            dsBridge.call('MHScreenshot',{})
            break;
          case '13':
            dsBridge.call('MHJumpoPreController',{})
            break;
          case '15':
            dsBridge.call('preViewImg',{
              current:params.data.current,
              urls:params.data.urls,
            })
            break;
          case '16':
            dsBridge.call('shareBigPic',{})
            break;
          case '17':
            dsBridge.call('goTaobao',{goodsData:params.data.goodsData})
            break;
          case '18':
            return dsBridge.call('MHShareTextOnly',{params})
            break;
          case '19':
            return dsBridge.call('MHGetUserCoordinate2D',{})
            break;
          case '20':
            return dsBridge.call('MHCopyPicShareWeChat ',params.data.url)
            break;
          case '21':
            let info = dsBridge.call('MHGetInviteCode ',{})
            return info.inviteCode;
            break;
        }
      }else {
        if(params.index=='10'){
          return getSessionStorage('dyyp_token');
        }else if (params.index=='21') {
          return getSessionStorage('dyyp_inviteCode');
        }
      }
    }
};

export default Util;
