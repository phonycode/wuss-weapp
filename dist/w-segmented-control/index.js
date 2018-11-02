/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-10-31 09:28:52 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-10-31 17:31:02
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
  relations: {},

  /**
   * 组件选项
   */
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件间关系定义
   */
  behaviors: [Behavior],

  /**
   * 组件的属性列表
   * @param {string} options 传入的选项组 ['xxx','xxx','xxx','xxx']
   * @param {string} color 组件的主色调
   * @param {boolean} disabled 禁用
   * @param {number} defaultIndex 初始化默认的索引
   * @param {string} styles 自定义样式
   */
  properties: {
    options: {
      type: Array,
      value: [],
    },
    color: {
      type: String,
      value: '#ff9900',
    },
    disabled: {
      type: Boolean,
    },
    defaultIndex: {
      type: Number,
      value: 0,
    },
    currentIndex: {
      type: Number,
      observer(v) {
        if(isNaN(v) || typeof v !== 'number') return false;
        this.setData({ _currentIndex: v })
      },
    },
    styles: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _currentIndex: 0,
  },

  /**
   * 组件方法列表
   */
  methods: {
    _handleClick(e) {
      const { disabled } = this.data;
      const { index: _currentIndex } = e.target.dataset;
      if(isNaN(_currentIndex) || _currentIndex === this.data._currentIndex || disabled) return false;
      this.setData({ _currentIndex }, () => this.triggerEvent('onChange',{ value: _currentIndex},{}));
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
    const { defaultIndex } = this.data;
    if(isNaN(defaultIndex) || typeof defaultIndex !== 'number') return false;
    this.setData({ _currentIndex: defaultIndex })
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