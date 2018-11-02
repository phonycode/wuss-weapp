/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-10-27 14:08:39 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-11-01 14:44:55
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
   * @param {string} label 标签
   * @param {number} labelSpan 标签所占宽度
   * @param {array} defaultValue 初始化的默认值
   * @param {array} currentValue 设置当前激活的值
   * @param {boolean} showCode 返回的值是否是地址的code码
   * @param {boolean} disabled 禁用
   * @param {string} customItem 可为每一列的顶部添加一个自定义的项
   */
  properties: {
    label: {
      type: String,
      value: '请选择地址',
    },
    labelSpan: {
      type: Number,
      value: 3,
    },
    defaultValue: {
      type: Array,
      value: [],
    },
    currentValue: {
      type: Array,
      value: [],
      observer(value) {
        !!Array.prototype.toString.call(value) && this.setData({
          value,
        })
      },
    },
    showCode: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    customItem: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: [],
    _currentValue: '请选择',
  },

  /**
   * 组件方法列表
   */
  methods: {
    handleChange(e) {
      const { code: currentCode, value: currentValue } = e.detail;
      const { showCode } = this.data;
      const current = showCode ? currentCode : currentValue;
      this.setData({
        value: currentValue,
        _currentValue: currentValue.join(' ',''),
      })
      this.triggerEvent('onChange', {
        value: current,
      }, {});
    },
    handleCancel(e) {
      this.triggerEvent('onCancel',e)
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
    const { defaultValue } = this.data;
    if(!!Array.prototype.toString.call(defaultValue)) {
      this.setData({
        value: defaultValue,
        _currentValue: defaultValue.join(' ',''),
      })
    }
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