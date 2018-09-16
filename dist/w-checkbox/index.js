/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-14 14:14:38 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-16 10:03:05
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
      observer(items) {
        this.setData({
          value: items
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
      const { items } = this.data;
      const key = e.currentTarget.dataset.key;
      const item = items[key];
      if (item.disabled) return false;
      item.checked = !item.checked;
      this.setData({ items: [...items] }, () => {
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
      const { items } = this.data;
      items.forEach(e => {
        if (!e.disabled) {
          delete e.checked;
        }
      });
      this.setData({ items });
    },
  },
});
