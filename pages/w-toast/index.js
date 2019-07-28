/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-5 17:55:32 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-22 17:19:32
 */
import { Toast } from '../../dist/index';
import { registerShareEvent } from '../../common/share';

const pageOptions = {
  top() {
    Toast.show({
      position: 'top',
      message: 'top',
    });
  },
  middle() {
    Toast.show({
      position: 'middle',
      message: 'middle',
    });
  },
  bottom() {
    Toast.show({
      position: 'bottom',
      message: 'bottom',
    });
  },
  default() {
    Toast.show({
      message: 'wuss小程序UI库',
    });
  },
  success() {
    Toast.show({
      type: 'success',
      message: 'success',
    });
  },
  like() {
    Toast.show({
      type: 'like',
      message: '收藏成功',
    });
  },
  thenClose() {
    Toast.show({ message: '完成后打印 close ' }).then(() => {
      console.log('close');
    });
  },
  useHide() {
    const wussToast = Toast.show({ message: '2.5s 后关闭 Toast', duration: 0 });
    wussToast.then(() => {
      console.log('close');
    });
    setTimeout(wussToast.hide, 2500);
  },
}
registerShareEvent(pageOptions);

Page(pageOptions);
