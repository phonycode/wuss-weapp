import Toast from '../../dist/w-toast/toast.js';
Page({
  data: {
    text:
      'wuss 一款高质量，组件齐全，高自定义的微信小程序UI组件库------juzhiqiang',
  },
  noticeClose() {
    Toast.show({
      message: 'Notice close',
    });
  },
});
