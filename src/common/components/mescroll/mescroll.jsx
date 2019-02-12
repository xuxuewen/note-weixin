import React from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Toast,
  Modal
} from 'antd-mobile';
import MeScroll from 'mescroll.js';
import {
  getUserPayInfo,
  cancelOrder,
  deleteOrder,
  confirmReceipt,
  hangSell,
  selfLifting,
  immediateHangSale,
  stopHangSell
} from '../../../api/playchatApi';
import 'mescroll.js/mescroll.min.css'
import './mescroll.scss';
import {setSessionStorage} from "../../../mixin";

const alert = Modal.alert;

const operation = ['取消订单', '付款', '删除订单', '查看物流', '确认收货', '挂售', '提货', '立即挂售', '停止挂售', '查看详情'];

class MeScrollPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      mescroll: null,
      pageIndex: 1,
      pageSize: 10,
    };
  }

  //下拉刷新的回调
  downCallback() {
    this.setState({
      pageIndex: 1
    })
    this.state.mescroll.resetUpScroll(true);
  }

  //上拉加载的回调
  upCallback() {
    //请求列表数据
    this.getDataList();
  }

  getDataList() {
    let params = this.props.params;
    params.cur = this.state.pageIndex;
    params.rp = this.state.pageSize;
    this.props.getDataList(params).then(res => {
      let {pageIndex, dataList, mescroll} = this.state;
      if (res.rows.length > 0) {
        // 如果是第一页需手动制空列表
        if (pageIndex == 1) {
          mescroll.options.up.page.num = 1;
          dataList = [];
        }
        let dataNum;//当前页数量
        let total;//总共多少页

        if (res.rows.length) {
          dataNum = res.rows.length;
          total = Math.ceil(res.total / this.state.pageSize);
          pageIndex += 1;
          this.setState({
            pageIndex
          })
        } else {
          dataNum = 0;
          total = 0;
        }

        if (dataNum > 0) {
          dataList = dataList.concat(res.rows);
          this.setState({
            dataList
          });
        } else {
          this.setState({
            dataList
          });
        }
        mescroll.endByPage(dataNum, total);
      } else {
        dataList = [];
        this.setState({
          dataList
        });
        mescroll.options.up.page.num = 1;
        mescroll.endByPage(0, 1);
      }
    })
  }

  //操作按钮
  handleOperation(type, item) {
    switch (type) {
        //取消订单
      case 0 :
        alert('', '确认取消订单吗?', [
          {text: '取消', onPress: () => console.log('cancel')},
          {
            text: '确定', onPress: () => {
              cancelOrder({
                orderId: item.orderId
              }).then(res => {
                Toast.info('取消成功');
                this.downCallback();
              })
            },
            style: {
              color: '#fff',
              background: '#F23A5C',
            }
          },
        ])
        break;
        //付款
      case 1 :
        getUserPayInfo({orderId: item.orderId}).then(res => {
          if (res) {
            let orderObj = {
              'goodsPrice': item.totalAmount,
              'goodsIntegral': item.totalIntegral,
              'goodsType': item.goodsType,
              'orderId': item.orderId,
              'userBalance': res.userBalance,
              'userIntegral': res.userIntegral,
            };
            setSessionStorage('orderObjValue', JSON.stringify(orderObj));
            window.location.hash = `#/play/pay`;
          } else {
            Toast.info('订单异常', 2)
          }
        }).catch(err => console.log(err));
        break;
        //删除订单
      case 2 :
        alert('', '确认删除订单吗?', [
          {text: '取消', onPress: () => console.log('cancel')},
          {
            text: '确定', onPress: () => {
              deleteOrder({
                orderId: item.orderId
              }).then(res => {
                Toast.info('删除成功');
                this.downCallback();
              },err=>{
                Toast.info(err.message);
              })
            },
            style: {
              color: '#fff',
              background: '#F23A5C',
            }
          },
        ]);
        break;
        //查看物流
      case 3 :
        window.location.hash = `#/check/logistics/${item.orderId}`;
        break;
        //确认收货
      case 4 :
        alert('', '确认收货吗?', [
          {text: '取消', onPress: () => console.log('cancel')},
          {
            text: '确定', onPress: () => {
              confirmReceipt({
                orderId: item.orderId
              }).then(res => {
                Toast.info('收货成功');
                this.downCallback();
              })
            },
            style: {
              color: '#fff',
              background: '#F23A5C',
            }
          },
        ]);
        break;
        //挂售
      case 5 :
        alert('', '确认挂售吗?', [
          {text: '取消', onPress: () => console.log('cancel')},
          {
            text: '确定', onPress: () => {
              hangSell({
                orderId: item.orderId,
              }).then(res => {
                Toast.info('挂售成功');
                this.downCallback();
              })
            },
            style: {
              color: '#fff',
              background: '#F23A5C',
            }
          },
        ])
        break;
        //提货
      case 6 :
        alert('', '确认提货吗?', [
          {text: '取消', onPress: () => console.log('cancel')},
          {
            text: '确定', onPress: () => {
              selfLifting({
                orderId: item.orderId,
              }).then(res => {
                Toast.info('提货成功');
                this.downCallback();
              })
            },
            style: {
              color: '#fff',
              background: '#F23A5C',
            }
          },
        ])
        break;
        //立即挂售
      case 7 :
        alert('', '立即挂售吗?', [
          {text: '取消', onPress: () => console.log('cancel')},
          {
            text: '确定', onPress: () => {
              immediateHangSale({
                orderId: item.orderId,
              }).then(res => {
                Toast.info('立即挂售成功');
                this.downCallback();
              })
            },
            style: {
              color: '#fff',
              background: '#F23A5C',
            }
          },
        ])
        break;
        //停止挂售
      case 8 :
        alert('', '确认停止挂售吗?', [
          {text: '取消', onPress: () => console.log('cancel')},
          {
            text: '确定', onPress: () => {
              stopHangSell({
                orderId: item.orderId,
              }).then(res => {
                Toast.info('停止挂售成功');
                this.downCallback();
              })
            },
            style: {
              color: '#fff',
              background: '#F23A5C',
            }
          },
        ])
        break;
        //查看详情
      case 9 :
        window.location.hash = `#/order/detail/${item.orderId}`;
        break;
      default:
        Toast.info('未知按钮')
        break;
    }
  }

  componentDidMount() {
    var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // 创建MeScroll对象:为避免配置的id和父组件id重复,这里使用ref的方式初始化mescroll
    var mescrollNew = new MeScroll(this.refs.mescroll, {
      down: {
        offset: 160,
        outOffsetRate: 0.2, //超过指定距离范围外时,改变下拉区域高度比例;小于1,越往下拉高度变化越小;
        auto: true, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
        autoShowLoading: true,
        isLock: false, //是否锁定下拉,默认false;
        mustToTop: true, //是否列表必须滑动到顶部才能下拉;因为列表回弹效果(-webkit-overflow-scrolling:touch)是iOS专属样式,所以iOS默认false,其他为true;
        warpClass: "mescroll-downwarp",
        callback: () => {
          this.downCallback()
        }, // 下拉刷新的回调
        inOffset: function (mescroll) {
          //进入指定距离offset范围内那一刻的回调
          if (mescroll.downTipDom) mescroll.downTipDom.innerHTML = "下拉刷新";
          if (mescroll.downProgressDom) mescroll.downProgressDom.classList.remove("mescroll-rotate");
        },
        outOffset: function (mescroll) {
          //下拉超过指定距离offset那一刻的回调
          if (mescroll.downTipDom) mescroll.downTipDom.innerHTML = "释放更新";
        },
        htmlContent: `<p class="downwarp-progress"></p><p class="downwarp-tip" style="font-size:24px;color:#333">加载中...</p>`,
      },
      up: {
        auto: false, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
        callback: () => {
          this.upCallback()
        }, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10, // 每页数据的数量
          time: null //加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
        },
        empty: {
          warpId: this.props.id ? this.props.id : 'mescroll',
          icon: 'http://s.no1im.com/lib/imgs/noData.png',
          tip: "<p>暂无数据</p>",
          btntext: "",
          btnClick: null,
          supportTap: false
        },
        htmlNodata: `<p class="upwarp-nodata" style="padding-bottom:${this.props.marginBottom ? this.props.marginBottom + 'rem' : '20px'};font-size:24px;color:#333">-- 我是有底线的 --</p>`
      }
    });
    this.setState({
      mescroll: mescrollNew
    });
  }

  render() {
    return (
        <div id={this.props.id} className="mescroll  inner" style={{height: document.body.offsetHeight + 'px'}}
        ref="mescroll">
          <div className="lists">
            {
              this.state.dataList.length > 0 && this.state.dataList.map((item, index) => {
                if (this.props.modleType === 1) {
                  //订单模板
                  return (
                    <div key={index} className="order-list-wrap">
                      <div className="order-num-content cf">
                        <span className="order-number">订单号：{item.igoOrderSn}</span>
                        <span className="order-status">{item.igoStatusStr}</span>
                      </div>
                      <div className="order-goods-wrap">
                        <div className="goods-item-wrap">
                          <div className="googs-item">
                            <img src={item.goodsMainImg}/>
                            <div className="goods-info">
                              <p className="goods-name">{item.goodsName}</p>
                              <p className="goods-price">
                                <span className='name'>总金额：</span>
                                <span
                                className="money">{item.totalAmount!='0'?`¥${item.totalAmount}+`:''}{item.totalIntegral}{item.orderType == 1 ? '积分' : '玩呗'}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="goods-operate">
                          {
                            item.operableStatus && item.operableStatus.map((object, j) => {
                              return (
                                <span key={j} onClick={() => {
                                  this.handleOperation(object, item)
                                }}>{operation[object]}</span>
                              )
                            })
                          }
                          </div>
                        </div>
                      </div>
                  )
                }
              })
            }
          </div>
        </div>
    )
  }
}

export default MeScrollPage;
