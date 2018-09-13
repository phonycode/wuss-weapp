/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-08 10:54:34 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-10 17:18:58
 */
import Behavior from '../common/behavior/index';

const OPTIONS = {
  duration: 200,
  timingFunction: 'linear',
  delay: 0,
  transformOrigin: '50% 50% 0'
};

const animationFunc = (opts = {}) => wx.createAnimation({ ...OPTIONS,
  ...opts
});

const _IN_FROM = animationFunc({
  duration: 0
}).opacity(0).scale(1.185).step().export();

const _IN_TO = animationFunc().opacity(1).scale(1).step().export();

const _OUT_FROM = animationFunc().opacity(0).scale(.85).step().export();

const _OUT_TO = animationFunc({
  duration: 20
}).opacity(0).scale(1.185).step().export();


Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'],

  /**
   * 组件间关系定义
   */
  relations: {

  },

  /**
   * 组件选项
   */
  options: {},

  /**
   * 组件间关系定义
   */
  behaviors: [Behavior],

  /**
   * 组件的属性列表
   * @param {boolean} visible 显示/隐藏
   * @param {string} width dialog的内容区宽度.默认80%
   * @param {boolean} maskClose 点击遮罩层是否可以关闭？
   * @param {string} height dialog的内容区高度，可选
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer(show) {
        if (show) {
          this._maskShow();
          this._in();
        } else {
          this.handleClose()
          this._out();
        }
      },
    },
    width: {
      type: String,
      value: '80%',
    },
    maskClose: {
      type: Boolean,
      value: true,
    },
    height: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _animation: {},
    _animate_visible: false, // out 动画完成
    _maskShadow: false, // 模态框是否可见
  },

  /**
   * 组件方法列表
   */
  methods: {
    _in() {
      this.setData({
        _animate_visible: true,
      }, () => this.setData({
        _animation: _IN_FROM,
      }, () => setTimeout(() => {
        this.setData({
          _animation: _IN_TO,
        })
      }, 20)))
    },
    _out() {
      this.setData({
        _animation: _OUT_FROM,
      }, () => setTimeout(() => this.setData({
        _animation: _OUT_TO
      }, () => setTimeout(() => {
        this.setData({
          _animate_visible: false,
        })
      }, 20)), 200))
    },
    _maskShow() {
      this.setData({
        _maskShadow: true,
      })
    },
    handleClose() {
      this.setData({
        _maskShadow: false,
      })
      this.triggerEvent('close')
    },
  },
  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function () {},

  /**
   * 组件布局完成后执行
   */
  ready: function () {},

  /**
   * 在组件实例进入页面节点树时执行
   */
  attached: function () {},

  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
  moved: function () {},

})