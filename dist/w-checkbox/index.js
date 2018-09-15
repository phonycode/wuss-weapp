/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-14 14:14:38 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-15 16:23:26
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
  options: {},

  /**
   * 组件间关系定义
   */
  behaviors: [Behavior],

  /**
   * 组件的属性列表
   * @param {string} color 颜色
   * @param {string} disabled 禁用
   * @param {string} title 标题
   * @param {string} direction 方向，可选值有[left/right]
   * @param {string} [items] 传入的数组对象，参数有 label,checked,disabled
   */
  properties: {
    color: {
      type: String,
      value: '#ff8800',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '',
    },
    direction: {
      type: String,
      value: 'left',
    },
    items: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _checked: false,
  },

  /**
   * 组件方法列表
   */
  methods: {
    _handleChecked(e) {
      const {
        items
      } = this.data;
      const key = e.currentTarget.dataset.key;
      const item = items[key];
      if (item.disabled) return false;
      this.setData({
        [`items[${key}].checked`]: !item.checked,
      }, () => {
        this.triggerEvent('onChange', {
          checked: this.data.items.filter(i => (typeof i.checked === 'boolean' && i.checked)).map(i => {
            let item = { ...i };
            delete item.checked;
            return item;
          }),
        }, {});
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