/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-10-30 08:57:03 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-10-30 10:01:25
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
   * @param {number} count iconfont的数量
   * @param {number} max 最大可选值
   * @param {number} min 最小可选值
   * @param {boolean} disabled 禁用
   * @param {number} value 当前选中值
   * @param {string} iconFont 自定义字体图标
   * @param {string} activeColor 激活的颜色
   * @param {number} margin 每个iconfont之间的外边距
   * @param {number} fontSize iconfont大小
   */
  properties: {
    count: {
      type: Number,
      value: 5,
    },
    max: {
      type: Number,
    },
    min: {
      type: Number,
      value: 0,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    value: {
      type: Number,
      value: 0,
      observer(value) {
        const {
          count,
          max,
          min,
          disabled,
        } = this.data;
        if (value <= max ? max : count && value >= min && !disabled) {
          this.triggerEvent('onChange', {
            value
          }, {})
        }
      },
    },
    iconFont: {
      type: String,
      value: '★',
    },
    activeColor: {
      type: String,
    },
    margin: {
      type: Number,
    },
    fontSize: {
      type: Number,
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
    handleClick(e) {
      let {
        id: currentId
      } = e.target.dataset;
      const {
        value,
        max,
        min,
        disabled
      } = this.data;
      if (!currentId || disabled) return false;
      if(currentId <= min) {
        currentId = min;
      } else if(max && currentId >= max) {
        currentId = max;
      } else if(currentId === 1 && currentId === value) {
        currentId = 0;
      } else if (currentId === value) {
        currentId -= 1;
      }
      this.setData({
        value: currentId,
      }, () => this.triggerEvent('onChange', {
        value: this.data.value
      }, {}))
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