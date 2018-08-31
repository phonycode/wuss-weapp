var Moment = function (date) {
  var date;
  if (date)
    this.date = new Date(date);
  else
    this.date = new Date();
  return this;
};
/**       
 * 对Date的扩展，将 Date 转化为指定格式的String       
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符       
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)       
 * eg:       
 * "yyyy-MM-dd hh:mm:ss.S" ==> 2006-07-02 08:09:04.423    
 * "yyyy-M-d h:m:s.S" ==> 2006-7-2 8:9:4.18       
 * "yyyy-MM-dd E HH:mm:ss" ==> 2009-03-10 二 20:09:04       
 * "yyyy-MM-dd EE hh:mm:ss" ==> 2009-03-10 周二 08:09:04       
 * "yyyy-MM-dd EEE hh:mm:ss" ==> 2009-03-10 星期二 08:09:04  
 */
Moment.prototype.format = function (format) {
  var date = this.date;
  /*
      var r= /^(\d{4})-(\d{1,2})-(\d{1,2})$/; //正则表达式 匹配出生日期(简单匹配)     
      r.exec('1985-10-15');
      s1=RegExp.$1;s2=RegExp.$2;s3=RegExp.$3;//结果为1985 10 15
      */
  if (typeof date === 'string')
    date = this.parse(date);
  var o = {
    "M+": date.getMonth() + 1, //月份 
    "(d+|D+)": date.getDate(), //日 
    "(h+|H+)": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+|Y+)/.test(format))
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  if (/(E+)/.test(format))
    format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  }
  return format;
}

Moment.prototype.parse = function () {
  return this.date;
}
/**
 * 计算两个日期差差
 * return day
 */
Moment.prototype.differ = function (date) {
  var time1 = this.date.getTime();
  if (typeof date === 'string')
    date = new Date(date);
  var time1 = this.date.getTime();
  var time2 = date.getTime();
  var differ = Math.ceil((time1 - time2) / (1000 * 3600 * 24));//除不尽时,向上取整
  return differ;
}

Moment.prototype.add = function (num, optionType) {
  var date = this.date;
  if ('day' === optionType) {
    date.setDate(date.getDate() + num);
  }
  if ('month' === optionType) {
    date.setMonth(date.getMonth() + num);
  }
  if ('year' === optionType) {
    date.setFullYear(date.getFullYear() + num);
  }
  this.date = date;
  return this;
}

Moment.prototype.before = function (date) {
  return this.date.getTime() < new Date(date).getTime()
}
Moment.prototype.after = function (date) {
  return this.date.getTime() > date.getTime()
}

module.exports = function (date) {
  return new Moment(date);
}