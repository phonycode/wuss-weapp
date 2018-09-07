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
        text: '待付款',
        icon: 'credit-card',
        iconSize: '32rpx',
        iconColor: '#ef473a',
      },
      {
        text: '待发货',
        icon: 'inbox',
        iconSize: '32rpx',
        iconColor: '#ef473a',
      },
      {
        text: '待评价',
        icon: 'commenting',
        iconSize: '32rpx',
        iconColor: '#ef473a',
      },
      {
        text: '已完成',
        icon: 'cubes',
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
