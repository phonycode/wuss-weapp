/*
 * @Author: cnyballk[https://github.com/cnyballk]
 * @Date: 2018-09-8 17:52:32
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2019-07-02 21:11:47
 */
Page({
  data: {
    index: 2,
    tabs1: ['电器', '数码', '食品', '手机'],
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
    tabs3: ['英雄联盟', '绝地求生', 'DNF', '炉石传说'],
    tabs4: ['tab1', 'tab2', 'tab3', 'tab4'],
    tabs5: [
      'tab1',
      'tab2',
      'tab3',
      'tab4',
      'tab5',
      'tab6',
      'tab7',
      'tab8',
      'tab9',
      'tab10',
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
  onDisabled(e) {
    const { index, title } = e.detail;
    console.log('点击了禁用的:' + index, title);
  },
});
