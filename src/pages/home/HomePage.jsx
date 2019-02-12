import React from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import {
  homePage
} from '../../api/homeApi';

import Util from '../../Util';

import {
  List,
  Toast
} from 'antd-mobile';
import {
  Link
} from 'react-router-dom';
import './HomePage.scss';

import banner from './images/bg.png';
import goodsPic from './images/bg.png';

class HomePage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      seniorGoodsList: [],
      partnerGoodsList: [],
      bannerImgUrl:'',
    }
  }

  componentWillMount(){
    this.getHomeData();
  }

  getHomeData(){
    homePage().then(res=>{
      let {bannerImgUrl,seniorGoodsList,partnerGoodsList} = this.state;
      if(res.topAdvertList&&res.topAdvertList.length>0){
        bannerImgUrl = res.topAdvertList[0].adImg
      }
      if(res.partnerGoodsList&&res.partnerGoodsList.length>0){
        partnerGoodsList = res.partnerGoodsList
      }
      if(res.seniorGoodsList&&res.seniorGoodsList.length>0){
        seniorGoodsList = res.seniorGoodsList
      }
      this.setState({
        bannerImgUrl,
        seniorGoodsList,
        partnerGoodsList
      },()=>{
        let mySwiper = new Swiper('.swiper-container', {
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,
          slidesPerView: "auto",
          watchSlidesProgress: !0,
          slidesOffsetBefore: 37,
          spaceBetween: 17,
          resistanceRatio: 1,
          on: {
            progress: function(b) {
              for (var i = 0; i < this.slides.length; i++){
                var slide = this.slides.eq(i);
                var slideProgress = this.slides[i].progress;
                var prevIndent = 4 == i? .3228: .0898;
                var scale = 1 > Math.abs(slideProgress + prevIndent)
                ? .1 * (1 - Math.abs(slideProgress + prevIndent)) + 1
                : 1;
                slide.find(".goods").transform("scale3d(" + scale + "," + scale + ",1)");
              }
            },
            setTransition: function(b) {
              for (var a = 0; a < this.slides.length; a++)
                this.slides.eq(a).find(".goods").transition(b);
            },
            touchMove: function() {
              this.controller.control = "";
            },
            touchEnd: function() {
            }
          }
        });
      })
    })
  }

  onHanderGo1(item){

    this.props.history.push({
      pathname: `/product/${item.goodsId}`
    })


    // if( item.myLevel==0 && item.upLevel==1 ){//我是普通会员 上级是砖石会员
    //   this.props.history.push({
    //     pathname: `/product/${item.goodsId}`
    //   })
    // }else if ( item.myLevel==0 && item.upLevel==2 ) {
    //   this.props.history.push({
    //     pathname: `/product/${item.goodsId}`
    //   })
    // }else if (item.myLevel==1 && item.upLevel==1) {
    //   Toast.info('您已经是砖石会员！如果您的推荐人是合伙人会员您才可以有权限升级为合伙人会员！', 2)
    // }else if (item.myLevel==1 && item.upLevel==2) {
    //   Toast.info('您已经是砖石会员！因为您的推荐人是合伙人会员,所以您可以购买合伙人会员套餐升级为合伙人会员！', 2)
    // }else if (item.myLevel==2 && item.upLevel==1) {
    //   Toast.info('您已经是合伙人会员！', 2)
    // }else if (item.myLevel==2 && item.upLevel==2) {
    //   Toast.info('您已经是合伙人会员！', 2)
    // }else {
    //   Toast.info('系统维护中～请返回到个人中心联系客服！', 2)
    // }

  }

  onHanderGo2(item){

    this.props.history.push({
      pathname: `/product/${item.goodsId}`
    })

    // if( item.myLevel==0 && item.upLevel==1 ){//我是普通会员 上级是砖石会员
    //   Toast.info('您推荐人是砖石会员！所以您只能升级为砖石会员！', 2)
    // }else if ( item.myLevel==0 && item.upLevel==2 ) {
    //   this.props.history.push({
    //     pathname: `/product/${item.goodsId}`
    //   })
    // }else if (item.myLevel==1 && item.upLevel==1) {
    //   Toast.info('您推荐人是砖石会员，所以您没有权限升级为合伙人会员！', 2)
    // }else if (item.myLevel==1 && item.upLevel==2) {
    //   this.props.history.push({
    //     pathname: `/product/${item.goodsId}`
    //   })
    // }else if (item.myLevel==2 && item.upLevel==1) {
    //   Toast.info('您已经是合伙人会员！', 2)
    // }else if (item.myLevel==2 && item.upLevel==2) {
    //   Toast.info('您已经是合伙人会员！', 2)
    // }else {
    //   Toast.info('系统维护中～请返回到个人中心联系客服！', 2)
    // }

  }

  render() {
    return (
      <div className="home-viewport">
        <div className="banner">
          <img src={this.state.bannerImgUrl?this.state.bannerImgUrl:banner} />
        </div>
        <h2>钻石代理升级专区</h2>
        {this.state.seniorGoodsList.length>0 &&
          <div className="swiper-container show-swiper">
            <div className="swiper-wrapper">
              {
                this.state.seniorGoodsList.map((item,index)=>{
                  return(
                    <div className="swiper-slide" key={index}>
                      <div className="goods">
                        <div onClick={()=>{this.onHanderGo1(item)}}>
                          <div className="goods-pic">
                            <img src={item.goodsMainImg} />
                          </div>
                          <div className="goods-text">
                            <p>{item.goodsTitle}</p>
                            <p className="goods-pay">
                            <span>¥{item.goodsPrice}</span>
                            {
                              item.goodsRedbean&&<span>{item.goodsRedbean}红豆</span>
                            }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <div className="swiper-slide last-slide">
                <span className="icon"></span>
                <p className="text">右滑查看更多</p>
              </div>
            </div>
          </div>
        }
        <h2>合伙人升级专区</h2>
        {this.state.partnerGoodsList.length>0 &&
          <div className="swiper-container show-swiper">
            <div className="swiper-wrapper">
              {
                this.state.partnerGoodsList.map((item,index)=>{
                  return(
                    <div className="swiper-slide" key={index}>
                      <div className="goods">
                        <div onClick={()=>{this.onHanderGo2(item)}}>
                          <div className="goods-pic">
                            <img src={item.goodsMainImg} />
                          </div>
                          <div className="goods-text">
                            <p>{item.goodsTitle}</p>
                            <p className="goods-pay">
                            <span>¥{item.goodsPrice}</span>
                            {
                              item.goodsRedbean&&<span>{item.goodsRedbean}红豆</span>
                            }
                             </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <div className="swiper-slide last-slide">
                <span className="icon"></span>
                <p className="text">右滑查看更多</p>
              </div>
            </div>
          </div>}
      </div>
    )
  }
}

export default HomePage;
