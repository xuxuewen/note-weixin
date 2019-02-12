import React from 'react';
import {
  List,
  Toast
} from 'antd-mobile';
import dsBridge from 'dsbridge';
import VisibilitySensor from 'react-visibility-sensor';
import Swiper from 'swiper/dist/js/swiper.js';
import wx from 'weixin-js-sdk';
import 'swiper/dist/css/swiper.min.css';

import {
  goodsDetails,
  getJsSdkSign,
  goPay
} from '../../api/playchatApi';

import './PlayGoodsDetailPage.scss';

import detail_title from './images/goods_detail_title.png'
const detailData = {
  "goodsCount":988,
  "goodsDetails":"<p>123</p>",
  "goodsId":111,
  "goodsIntegral":150.00,
  "goodsMainImg":"https://img.alicdn.com/tfscom/i3/357342619/O1CN01Ej841X1VDXlrm5iOj_!!0-item_pic.jpg",
  "goodsPrice":50.00,
  "goodsSmallImgList":[
    "http://img10.360buyimg.com/n1/jfs/t3715/66/1895635005/167409/c8a0c796/583408d8N807dd142.jpg",
    "http://img10.360buyimg.com/n1/jfs/t3715/66/1895635005/167409/c8a0c796/583408d8N807dd142.jpg",
    "http://img10.360buyimg.com/n1/jfs/t3715/66/1895635005/167409/c8a0c796/583408d8N807dd142.jpg",
    "http://img10.360buyimg.com/n1/jfs/t3715/66/1895635005/167409/c8a0c796/583408d8N807dd142.jpg"
  ],
  "goodsSmallImgs":"https://img.alicdn.com/tfscom/i1/357342619/O1CN01XzArUc1VDXltUIfal_!!357342619.jpg|https://img.alicdn.com/tfscom/i2/357342619/O1CN011VDXlTBG9hjLT7s_!!357342619.jpg|https://img.alicdn.com/tfscom/i3/357342619/TB2GPhNbpzqK1RjSZSgXXcpAVXa_!!357342619-2-item_pic.png|https://img.alicdn.com/tfscom/i3/357342619/O1CN011VDXlQKbMrcLd1R_!!357342619.png",
  "goodsSpecList":[
    {
      "goodsId":111,
      "returnPlayShell":5.00,
      "specId":9480,
      "specIntegral":150.00,
      "specPrice":50.00,
      "specStock":988,
      "specValue":"红色"
    }
  ],
  "goodsTitle":"马应龙八宝气垫cc霜亮肤遮瑕隔离保湿bb霜粉底液粉扑素颜学生女",
  "goodsType":5,
  "goodsVolume":12,
  "isSaleOut":0,
  "returnPlayShell":5.00,
  "returnRatio":10,
  "specTitle":["规格","价格","所需积分","库存"],
  "userPlayShell":0
};
class PlayChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      obj: {},
      goodsSmallImgList: [],//轮播图
      specTitle: [],//规格标题
      goodsSpecList: [],//规格
      active: 0,
      height: document.body.clientHeight,
      btnPosition:'fixed'
    }
  }

  componentDidMount() {
    document.title = '商品详情';
    let that = this;

    // goodsDetails({goodsId: this.state.id}).then(function (data) {
      that.setState({
        obj: detailData,
        goodsSmallImgList: detailData.goodsSmallImgList,
        specTitle: detailData.specTitle,
        goodsSpecList: detailData.goodsSpecList,
      })
    // });
    //获取微信签名
    // getJsSdkSign({url: window.location.href}).then(data => {
    //   console.log('获取签名', data);
      //微信JS-SDK的页面必须先注入配置信息
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxc927306abd393e97', // 必填，公众号的唯一标识
        timestamp: '1549958145142', // 必填，生成签名的时间戳
        nonceStr: 'YBT8EZULBWBC1X52NALV', // 必填，生成签名的随机串
        signature: '58b35e0c2aaa012119e0b40bf31a487ea479d35b',// 必填，签名
        jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表
      });
      //处理验证失败的信息
      wx.error(function (res) {
        console.log(res);
      });
    // })

    let mySwiper = new Swiper('.swiper-container', {
      autoplay: true,
      watchOverflow: true,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true,//修改swiper的父元素时，自动初始化swiper
      pagination: {
        el: '.swiper-pagination',
      },
    });

  }

  chooseGoods(index) {
    this.setState({
      active: index
    })
  }

  toBuy() {
    // let params = {
    //   'payment': '1',
    //   'orderId': '1231231u1h31238123jh',
    //   'openId': 'jahdKJHDugD*87y87878DGaksdJDasd687676'
    // };
    // goPay(params).then(function (data) {
      wx.chooseWXPay({
        appId: "wxc927306abd393e97",
        timestamp: "1549958889065", // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: "HLGVC45WYVEWQKP5BFIU", // 支付签名随机串，不长于 32 位
        package: "prepay_id=wx12160809018028fb5986e0321813638620", // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: "5E55A9DC94D339BE8CC0E0B5E5DDD2AC", // 支付签名
        success: function (res) {
          // 支付成功后的回调函数
          Toast.info('支付成功~', 2, function () {
            // let params = {
            //   'orderSn': data.sn,
            //   'orderType': data.orderType,
            // };
            // wxAppPayCheck(params).then((response) => {
            //   if (response == 1) {
            //     that.props.history.replace({pathname: `/order/list/${orderType}`});
            //     removeSessionStorage('orderObjValue');
            //   } else {
            //     Toast.info('查询失败~', 2)
            //   }
            // }, err => {
            //   alert(JSON.stringify(err))
            // })
          });
        }
      });
    // });
  }

  hereIsBottom(e){
    let {btnPosition} = this.state;
    if(e){
      btnPosition = "relative";
    }else{
      btnPosition = "fixed";
    }
    this.setState({btnPosition});
  }

  render() {
    const {goodsSmallImgList, obj, specTitle, goodsSpecList, active,btnPosition} = this.state;
    return (
      <div className="goods-detail-warp" style={{'height': this.state.height}}>
        <div className="banner">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {
                goodsSmallImgList && goodsSmallImgList.map((item, index) => {
                  return (
                    <div className="swiper-slide" key={index}><img src={item}/></div>
                  )
                })
              }
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
        <div className="goods-detail-des">
          <p className="des">{obj.goodsTitle}</p>
          <p className="price clearfix">
            {
              obj.goodsIntegral != '' && obj.goodsIntegral != 0 && <span>￥{obj.goodsPrice}
                +{obj.goodsIntegral}{obj.goodsType == 4 ? '玩呗' : '积分'}
              </span>
            }
            {
              obj.goodsIntegral == '' && obj.goodsIntegral == 0 && <span>￥{obj.goodsPrice}</span>
            }
            <i>库存：{obj.goodsCount ? obj.goodsCount : 0}</i>
          </p>
        </div>
        <div className="play-chat clearfix">
          <span>{obj.goodsType == 4 ? '剩余玩呗' : '下单可得玩呗'}</span>
          <i>玩呗：{obj.goodsType == 4 ? obj.userPlayShell : obj.returnPlayShell}</i>
        </div>
        {
          specTitle && <div className="goods-sku">
            {
              specTitle.map((item, index) => {
                return (
                  <div key={index}>{item}</div>
                )
              })
            }
          </div>
        }
        {
          goodsSpecList && <div className="goods-sku-list">
            {
              goodsSpecList.map((item, index) => {
                return (
                  <div className="list" key={index} onClick={() => {
                    this.chooseGoods(index)
                  }}>
                    <div className={active == index ? 'list-click active' : 'list-click'}>{item.specValue}</div>
                    <div>{item.specPrice}</div>
                    <div>{item.specIntegral}</div>
                    <div>{item.specStock}</div>
                  </div>
                )
              })
            }
          </div>
        }
        <div className="goods-detail">
          <p className="goods-detail-title">
            <img src={detail_title}/>
          </p>
          <div className="detail-content" dangerouslySetInnerHTML={{__html: obj.goodsDetails}}></div>
        </div>
        <VisibilitySensor onChange={(e)=>{this.hereIsBottom(e)}}>
          <div style={{height:'1px'}}></div>
        </VisibilitySensor>
        <div className="goods-detail-button" style={{'position':btnPosition}} onClick={() => {this.toBuy()}}>立即购买
        </div>
      </div>
    )
  }
}

export default PlayChatPage;
