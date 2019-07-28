/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-13 11:55:53 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-21 12:53:58
 */
import { registerShareEvent } from '../../common/share';

const pageOptions = {
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
}
registerShareEvent(pageOptions);

Page(pageOptions);
