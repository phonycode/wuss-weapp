/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-12 16:37:32 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-22 09:28:44
 */
import field from '../common/behavior/field';
import cell from '../common/behavior/cell';
Component({
  behaviors: [cell, field],
  externalClasses: [
    'wuss-class',
    'wuss-class-label',
    'wuss-class-input-wrap',
    'wuss-class-input',
  ],
  relations: {
    '../w-cell-group/index': {
      type: 'ancestor',
    },
    '../w-form/index': {
      type: 'ancestor',
    },
    '../w-validate/index': {
      type: 'ancestor',
    },
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    ///////自带属性
    value: {
      type: String,
      value: '',
      observer: 'goValidate',
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
    placeholderStyle: {
      type: String,
      value: '',
    },
    placeholderClass: {
      type: String,
      value: '',
    },
    cursor: {
      type: Number,
      value: '',
    },
    cursorSpacing: {
      type: Number,
      value: 0,
    },
    focus: {
      type: Boolean,
      value: false,
    },
    selectionStart: {
      type: Number,
      value: -1,
    },
    selectionEnd: {
      type: Number,
      value: -1,
    },
    adjustPosition: {
      type: Boolean,
      value: true,
    },
    rows: {
      type: Number,
      value: 1,
    },
    autoHeight: {
      type: Boolean,
      value: false,
    },
    fixed: {
      type: Boolean,
      value: false,
    },
    ///////////////////////////////
    //////////////自定义属性
    /**
     * @param {String} label label展示的字段
     * @param {String} moneyKeyboardAlign 文字排版起始方向, 可选为 'left', 'right'
     * @param {String} labelSpan label的宽度
     * @param {String} extra 注释
     * @param {String} clear 是否开启清楚
     * @param {String} count 计数的数量  只有 type==='textarea生效
     * @param {String} readOnly 是否只读
     */
    label: {
      type: String,
      value: '',
    },
    moneyKeyboardAlign: {
      type: String,
      value: 'right',
    },
    labelSpan: {
      type: Number,
      value: 2,
    },
    extra: {
      type: String,
      value: '',
    },
    clear: {
      type: Boolean,
      value: false,
    },
    count: {
      type: Number,
      value: '',
    },
    readOnly: {
      type: Boolean,
      value: false,
    },
  },
  ready() {
    const value = this.formatValue(this.data.value);
    this.setData({ value });
    if (value === '') {
      this.goValidate('');
    }
  },
  methods: {
    formatValue(value) {
      const { type } = this.data;
      switch (type) {
        case 'mobile':
          value = value.replace(/\s/g, '');
          value = value
            .replace(/(\d{0,3})(\d{0,4})(\d{0,4})/, '$1 $2 $3')
            .trim();
          break;
        case 'bankCard':
          value = value.replace(/\s/g, '');
          value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
          break;
        default:
          break;
      }
      return value;
    },
    _trigger(name, e) {
      this.triggerEvent(name, e.detail);
    },
    ///////////input的监听函数
    handlerChange(e) {
      const { value = '' } = e.detail || {};
      this._trigger('onChange', { detail: { value } });
      this._trigger('input', { detail: { value } });
      this.setData({ value: this.formatValue(value) });
    },
    handlerFocus(e) {
      this._trigger('onFocus', e);
      this.setData({ _focus: true });
    },
    handlerConfirm(e) {
      this._trigger('onConfirm', e);
    },
    handlerBlur(e) {
      this._trigger('onBlur', e);
      this.setData({ _focus: false });
    },
    handerExtraClick(e) {
      this._trigger('extraClick', e);
    },
    handerLineChange(e) {
      this._trigger('lineChange', e);
    },
    handerClearClick(e) {
      this._trigger('clearClick', e);

      this.setData({ value: '' });
    },
    getValue(value) {
      if (!!~['mobile', 'bankCard'].indexOf(this.data.type)) {
        return value.replace(/\s/g, '');
      }
      return value;
    },
    //调用验证
    goValidate(newValue) {
      const validate = this.getRelationNodes('../w-validate/index')[0];
      if (!validate) return false;
      newValue = this.getValue(newValue);
      validate.isValidate(newValue);
    },
  },
});
