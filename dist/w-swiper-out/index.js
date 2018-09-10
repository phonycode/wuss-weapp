/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-06 16:23:23 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-10 11:22:07
 */
import Behavior from '../base/behavior/index';
const SYSTEM_INFO = wx.getSystemInfoSync();
Component({
  externalClasses: ['wuss-class'],
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件间代码共享
   */
  behaviors: [Behavior],

  /**
   * 组件的属性列表
   * @param {array} swiperOutBtns 侧滑菜单按钮列表 参数有 text, color, background, disabled
   * @param {number} buttonWidth 按钮的宽度
   * @param {boolean} close 是否展开
   * @param {string} backgroundColor 背景颜色
   * @param {number} height  容器的高度
   * @param {number} threshold 侧滑触发的阀值
   * @param {boolean} autoClose 点击按钮自动收起
   * @param {boolean} disabled 禁用侧滑菜单
   */
  properties: {
    swiperOutBtns: {
      type: Array,
      value: [],
    },
    backgroundColor: {
      type: String,
      value: '#ffffff',
    },
    buttonWidth: {
      type: Number,
      value: 0,
    },
    height: {
      type: Number,
      value: 44,
    },
    threshold: {
      type: Number,
      value: .35,
    },
    close: {
      type: Boolean,
      value: false,
      observer(val) {
        val ? this.open() : this.close();
      },
    },
    autoClose: {
      type: Boolean,
      value: true,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _scrollX: 0,
    _startX: 0,
    _slideWidth: 0,
    out: true,
    _width: SYSTEM_INFO.windowWidth,
    _threshold: 0,
  },

  /**
   * 组件方法列表
   */
  methods: {
    /**
     * movable-view 移动回调
     */
    handleChange(e) {
      const { out, _threshold, disabled } = this.data;
      const { x } = e.detail;
      if(disabled)return false;
      if (!out && x < -_threshold) {
        this.setData({
          out: true
        })
      } else if (out && x >= -_threshold) {
        this.setData({
          out: false
        })
      }
    },
    /**
     * movable-view 鼠标按下回调
     */
    handleTouchStart(e) {
      const { pageX } = e.changedTouches["0"];
      this.setData({ _startX: pageX });
    },
    /**
     * movable-view 鼠标松开回调
     */
    handleTouchEnd(e) {
      const { pageX } = e.changedTouches["0"];
      const { _startX, _slideWidth, _threshold, disabled } = this.data;
      if(disabled)return false;
      if (_startX - pageX >= _threshold) {
        this.setData({
          _scrollX: -_slideWidth
        })
      } else if (_startX - pageX < _threshold && _startX - pageX > 0) {
        this.setData({
          _scrollX: 0
        })
      } else if (pageX - _startX >= _threshold) {
        this.setData({
          _scrollX: 0
        })
      } else if (pageX - _startX < _threshold && pageX - _startX > 0) {
        this.setData({
          _scrollX: -_slideWidth
        })
      }
    },
    /**
     * 菜单列表按钮被按下
     */
    handleBtnClick(e) {
      const { key } = e.currentTarget.dataset;
      const { swiperOutBtns, autoClose } = this.data;
      const item = swiperOutBtns[key];
      if(item.disabled)return false;
      this.triggerEvent(item.type);
      autoClose ? this.close() : '';
    },
    open() {
      const { _slideWidth } = this.data;
      this.setData({
        _scrollX: -_slideWidth,
      })
    },
    close() {
      this.setData({
        _scrollX: 0,
      })
    },
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function () {
  },

  /**
   * 组件布局完成后执行
   */
  ready: function () {
    const { threshold, buttonWidth, swiperOutBtns, close } = this.data;
    let _slideWidth = swiperOutBtns.length * (buttonWidth ? buttonWidth : (SYSTEM_INFO.windowWidth*0.45)/swiperOutBtns.length);
    this.setData({
      _slideWidth,
      _threshold: _slideWidth * threshold,
    })
    close ? this.open() : '';
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