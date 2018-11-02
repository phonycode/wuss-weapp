/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-10-31 15:15:00 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-11-02 10:27:23
 */
import Behavior from '../common/behavior/index';

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
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },

  /**
   * 组件间关系定义
   */
  behaviors: [Behavior],

  /**
   * 组件的属性列表
   * @param {array} options 传入的选项组： { containerName, containerHeight }
   * @param {number} height 固定每个容器的高度
   * @param {number} width 固定每个容器的高度
   * @param {number} currentIndex 设置当前激活的索引
   * @param {number} defaultIndex 设置初始化索引
   */
  properties: {
    options: {
      type: Array,
      value: [],
      observer(v) {},
    },
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
    currentIndex: {
      type: Number,
      observer(v) {
        if(isNaN(v) || typeof v !== 'number') return false;
        this.setData({ _currentIndex: v })
      },
    },
    defaultIndex: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _currentIndex: 0,
    _currentHeight: wx.getSystemInfoSync().windowHeight, // 默认为当前屏幕的高度
    _currentWidth: wx.getSystemInfoSync().windowWidth, // 默认为当前屏幕的宽度
  },

  /**
   * 组件方法列表
   */
  methods: {
    handleChange(e) {
      const { options } = this.data;
      const { current } = e.detail;
      if(isNaN(current)) return false;
      const currentItem = options[current];
      if(currentItem.containerHeight) {
        this.setData({
          _currentHeight: currentItem.containerHeight,
        })
      }
      if(currentItem.containerWidth) {
        this.setData({
          _currentWidth: currentItem.containerWidth,
        })
      }
      this.triggerEvent('onChange',{ value: current },{});
    },
    handleAnimationFinish(e) {
      const { current } = e.detail;
      if(isNaN(current)) return false;
      this.triggerEvent('onAnimationFinish',{ value: current },{});
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
    const { options, defaultIndex } = this.data;
    this.setData({
      _currentIndex: defaultIndex,
    })
    try {
      if(!!Array.prototype.toString.call(options) && options[0]) {
        const initItem = options[0];
        if(initItem.containerHeight) {
          this.setData({
            _currentHeight: initItem.containerHeight,
          })
        }
        if(initItem.containerWidth) {
          this.setData({
            _currentWidth: initItem.containerWidth,
          })
        }
      }
    } catch (error) {}
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