/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-08-31 17:11:58 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-04 15:34:39
 */
import {
  createQrCodeImg
} from 'qrcode';

Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'],

  /**
   * 组件间关系定义
   */
  relations: {},

  /**
   * 组件选项
   */
  options: {},

  /**
   * 组件的属性列表
   * @param {string} text 二维码信息
   * @param {string} size 二维码大小
   */
  properties: {
    text: {
      type: String,
      value: '',
      observer(val) {
        this.drawQRCode()
        this.triggerEvent('change',{ val },{})
      },
    },
    size: {
      type: String,
      value: 100,
      observer() {
        this.computedStyles()
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件方法列表
   */
  methods: {
    /**
     * 绘制二维码
     */
    drawQRCode() {
      const { text } = this.data;
      const base64Data = createQrCodeImg(encodeURIComponent(text))
      this.computedStyles()
      this.setData({
        base64Data
      })
    },
    /**
     * 计算styles
     */
    computedStyles() {
      const { size } = this.data;
      this.setData({
        styles: `width: ${String(size).indexOf('px') > -1 ? size : size + 'px' };height: ${String(size).indexOf('px') > -1 ? size : size + 'px' };`
      })
    },
    /**
     * 渲染错误回调
     */
    handleOnError() {
      this.triggerEvent('onLoad', {
        ...this.properties,
      }, {});
    },
    /**
     * 渲染成功回调
     */
    handleOnLoad() {
      this.triggerEvent('onLoad', {
        ...this.properties,
      }, {});
    },
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function () {},

  /**
   * 组件布局完成后执行
   */
  ready: function () {
    this.drawQRCode();
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  attached: function () {},

  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
  moved: function () {},

})