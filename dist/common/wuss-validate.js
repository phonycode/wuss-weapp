/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-18 12:45:25 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-10-18 09:48:30
 */
/** 如何使用 ?
 *  const wussV =  new WussValidate (rules)
 *  wussV.isValidate(value)
 *
 * 规则的类型 :
 * interface IWussValidate<T>
 * {
 *    value:T    //验证的规则
 *    message:string  //验证失败的提示语
 * }
 * @param {array} mode 模式 mobile | email | url |idcard
 * @param {IWussValidate<boolean>} required 是否必填
 * @param {IWussValidate<number>} equalLength  等于字符长度
 * @param {IWussValidate<number>} maxLength  最大字符长度
 * @param {IWussValidate<number>} minLength  最小字符长度
 * @param {IWussValidate<array>} rangelength  限制字符长度的范围
 * @param {IWussValidate<number>} equal  等于某值
 * @param {IWussValidate<number>} max  最大值
 * @param {IWussValidate<number>} min  最小值
 * @param {IWussValidate<number>} range  值的范围
 * @param {IWussValidate<string>} regexp  正则限制
 *
 *  使用 addMethods 增加新的方法
 *  wussV.addMethods(()=>{      return '我是验证失败的提示语' })
 */
class WussValidate {
  result = [];
  constructor(rules) {
    this.rules = rules;
  }
  isValidate(value) {
    this.value = value;
    for (const i in this.rules) {
      const message = this[i](this.rules[i]);
      message && this.result.push(message);
    }
    return this.result;
  }
  mode(arr) {
    for (const i in arr) {
      const message = this[arr[i]]();
      message && this.result.push(message);
    }
  }
  // 验证手机号
  mobile() {
    return !/^1[34578]\d{9}$/.test(this.value) && `请输入11位的手机号码`;
  }
  // 邮箱验证
  email() {
    return (
      !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        this.value
      ) && `请输入有效的电子邮件地址`
    );
  }
  url() {
    return (
      !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        this.value
      ) && `请输入有效的地址`
    );
  }
  idcard() {
    return (
      !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
        this.value
      ) && `请输入有效的身份证号`
    );
  }
  required({ value, message }) {
    return value && this.value.length === 0 && (message || `请输入值`);
  }
  // 等于长度
  equalLength({ value, message }) {
    return this.value.length !== value && (message || `长度必须为${value}位`);
  }
  // 最大长度
  maxLength({ value, message }) {
    return this.value.length > value && (message || `最多可以输入${value}位`);
  }
  // 最小长度
  minLength({ value, message }) {
    return this.value.length < value && (message || `长度不能少于${value}位`);
  }
  //验证一个长度范围[min, max]
  rangelength({ value, message }) {
    const l = this.value.length,
      minL = value[0],
      maxL = value[1];
    return (
      l > minL &&
      l < maxL &&
      (message || `请输入长度在 ${minL} 到 ${maxL} 之间的字符`)
    );
  }
  min({ value, message }) {
    return this.value < value && (message || `请输入不小于 ${value} 的数值`);
  }
  max({ value, message }) {
    return this.value > value && (message || `请输入不大于 ${value} 的数值`);
  }
  range({ value, message }) {
    const min = value[0],
      max = value[1];
    return (
      this.value > min &&
      this.value < max &&
      (message || `请输入 ${min} 到 ${max} 之间的数值`)
    );
  }
  equal({ value, message }) {
    return this.value === value && (message || `输入值必须和 ${value} 相同`);
  }
  regexp({ value, message }) {
    if (!value[0]) return;
    const _regexp = new RegExp(value[0], value[1] || '');
    return !_regexp.test(this.value) && message;
  }
  addMethods(name, func) {
    this[name] = func;
  }
}
export default WussValidate;
