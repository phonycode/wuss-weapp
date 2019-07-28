/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-10 15:51:06 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-22 17:19:08
 */
import { Alert } from '../../dist/index';
import { registerShareEvent } from '../../common/share';

const pageOptions = {
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
  handleClick4 () {
    Alert({
      title: 'richText',
      content:
        '支持br换行<br/>支持hr线<hr/>支持其他h5标签',
    });
  }
};

registerShareEvent(pageOptions);
Page(pageOptions);