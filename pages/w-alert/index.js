/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-10 15:51:06 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-22 11:51:51
 */
import { Alert } from '../../dist/common/index';

Page({
  handleClick() {
    Alert({
      title: '提示',
      content: 'wuss weapp is good',
      confirm: () => {
        console.log('ok');
      },
    });
  },
  handleClick2() {
    Alert({
      title: 'ButtonColor',
      content: '按钮字体颜色是#28a2f3',
      buttonColor: '#28a2f3',
    });
  },
  handleClick3() {
    Alert({
      title: 'MoreText',
      content:
        '更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字',
    });
  },
});
