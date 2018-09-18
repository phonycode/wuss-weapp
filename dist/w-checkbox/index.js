/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-14 14:14:38 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-18 15:28:13
 */
import Behavior from '../common/behavior/index';
import field from '../common/behavior/field';

import cell from '../common/behavior/cell';
Component({
  externalClasses: ['wuss-class'],
  behaviors: [cell, field, Behavior],
  relations: {
    '../w-cell-group/index': {
      type: 'ancestor',
    },
    '../w-form/index': {
      type: 'ancestor',
    },
  },
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   * @param {string} color 颜色
   * @param {string} disabled 禁用
   * @param {string} title 标题
   * @param {string} direction 方向，可选值有[left/right]
   * @param {string} [options] 传入的数组对象，参数有 label,checked,disabled
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
    options: {
      type: Array,
      value: [],
      observer(options) {
        this.setData({
          value: options
            .filter(i => typeof i.checked === 'boolean' && i.checked)
            .map(i => {
              let item = { ...i };
              delete item.checked;
              return item;
            }),
        });
      },
    },
  },
  data: {
    value: [],
  },
  methods: {
    _handleChecked(e) {
      const { options } = this.data;
      const key = e.currentTarget.dataset.key;
      const item = options[key];
      if (item.disabled) return false;
      item.checked = !item.checked;
      this.setData({ options: [...options] }, () => {
        this.triggerEvent(
          'onChange',
          {
            checked: this.data.value,
          },
          {}
        );
      });
    },
    _emptyValue() {
      const { options } = this.data;
      options.forEach(e => {
        if (!e.disabled) {
          delete e.checked;
        }
      });
      this.setData({ options });
    },
  },
});
