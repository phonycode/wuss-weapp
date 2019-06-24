/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-10 15:51:06 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-22 17:19:08
 */
import { Alert } from '../../dist/index';

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
