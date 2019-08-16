/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-08-31 17:11:58 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2019-01-26 15:53:59
 */
import WussComponent from '../common/extends/baseComponent';
import { createQrCodeImg } from 'qrcode';

WussComponent({
  /**
   * 组件的属性列表
   * @param {string} text 二维码信息
   * @param {string} size 二维码大小
   * @param {boolean} usingEncode 开启后生成的二维码自动encodeURIComponent
   */
  properties: {
    text: {
      type: String,
      value: '',
      observer(val) {
        this.drawQRCode();
        this.triggerEvent('change', { val }, {});
      },
    },
    size: {
      type: String,
      value: 100,
      observer() {
        this.computedStyles();
      },
    },
    usingEncode: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    /**
     * 绘制二维码
     */
    drawQRCode() {
      const { text, usingEncode } = this.data;
      const base64Data = createQrCodeImg(usingEncode ? encodeURIComponent(text): String(text));
      this.computedStyles();
      this.setData({ base64Data });
    },
    /**
     * 计算styles
     */
    computedStyles() {
      const { size } = this.data;
      this.setData({
        styles: `width: ${
          String(size).indexOf('px') > -1 ? size : size + 'px'
        };height: ${String(size).indexOf('px') > -1 ? size : size + 'px'};`,
      });
    },
    /**
     * 渲染错误回调
     */
    handleOnError() {
      this.triggerEvent(
        'onLoad',
        {
          ...this.properties,
        },
        {}
      );
    },
    /**
     * 渲染成功回调
     */
    handleOnLoad() {
      this.triggerEvent(
        'onLoad',
        {
          ...this.properties,
        },
        {}
      );
    },
  },
  ready: function() {
    this.drawQRCode();
  },
});
