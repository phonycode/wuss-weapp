import { Toast } from '../../dist/index';
import { registerShareEvent } from '../../common/share';

const pageOptions = {
  data: {
    text: '一款高质量，组件齐全，高自定义的微信小程序UI组件库------Wuss Weapp',
  },
  noticeClose() {
    Toast.show({
      message: 'Notice close',
    });
  },
}
registerShareEvent(pageOptions);

Page(pageOptions);
