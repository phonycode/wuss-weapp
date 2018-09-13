/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-13 11:55:53 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-13 16:58:32
 */
// pages/w-input/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
  },
  handleFocus() {
    this.setData({
      focus: true,
    });
  },
  iChange(e) {
    console.log('我改变了', e.detail.value);
  },
  iFocus(e) {
    console.log('我获取到焦点了', e.detail.value);
  },
  iBlur(e) {
    console.log('我失去焦点了', e.detail.value);
  },
  extraClick(e) {
    console.log('注释被点击了', e);
  },
});
