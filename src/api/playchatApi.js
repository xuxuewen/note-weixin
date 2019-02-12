import Ajax from './axiosinstance';
import Util from '../Util';

const defaultHeader = {
  'Content-Type': 'application/json',
  'appname': 'com.immortal.jeeqin',
  'platform': 'web',
  'v': '1.0',
  'version': 'wap1.0.2',
  'lang': 'zh-CN',
  'country':'CN',
};

const defaultToken = Util.AppApiAction({'index': '10','data': {}}) || '';

function creatAjax(token = defaultToken , headers = defaultHeader) {
  headers.token = token;
  let ajax = new Ajax({
    baseURL: '/native',
    timeout: 600000,
    headers
  });
  return ajax;
}

//玩客首页接口：顶部banner、icon板块信息
export function playBanner() {
  let ajax = creatAjax();
  return ajax.get('/coupon/wanke/homePlate');
}

//玩客商品列表查询
export function playGoodsList(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/wanke/goodsList', params);
}

export function getJsSdkSign() {
  let ajax = creatAjax();
  return ajax.get('/liankao_api/webcat/pay/unifiedorder');
}

export function goPay() {
  let ajax = creatAjax();
  return ajax.get('/liankao_api/webcat/pay/unifiedorder');
}
