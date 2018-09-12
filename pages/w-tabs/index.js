/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-8 17:52:32 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-10 17:55:27
 */
// pages/w-tabs/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 2,
    tabs1: [
      {
        text: '电器',
      },
      {
        text: '数码',
      },
      {
        text: '食品',
      },
      {
        text: '手机',
      },
    ],
    tabs2: [
      {
        text: '微博',
        icon: 'weibo',
        iconSize: '32rpx',
        iconColor: '#ef473a',
      },
      {
        text: '脸书',
        icon: 'facebook',
        iconSize: '32rpx',
        iconColor: '#ef473a',
      },
      {
        text: '苹果',
        icon: 'apple',
        iconSize: '32rpx',
        iconColor: '#ef473a',
      },
      {
        text: '安卓',
        icon: 'android',
        iconSize: '32rpx',
        iconColor: '#ef473a',
      },
    ],
    tabs3: [
      {
        text: '英雄联盟',
      },
      {
        text: '绝地求生',
      },
      {
        text: 'DNF',
      },
      {
        text: '炉石传说',
      },
    ],
    tabs4: [
      {
        text: 'tab1',
      },
      {
        text: 'tab2',
      },
      {
        text: 'tab3',
      },
      {
        text: 'tab4',
      },
    ],
    tabs5: [
      {
        text: 'tab1',
      },
      {
        text: 'tab2',
      },
      {
        text: 'tab3',
      },
      {
        text: 'tab4',
      },
      {
        text: 'tab5',
      },
      {
        text: 'tab6',
      },
      {
        text: 'tab7',
      },
      {
        text: 'tab8',
      },
      {
        text: 'tab9',
      },
      {
        text: 'tab10',
      },
    ],
    tabs5: [
      {
        text: 'tab1',
      },
      {
        text: 'tab2',
      },
      {
        text: 'tab3',
      },
      {
        text: 'tab4',
      },
      {
        text: 'tab5',
      },
      {
        text: 'tab6',
      },
      {
        text: 'tab7',
      },
      {
        text: 'tab8',
      },
      {
        text: 'tab9',
      },
    ],
  },
  handleChange(e) {
    const index = e.detail.index;
    console.log(e);
  },
  handleSelected() {
    this.setData({
      index: 2,
    });
  },
  handleClick(e) {
    const { index, title } = e.detail;
    console.log('点击了tab:' + index, title);
  },
  onDisabled(e) {
    const { index, title } = e.detail;
    console.log('点击了禁用的:' + index, title);
  },
});