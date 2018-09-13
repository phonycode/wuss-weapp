/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-12 16:37:32 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-13 12:25:58
 */
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
   * 组件的属性列表
   */
  properties: {
    ///////自带属性
    name: {
      type: String,
      value: '',
    },
    type: {
      type: String,
      value: 'text',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    maxlength: {
      type: Number,
      value: '140',
    },
    placeholder: {
      type: String,
      value: '',
    },
    'placeholder-style': {
      type: String,
      value: '',
    },
    'placeholder-class': {
      type: String,
      value: '',
    },
    cursor: {
      type: Number,
      value: '',
    },
    'cursor-spacing': {
      type: Number,
      value: 0,
    },
    focus: {
      type: Boolean,
      value: false,
    },
    'selection-start': {
      type: Number,
      value: -1,
    },
    'selection-end': {
      type: Number,
      value: -1,
    },
    'adjust-position': {
      type: Boolean,
      value: true,
    },
    ///////////////////////////////
    //////////////自定义属性
    /**
     * @param {String} moneyKeyboardAlign 文字排版起始方向, 可选为 'left', 'right'
     */
    moneyKeyboardAlign: {
      type: String,
      value: 'right',
    },
    labelNumber: {
      type: Number,
      value: 5,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},
  ready() {},
  /**
   * 组件方法列表
   */
  methods: {
    formatValue(value) {
      const { type } = this.data;
      value = value.replace(/\s/g, '').slice(0, 11);
      switch (type) {
        case 'phone':
          value = value.replace(/(\d{0,3})(\d{0,4})(\d{0,4})/g, '$1 $2 $3');
        default:
          break;
      }
      return value.trim();
    },
    _trigger(name, e) {
      this.triggerEvent(name, e.detail);
    },
    ///////////input的监听函数
    handlerChange(e) {
      this._trigger('change', e);

      return this.formatValue(e.detail.value);
    },
    handlerFocus(e) {
      this._trigger('focus', e);
    },
    handlerConfirm(e) {
      this._trigger('confirm', e);
    },
    handlerBlur(e) {
      this._trigger('blur', e);
    },
  },
});
