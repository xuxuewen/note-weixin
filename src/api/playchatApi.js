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

//玩客说明与权益数据
export function playNote(params) {
  let ajax = creatAjax();
  return ajax.post('/base/notice/list/get', params);
}

//wap个人中心首页接口
export function homeInfo() {
  let ajax = creatAjax();
  return ajax.get('/userCenter/wap/homeInfo');
}

//玩客商品详情
export function goodsDetails(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/wanke/goodsDetails', params);
}

//获取默认收货地址
export function getDefaultAddress(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/address/defaultAddr', params);
}

//收货地址列表
export function getAddressList(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/address/list', params);
}

//添加收货地址
export function addAddress(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/address/add', params);
}

//设置默认收货地址
export function setDefaultAddress(params) {
  let ajax = creatAjax();
  return ajax.get('/coupon/address/default', params);
}

//收货地址详情
export function addressDetail(params) {
  let ajax = creatAjax();
  return ajax.get('/coupon/address/detail', params);
}

//删除收货地址
export function deleteAddress(params) {
  let ajax = creatAjax();
  return ajax.get('/coupon/address/del', params);
}

//编辑收货地址
export function editAddress(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/address/modify', params);
}

//确认下单接口
export function payOrder(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/wanke/payOrder', params);
}

//订单列表接口
export function payOrderList(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/integralMall/order/orderList', params);
}

//取消订单接口
export function cancelOrder(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/integralMall/order/cancelOrder', params);
}

//删除订单接口
export function deleteOrder(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/integralMall/order/deleteOrder', params);
}

//订单详情
export function orderDetail(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/integralMall/order/orderDetail', params);
}

//查看物流详情
export function checkLogisticsDetail(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/integralMall/order/dispatchView', params);
}

//确认收货
export function confirmReceipt(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/integralMall/order/confirmReceipt', params);
}

//挂售
export function hangSell(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/integralMall/order/hangSale', params);
}

//立即挂售
export function immediateHangSale(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/integralMall/order/immediateHangSale', params);
}

//提货接口
export function selfLifting(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/integralMall/order/selfLifting', params);
}

//停止挂售
export function stopHangSell(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/integralMall/order/stopHangSale', params);
}

//微信分享
export function shareBasis(params) {
  let ajax = creatAjax();
  return ajax.post('/wx/share/basis', params);
}

//微信授权
export function loginByWechat(params) {
  let ajax = creatAjax();
  return ajax.post('/thirdParty/loginByWechat', params);
}

//没有code需要重定向获取code换取openId
export function paymentInfo() {
  let ajax = creatAjax();
  return ajax.post('/base/payment/info');
}

//发送验证码
export function sendPin(params) {
  let ajax = creatAjax(Util.AppApiAction({'index': '10','data': {}}));
  return ajax.post('/msg/pin/send', params);
}

//绑定手机号
export function wechatMobile(params) {
  let ajax = creatAjax(Util.AppApiAction({'index': '10','data': {}}));
  return ajax.post('/user/wechatMobile/set', params);
}

//玩呗明细
export function financeRecords(params) {
  let ajax = creatAjax();
  return ajax.post('/finance/records', params);
}

//玩呗详情
export function financeRecordsDetail(params) {
  let ajax = creatAjax();
  return ajax.post('/finance/records/details', params);
}

//提交订单接口
export function submitOrder(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/wanke/submitOrder', params);
}

//去支付接口
export function goPay(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/wanke/goPay', params);
}

//微信支付查询接口
export function wxAppPayCheck(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/integralMall/WxAppPayCheck', params);
}

//付款所需用户信息
export function getUserPayInfo(params) {
  let ajax = creatAjax();
  return ajax.post('/coupon/integralMall/order/goPayPage', params);
}
