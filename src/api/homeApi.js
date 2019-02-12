import Ajax from './axiosinstance';
const ajax = new Ajax({
  baseURL: '/native',
  timeout: 600000,
});

//获取商城首页数据
export function homePage() {
  return ajax.get('/coupon/integralMall/homepage');
}

//商品详情
export function goodsDetails(params) {
  return ajax.post('/coupon/integralMall/goodsDetails',params);
}

//收货地址、提交订单
export function integralMallBuy(params) {
  return ajax.post('/coupon/integralMall/memberBuy',params);
}
