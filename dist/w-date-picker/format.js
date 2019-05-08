/**
 * 继承Date实例原型 写入format
 * @param {string} fmt 格式化模板 YYYY-MM-DD HH:mm:ss
 * @returns {date} formateDate
 */
Date.prototype.format = function(fmt) {
  const o = {
    "M+,": this.getMonth() + 1, //月份
    "d+,i": this.getDate(), //日
    "h+,i": this.getHours(), //小时
    "m+,": this.getMinutes(), //分
    "s+,": this.getSeconds(), //秒
  };
  if (/(y+)/i.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  };
  for (let k in o) {
    const [regexp, flags] = k.split(',');
    if (new RegExp(`(${regexp})`,flags).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};