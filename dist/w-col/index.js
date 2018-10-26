import Behavior from '../common/behavior/index';

const LayoutRow = '../w-row/index';

Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'],

  /**
   * 组件间关系定义
   */
  relations: {
    [LayoutRow]: {
      type: 'ancestor',
    },
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
   * @param {number} offset 栅格左侧的间隔格数，间隔内不可以有栅格	
   * @param {number} pull 栅格向左移动格数
   * @param {number} push 栅格向右移动格数
   * @param {number} span 栅格占位格数，为 0 时相当于 display: none
   */
  properties: {
    offset: {
      type: Number,
      value: 0,
    },
    pull: {
      type: Number,
      value: 0,
    },
    push: {
      type: Number,
      value: 0,
    },
    span: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _gutter: null,
    _direction: 'left',
  },

  /**
   * 组件方法列表
   */
  methods: {
    updateGutter(gutter) {
      this.setData({
        _gutter: gutter/2 || 0,
      })
    },
    updateDirection(direction) {
      this.setData({
        _direction: direction || 'left',
      })      
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