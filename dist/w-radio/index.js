/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-14 09:43:02 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-18 14:51:02
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
  behaviors: [Behavior,field],

  /**
   * 组件的属性列表
   * @param {string} options 选项组 { key value ...item }
   * @param {string} defaultValue 默认选中项
   * @param {string} label 选项组标题
   * @param {string} value 当前值
   * @param {string} color 颜色
   */
  properties: {
    options: {
      type: Array,
      value: [],
    },
    defaultValue: {
      type: String,
      value: '',
    },
    label: {
      type: String,
      value: '',
    },
    wModel: {
      type: String,
      value: {},
      observer(val) {
        this._changeValue();
      },
    },
    color: {
      type: String,
      value: '#28a2f3',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: {},
  },

  /**
   * 组件方法列表
   */
  methods: {
    /**
     * 单选框被选中
     */
    _handleChecked(e) {
      const {
        index
      } = e.currentTarget.dataset;
      let {
        data: {
          options
        },
        _empty,
      } = this;
      const item = options[index];
      if (item.disabled) return false;
      options = _empty(options, 'checked');
      options[index].checked = true;
      const newValue = _empty(item, 'checked');
      this.setData({
        options,
        value: newValue.value,
      }, () => this.triggerEvent('onChange',{ value: newValue.value },{}));
    },
    _changeValue() {
      const {
        options,
        wModel,
        value,
      } = this.data;
      if (wModel && typeof wModel === 'string') {
        let currentItem = '';
        const diff = options.reduce((p, n) => {
          if (n.value === wModel && !n.disabled) {
            n.checked = true;
            currentItem = n;
            p.count += 1;
          } else {
            n.checked = false;
          }
          p.array.push(n);
          return p;
        }, {
          count: 0,
          array: [],
        })
        this.setData({
          options: diff.count > 0 ? diff.array : options,
          value: diff.count > 0 && currentItem ? currentItem.value : value,
        }, () => this.triggerEvent('onChange',{ value: currentItem.value },{}))
      }
    },
    _empty(any, key) {
      if (!key) return any;
      if (Array.isArray(any)) {
        return Object.keys(any).map(i => {
          delete any[i][key];
          return any[i];
        })
      } else if (typeof any === 'object') {
        const empty_obj = Object.assign({}, any);
        delete empty_obj[key];
        return empty_obj;
      }
    },
    _emptyValue() {
      this.setData({
        wModel: '',
      })
      this._changeValue();
    },
  },
  ready: function () {
    const {
      defaultValue,
      options,
      value,
    } = this.data;
    let currentItem = '';
    if (defaultValue) {
      options.map(i => {
        if (i.value === defaultValue && !i.disabled) {
          currentItem = i;
          i.checked = true;
        } else {
          i.checked = false;
        }
      })
    }
    this.setData({
      options,
      value: currentItem ? currentItem.value : value,
    })
  },
});