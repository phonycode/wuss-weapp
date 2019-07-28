/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-8 17:52:32 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-12-07 14:32:09
 */
import { registerShareEvent } from '../../common/share';


const pageOptions = {
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
    tabs3: [
      '英雄联盟',
      '绝地求生',
      'DNF',
      '炉石传说'
    ],
    tabs4: [
      'tab1',
      'tab2',
      'tab3',
      'tab4'
    ],
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
      'tab10'
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
    const {
      index,
      title
    } = e.detail;
    console.log('点击了tab:' + index, title);
  },
  onDisabled(e) {
    const {
      index,
      title
    } = e.detail;
    console.log('点击了禁用的:' + index, title);
  },
}
registerShareEvent(pageOptions);

Page(pageOptions);