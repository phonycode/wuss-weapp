/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-15 09:20:34 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-19 11:02:36
 */
import Behavior from '../common/behavior/index';
import field from '../common/behavior/field';
Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'],

  /**
   * 组件间关系定义
   */
  relations: {
    '../w-picker/index': {
      type: 'descendant',
    },
    '../w-form/index': {
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
  behaviors: [Behavior, field],

  /**
   * 组件的属性列表
   * @param {string} visible  组件是否可见
   * @param {string} disabled 禁用
   * @param {string} options  传入的选项数据源，格式key,value ...item
   * @param {string} value  form表单收集的值
   * @param {string} wModel  双向绑定当前值
   * @param {string} title  header中间的标题
   * @param {string} cancelText 取消按钮的文本
   * @param {string} confirmText  确定按钮的文本
   * @param {string} confirmTextColor 确定按钮的颜色
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    options: {
      type: Array,
      value: [],
    },
    defaultValue: {
      type: String,
      value: {},
    },
    value: {
      type: Object,
      value: {},
    },
    wModel: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    cancelText: {
      type: String,
      value: '取消',
    },
    confirmText: {
      type: String,
      value: '确认',
    },
    confirmTextColor: {
      type: String,
      value: '#ff8800',
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
    _handleSelect(e) {
      this.triggerEvent('onSelect',{ ...e.detail.item },{});
    },
    _handleChange(e) {
      this.triggerEvent('onSelect',{ ...e.detail.item },{});
    },
    _handleCancel() {
      this.triggerEvent('onCancel', {}, {})
    },
    _confirm() {
      const picker = this.getRelationNodes('../w-picker/index');
      console.log(picker)
      this._handleCancel()
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