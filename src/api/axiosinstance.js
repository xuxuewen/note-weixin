/* eslint no-param-reassign: 0*/
// ajax 工厂函数，创建一个 请求实例
/**
 * 使用demo
 * 1. 导入ajax api
 * import Ajax from './axiosinstance';
 * 2. 创建对应的ajax 实例
 * const ajax = new Ajax({
 *  baseURL:'/api' ,//  默认值是  '' 设置请求的通用api
 *  timeout:'5000' //  默认值 是5000，设置请求超时时间
 *  headers:{}   // 设置请求的头部，处理特殊的请求头部
 * })
 *
 * 备注： 以上的所有参数都可以不传
 *
 * @type {Object}
 */
import axios from 'axios';
import qs from 'qs';
import Util from '../Util';

const defaultHeader = {
  'Content-Type': 'application/json',
  'appname': 'com.immortal.jeeqin',
  'platform': 'web',
  'v': '1.0',
  'version': 'wap1.0.2',
  'lang': 'zh-CN',
  'country':'CN',
  'token': Util.AppApiAction({'index': '10','data': {}}) || ''
};

// const location = window.location.href;// 获取环境


export default ({ baseURL = '', timeout = 5000, headers = defaultHeader }) => {
  // 创建请求实体
  const axiosinstance = axios.create({
    baseURL,
    timeout,
    headers
  });
  // 请求头部拦截
  axiosinstance.interceptors.request.use((config) => {
    let { method, params = {},data = {}, url } = config;
    if (!(method === 'get')&&!(method === 'post')) {
      return Promise.reject({
        message: `不支持的请求${method}`,
      });
    }
    config.params = params;
    config.data = data;
    config.url = url;
    return config;
  }, error => Promise.reject({
    message: error.message || '请求参数配置异常',
  }));

  // 请求响应拦截器
  axiosinstance.interceptors.response.use((response) => {
    const { state, msg, obj } = response.data;
    if (state != 1 && state != '2') {
      return Promise.reject({
        message: msg || '服务器异常',
        data: response.data
      });
    } else if (state == '2'&& Util.AppApiAction({'index': '10','data': {}}) == '') {
      Util.AppApiAction({'index': '0','data': {}})
    } else if (state == '2'&& Util.AppApiAction({'index': '10','data': {}}) != '') {
      Util.AppApiAction({'index': '0','data': {}})
    }
    return obj;
  }, error => Promise.reject({
    message: error.msg || '请求失败'
  }));
  return axiosinstance;
};
