/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-16 21:30:31 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-16 22:22:35
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
   * @param {string} type 类型
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
    type: {
      type: String,
      value: 'normal',
    },
    tagStyle: {
      type: String,
      value: '',
    },
  },
  data: {
    _closeAnimate: true,
  },
  ready() {
    this.setData({
      _closeAnimate: this.data.visible,
    });
  },
  methods: {
    handlerClick() {
      this.triggerEvent('click', {});
    },
    _closeTag() {
      this.triggerEvent('close', {});
      this.setData(
        {
          _closeAnimate: false,
        },
        () => {
          setTimeout(() => {
            this.setData({
              visible: false,
            });
            this.triggerEvent('afterClose', {});
          }, 300);
        }
      );
    },
  },
});
