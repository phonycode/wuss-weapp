/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-15 09:20:34 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-19 11:57:24
 */
import Behavior from '../common/behavior/index';
import field from '../common/behavior/field';
Component({
  behaviors: [Behavior, field],
  externalClasses: ['wuss-class'],
  relations: {
    '../w-form/index': {
      type: 'ancestor',
    },
  },
  options: {
    addGlobalClass: true,
  },
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
  data: {
    value: {},
  },
  methods: {
    _handleSelect(e) {
      if(!this.data.visible) { return false };
      this.setData({ value: e.detail.item }, () => this.triggerEvent('onSelect', { ...e.detail.item }, {}))
    },
    _handleChange(e) {
      if(!this.data.visible) { return false };
      this.triggerEvent('onChange', { ...e.detail.currentItem }, {});
    },
    _handleCancel() {
      this.triggerEvent('onCancel', {}, {});
    },
    _confirm() {
      const picker = this.selectComponent('#wuss-picker');
      const { data: { currentItem } } = picker;
      this.setData({ value: currentItem }, () => {
        this.triggerEvent('onSelect', { ...currentItem }, {})
        this._handleCancel();
      })
    },
  },
});
