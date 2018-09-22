import { Toast } from '../../dist/index';
Page({
  data: {
    text: '一款高质量，组件齐全，高自定义的微信小程序UI组件库------Wuss Weapp',
  },
  noticeClose() {
    Toast.show({
      message: 'Notice close',
    });
  },
});
