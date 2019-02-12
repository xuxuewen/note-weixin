import React from 'react';
import {
  List
} from 'antd-mobile';
import dsBridge from 'dsbridge';
import VisibilitySensor from 'react-visibility-sensor';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';

import {
  goodsDetails
} from '../../api/playchatApi';

import './PlayGoodsDetailPage.scss';

import detail_title from './images/goods_detail_title.png'

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
    dsBridge.call('MHSetNavInfo', {
      'title': '商品详情',
      'rightItem': {
        'title': ' ',
      },
    });

    goodsDetails({goodsId: this.state.id}).then(function (data) {
      that.setState({
        obj: data,
        goodsSmallImgList: data.goodsSmallImgList,
        specTitle: data.specTitle,
        goodsSpecList: data.goodsSpecList,
      })
    });

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
    const {active, id} = this.state;
    this.props.history.push({pathname: `/confirm/order/${id}/${active}/0`});
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
