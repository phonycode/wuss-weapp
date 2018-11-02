/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-16 21:30:31 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-11-02 16:48:49
 */
Component({
  externalClasses: ['wuss-class'],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   * @param {boolean} visible 控制是否可见
   * @param {boolean} closeable 是否可以关闭
   * @param {string} color 颜色
   * @param {String} tagStyle 标签的样式
   */
  properties: {
    visible: {
      type: Boolean,
      value: true,
    },
    closeable: {
      type: Boolean,
      value: false,
    },
    color: {
      type: String,
      value: 'normal',
    },
    tagStyle: {
      type: String,
      value: '',
    },
  },
  methods: {
    handlerClick() {
      this.triggerEvent('onClick', {});
    },
    _closeTag() {
      this.triggerEvent('onClose', {});
      this.setData({ visible: false }, () => {
        setTimeout(() => {
          this.triggerEvent('afterClose', {});
        }, 300);
      });
    },
  },
});
