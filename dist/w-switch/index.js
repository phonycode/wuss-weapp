/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-13 10:24:04 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-15 17:19:23
 */
import Behavior from '../common/behavior/index';
import field from '../common/behavior/field';

Component({
  behaviors: [field, Behavior],

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
    value: {
      type: Boolean,
      value: false,
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
  methods: {
    _handleClick() {
      const { disabled, value: _value } = this.data;
      if (disabled) return false;
      const value = !_value;
      this.setData({ value });
      this.triggerEvent('onChange', { value }, {});
    },
  },
});
