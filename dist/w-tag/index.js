/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-16 21:30:31 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-16 21:32:39
 */
// dist/w-tag/index.js
Component({
  externalClasses: ['wuss-class'],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
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

  /**
   * 组件的初始数据
   */
  data: {
    _closeAnimate: true,
  },
  ready() {
    this.setData({
      _closeAnimate: this.data.visible,
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
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
