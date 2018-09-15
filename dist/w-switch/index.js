/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-13 10:24:04 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-15 16:47:26
 */
import Behavior from '../common/behavior/index';
import field from '../common/behavior/field';

Component({
  behaviors: [field, Behavior],

  externalClasses: ['wuss-class'],

  relations: {},

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   * @param {string} size 大小,可选[small/default/larger]
   * @param {string} open 设置当前开关状态
   * @param {string} color 颜色，激活后的颜色
   * @param {boolean} disabled 是否禁用
   */
  properties: {
    size: {
      type: String,
      value: 'default',
    },
    open: {
      type: Boolean,
      value: false,
      observer(val) {
        if (typeof val === 'boolean') {
          val ? this.open() : this.close();
        }
      },
    },
    color: {
      type: String,
      value: '#33cc33',
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
    value: false,
  },

  /**
   * 组件方法列表
   */
  methods: {
    _handleClick() {
      const value = !this.data.value;
      if (this.data.disabled) return false;
      this.setData({
        value,
      });
      this.triggerEvent('onChange', { open: value }, {});
    },
    open() {
      this.setData({
        value: true,
      });
    },
    close() {
      this.setData({
        value: false,
      });
    },
  },
});
