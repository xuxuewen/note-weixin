export const setLocalStorage = (key, value) => {
  if (!key) return;
  let val = value;
  if (typeof value !== 'string') {
    val = JSON.stringify(value);
  }
  window.localStorage.setItem(key, val);
}

export const getLocalStorage = (key) => {
  if (!key) return;
  return window.localStorage.getItem(key);
}

export const removeLocalStorage = (key) => {
  if (!key) return;
  window.localStorage.removeItem(key);
}

export const setSessionStorage = (key, value) => {
  if (!key) return;
  let val = value;
  if (typeof value !== 'string') {
    val = JSON.stringify(value);
  }
  window.sessionStorage.setItem(key, val);
}

export const getSessionStorage = (key) => {
  if (!key) return;
  return window.sessionStorage.getItem(key);
}

export const removeSessionStorage = (key) => {
  if (!key) return;
  window.sessionStorage.removeItem(key);
}

export const search = (key) => {
  if (!key) return;
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  var url = window.location.hash == '' ? window.location.search : window.location.hash.substring(window.location.hash.indexOf('?'));
  var r = url.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

//获取路由地址的query
export const GetQueryString = (name)=>{
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var v = window.location.href;
  if(v.indexOf(name)=='-1'){
    return null;
  } else{
    var r = v.substr(v.indexOf(name)).match(reg);
    if(r != null) return decodeURI(r[2]);
    return null;
  }
}


//时间距离现在多久
export const dateDiff = (hisTime) => {
  var myDate = new Date();
  var now = myDate.getTime();
  var diffValue = now - hisTime;
  var result = '';
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var year = month * 12;
  var _year = diffValue / year;
  var _month = diffValue / month;
  var _week = diffValue / (7 * day);
  var _day = diffValue / day;
  var _hour = diffValue / hour;
  var _min = diffValue / minute;
  if (_year >= 1) result = parseInt(_year) + "年前";
  else if (_month >= 1) result = parseInt(_month) + "个月前";
  else if (_week >= 1) result = parseInt(_week) + "周前";
  else if (_day >= 1) result = parseInt(_day) + "天前";
  else if (_hour >= 1) result = parseInt(_hour) + "小时前";
  else if (_min >= 1) result = parseInt(_min) + "分钟前";
  else result = "刚刚";
  return result;
}

//对姓名，电话号码脱敏处理
//str：字符串，frontLen：前面保留位数，endLen：后面保留位数
export const doName = (str,frontLen,endLen) =>{//脱敏
  var len = str.length-frontLen-endLen;
  var xing = '';
  for (var i=0;i<len;i++) {
  xing+='*';
  }
  return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
}
