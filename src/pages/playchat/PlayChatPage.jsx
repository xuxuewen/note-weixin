import React from 'react';
import {
  List,
  Toast,
  Carousel
} from 'antd-mobile';
import dsBridge from 'dsbridge';
import wx from 'weixin-js-sdk';
import Util from '../../Util';

import {
  getSessionStorage,
  setSessionStorage,
  GetQueryString,
  removeSessionStorage
} from '../../mixin';

import {
  playBanner,
  playGoodsList,
  shareBasis,
  loginByWechat,
  paymentInfo,
  sendPin,
  wechatMobile
} from '../../api/playchatApi';

import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';

import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'

import './PlayChatPage.scss';

import banner from './images/banner.png'
import index_right_icon from './images/index_right_icon.png'
import rush from './images/rush.png';
import rush_out from './images/rush_out.png';

const demoData = {
  "bannerList":[
    {
      "bgColor":"",
      "bgTitle":"玩客",
      "bgUrl":"https://img.no1im.com/temp/501becc1c83e4d9bbc92b12bfddbefde.jpeg",
      "linkUrl":"http://a.coupon.dreamsgo.cn/vipmall/#/play/note/3/63"
    },
    {
      "bgColor":"",
      "bgTitle":"玩客",
      "bgUrl":"https://img.no1im.com/temp/6951763ee3954730b60d0ab9644dc6a6.png",
      "linkUrl":""
    }
  ],
  "contentInfo":"",
  "contentList":[
    {
      "icoClickUrl":"",
      "icoId":75,
      "icoName":"全部",
      "icoNameClickColor":"#666666",
      "icoNameColor":"#666666",
      "icoUrl":"https://img.no1im.com/temp/3caf7f0ed10049829d797a56c478e051.png",
      "linkUrl":"http://a.coupon.dreamsgo.cn/vipmall/#/boutique/2",
      "relateId":"",
      "relateType":3
    },
    {
      "icoClickUrl":"",
      "icoId":74,
      "icoName":"心灵",
      "icoNameClickColor":"#666666",
      "icoNameColor":"#666666",
      "icoUrl":"https://img.no1im.com/temp/de1bba96a6a74d869e4a591a99ec0cba.png",
      "linkUrl":"http://a.coupon.dreamsgo.cn/vipmall/#/boutique/3",
      "relateId":"",
      "relateType":3
    },
    {
      "icoClickUrl":"",
      "icoId":73,
      "icoName":"管理",
      "icoNameClickColor":"#666666",
      "icoNameColor":"#666666",
      "icoUrl":"https://img.no1im.com/temp/f9c0947d740b425eb1da3997265f7fd7.png",
      "linkUrl":"http://a.coupon.dreamsgo.cn/vipmall/#/play/note/3/63",
      "relateId":"",
      "relateType":3
    },
    {
      "icoClickUrl":"",
      "icoId":72,
      "icoName":"职场",
      "icoNameClickColor":"#666666",
      "icoNameColor":"#666666",
      "icoUrl":"https://img.no1im.com/temp/5728c5dd10704e3aa7a67c0e5c367578.png",
      "linkUrl":"http://a.coupon.dreamsgo.cn/vipmall/#/play/note/4/0",
      "relateId":"",
      "relateType":3
    }
  ],
  "headInfo":"",
  "platesType":8
}
const listData = {
		"cur":1,
		"pageSize":20,
		"rows":[
			{
				"goodsList":[
					{
						"goodsEarnings":"每购买一个商品，获178.80玩呗",
						"goodsId":69,
						"goodsMainImg":"https://img.no1im.com/temp/931248b06ae94fd595c998f57e17d58c.jpeg",
						"goodsPrice":"¥894",
						"goodsTitle":"【特惠！】三件套装 ！！！中粮 新疆塔原红花籽油 物理压榨一级 口服油 480ml/瓶",
						"goodsType":5,
						"goodsVolume":"已售8",
						"isSaleOut":0,
						"saleOutPicUrl":"",
						"salesMsgList":""
					}
				],
				"userIntegral":"0.00积分"
			}
		],
		"total":1
	}
class PlayChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mescroll: null,
      goodsList: [],
      bannerList: [],
      iconList: [],
      pageindex: 1,
      pageSize: 20,
      isApp: true,//是否是app打开
      isBind: getSessionStorage('dyyp_isBind'),//是否绑定手机号
      height: document.documentElement.clientHeight,
      isCanSend: true,
      phoneValue: '',//电话号码
      codeValue: '',//验证码
      sendCode: '获取验证码',
      countdown: 60,//倒计时
    }
  }

  componentDidMount() {
    let that = this;
    // playBanner().then(function (data) {
      this.setState({
        bannerList: demoData.bannerList,
        iconList: demoData.contentList,
      })
    // });

    let mySwiper = new Swiper('.swiper-container', {
      autoplay: true,
      watchOverflow: true,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true,//修改swiper的父元素时，自动初始化swiper
      pagination: {
        el: '.swiper-pagination',
      },
    });

    // 创建MeScroll对象:为避免配置的id和父组件id重复,这里使用ref的方式初始化mescroll
    var mescrollNew = new MeScroll(this.refs.mescroll, {
      down: {
        offset: 160,
        auto: false, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
        autoShowLoading: true,
        warpClass: "mescroll-downwarp",
        callback: () => {
          this.downCallback()
        }, // 下拉刷新的回调
        htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip">加载中...</p>',
      },
      up: {
        auto: true, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
        callback: () => {
          this.upCallback()
        }, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 20 // 每页数据的数量
        },
        empty: {
          warpId: 'mescrollid',
          icon: 'http://s.no1im.com/lib/imgs/noData.png',
          tip: "暂无数据~",
          btntext: "",
          btnClick: null,
          supportTap: false
        },
        htmlNodata: '<p class="upwarp-nodata">-- 我是有底线的 --</p>'
      }
    });
    this.setState({
      mescroll: mescrollNew
    });
    // that.loginByWeiChat();

  }

  //微信端授权登录
  loginByWeiChat() {
    let that = this;
    //判断是否是微信浏览器
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      let userId = GetQueryString('pId');
      if (!getSessionStorage('dyyp_token')) { //没有openId即没有登录
        let code = GetQueryString('code');
        if (code) {
          loginByWechat({
            "code": code,
            "inviteCode": userId,
            "thirdType": "2",
          }).then(function (res) {
            if (res.state == '2') {
              setSessionStorage('dyyp_openid', res.openId);
              setSessionStorage('dyyp_token', res.ret.token);
              setSessionStorage('dyyp_userid', res.ret.userId);
              setSessionStorage('dyyp_inviteCode', res.ret.inviteCode);
              setSessionStorage('dyyp_isBind', res.ret.isBindUsername);
              that.setState({
                isBind: res.ret.isBindUsername
              });
            } else {
              Toast.info("获取openID失败");
            }
          })
        } else { //没有code需要重定向获取code换取openId
          paymentInfo().then(function (res) {
            let appid = res.wxAppid;
            window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`);
          })
        }
      }
    }
  }

  //app分享
  appShare(code) {
    let shareUrl = `${window.location.href}?pId=${code}`;
    let selectorData = {
      goodsName: "快来和我一起玩赚",
      goodsImgUrl: "http://s.no1im.com/lib/imgs/wan.jpeg",
      shareUrl: shareUrl,
      desc: "豆丫优品玩赚你的价值，快来和我一起玩客吧"
    };

    dsBridge.call('MHSetNavInfo', {
      'title': '玩客',
      'rightItem': {
        'title': '分享',
        'nativeSelector': 'MHShareGoods:',
        'selectorData': selectorData
      },
    });
  }

  //微信分享
  wxShare(code) {
    let url = window.location.href;
    //获取微信签名
    shareBasis({url: url}).then(data => {

      let shareUrl = `${window.location.origin}/vipmall/?pId=${code}`;
      //微信JS-SDK的页面必须先注入配置信息
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.sign,// 必填，签名
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
      });
      //处理验证失败的信息
      wx.error(function (res) {
        console.log(res);
      });
      //处理验证成功的信息
      wx.ready(() => {
        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: '快来和我一起玩赚', // 分享标题
          link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: "http://s.no1im.com/lib/imgs/wan.jpeg", // 分享图标
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
          title: '快来和我一起玩赚', // 分享标题
          desc: '豆丫优品玩赚你的价值，快来和我一起玩客吧', // 分享描述
          link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: "http://s.no1im.com/lib/imgs/wan.jpeg", // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        });
      });
    })
  }

  //下拉刷新的回调
  downCallback() {
    this.setState({
      pageindex: 1
    });
    this.state.mescroll.resetUpScroll(true);
  }

  //上拉加载的回调
  upCallback() {
    // console.log('上啦', this.state.pageindex)
    //请求列表数据
    this.searchList(this.state.pageindex);
  }

  searchList(pageindex) {
    // var that = this;
    // playGoodsList({
    //   "cur": pageindex,
    //   "rp": this.state.pageSize,
    //   "goodsArea": "1",
    // }).then(function (res) {
      // console.log('商品数据', res);
      // 如果是第一页需手动制空列表
      if (pageindex == 1) {
        this.state.mescroll.options.up.page.num = 1;
        this.state.goodsList = [];
        this.setState({
          goodsList: []
        })
      }

      var dataNum;//当前页数量
      var total;//总共多少页

      if (listData.rows) {
        dataNum = listData.rows[0].goodsList.length;
        total = listData.total;
        var pageindexNew = this.state.pageindex + 1;
        this.setState({
          pageindex: pageindexNew,
        })
      } else {
        dataNum = 0;
        total = 0;
      }

      var result = '';
      if (dataNum > 0) {
        var goodsListNew = this.state.goodsList.concat(listData.rows[0].goodsList);
        this.setState({
          goodsList: goodsListNew
        });
      }

      this.state.mescroll.endByPage(dataNum, total);
    // })


  }

  goDetail(id) {
    window.location.href = `/#/play/goodsdetail/${id}`;
  }

  goIcon(url) {
    window.location.href = `${url}`;
  }

  goBanner(url) {
    if (url) {
      window.location.href = `${url}`;
    }
  }

  render() {
    const {bannerList, iconList, goodsList, isBind, phoneValue, codeValue, sendCode} = this.state;
    return (
      <div className="play-chat-warp" style={{'height': this.state.height}}>
        <div id="mescrollid">
          <div id="mescroll" className="mescroll inner" ref="mescroll"
            style={{'position': 'fixed', 'top': '0', 'height': this.state.height, 'bottom': '0px', 'left': '0px'}}>
            <div className="banner">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  {
                    bannerList && bannerList.map((item, index) => {
                      return (
                        <div className="swiper-slide" key={index} onClick={() => {
                          this.goBanner(item.linkUrl)
                        }}><img src={item.bgUrl}/></div>
                      )
                    })
                  }
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
            <div className="tab">
              {
                iconList && iconList.map((item, index) => {
                  return (
                    <div className="tab-icon" key={index} onClick={() => {
                      this.goIcon(item.linkUrl)
                    }}>
                      <img src={item.icoUrl}/>
                      <p style={{color: item.icoNameColor}}>{item.icoName}</p>
                    </div>
                  )
                })
              }
            </div>

            <div className="goods-list-wrap clearfix">
              {
                goodsList && goodsList.map((item, index) => {
                  return (
                    <div className="goods" key={index} onClick={() => {
                      item.isSaleOut == 0 && this.goDetail(item.goodsId)
                    }}>
                      {
                        item.salesMsgList.length > 0 && <div className="goods-top">
                          <Carousel
                            className="my-carousel"
                            vertical
                            autoplay={true}
                            infinite
                            dots={false}
                            selectedIndex={0}
                            swipeSpeed={40}
                          >
                            {
                              item.salesMsgList && item.salesMsgList.map((m, n) => {
                                return (
                                  <a key={n}>
                                    <span>Ta：{m.salesMsg}</span>
                                    <i>赚：{m.salesVal}</i>
                                  </a>
                                )
                              })
                            }
                          </Carousel>
                        </div>
                      }
                      <div className="goods-content">
                        <div className="store-pd-item">
                          <div className="pd-images">
                            <img src={item.goodsMainImg}/>
                          </div>
                          <div className="pd-info">
                            <div className="pd-title">
                              {item.goodsTitle}
                            </div>
                            <div className="ys-title ys-price">{item.goodsPrice}</div>
                            <div className="ys-title">{item.goodsVolume}</div>
                          </div>
                        </div>
                      </div>
                      <div className="goods-button clearfix">
                        <span><i>赚</i><b>{item.goodsEarnings}</b></span>
                        <a><img src={item.isSaleOut == 1 ? rush_out : rush}/></a>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayChatPage;
