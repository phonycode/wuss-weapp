import Behavior from '../common/behavior/index';
import field from '../common/behavior/field';

Component({
  externalClasses: ['wuss-class'],
  relations: {
    '../w-form/index': {
      type: 'ancestor',
    },
  },
  options: {
    addGlobalClass: true,
  },
  behaviors: [Behavior,field],
  /**
   * 组件的属性列表
   * @param {array} options 传入的选项组[ [], [], [] ]
   * @param {string} defaultValue 默认值 可以支持 key value 例: [value,value,value...] 或 [key,key,key...]
   * @param {string} cancelTextColor 取消文本颜色
   * @param {string} cancelText 取消文本文字
   * @param {string} title 标题
   * @param {string} confirmTextColor 确认文本颜色
   * @param {string} confirmText 确认文本文字
   * @param {string} showValue 是否用value而不是key展示
   * @param {string} defaultKey onChange和onSelect事件返回的值是何种格式 [value,value...] [key,key,...]
   * @param {string} placeholder 初始化默认的占位符 例如：请选择
   */
  properties: {
    options: {
      type: Array,
      value: [],
    },
    defaultValue: {
      type: Array,
      value: [],
    },
    cancelTextColor: {
      type: String,
      value: '',
    },
    cancelText: {
      type: String,
      value: '取消',
    },
    label: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    confirmTextColor: {
      type: String,
      value: '',
    },
    confirmText: {
      type: String,
      value: '确认',
    },
    showValue: {
      type: Boolean,
      value: false,
    },
    defaultKey: {
      type: String,
      value: 'value',
    },
    placeholder: {
      type: String,
    },
  },
  data: {
    _visible: false,
    value: [],
    _currentText: '',
    _options: [],
    _isLinkage: false,
    _isReadyConfirm: true,
  },
  methods: {
    _handleClick() {
      this.setData({
        _visible: true,
      }, () => this.triggerEvent('onOpen'));
    },
    _handleCancel() {
      this.setData({
        _visible: false,
      },() => this.triggerEvent('onCancel'));
    },
    _handleConfirm() {
      const {
        _isReadyConfirm,
        value,
        showValue,
        defaultKey
      } = this.data;
      if (!_isReadyConfirm) return false;
      this.setData({
        _visible: false,
      });
      const currentValues = this.getValues(value, defaultKey);
      this.setData({
        _currentText: this.getValues(value, showValue ? 'value' : 'key').join(' ', ''),
        value: currentValues,
      }, () => this.triggerEvent('onSelect', {
        value: currentValues,
      }, {}))
    },
    _ArrayKeysToArrayObject() {
      const {
        options
      } = this.data;
      if (options.length <= 0) return false;
      const {
        0: items
      } = options;
      const _isArrayObject = this.isArrayObject(items);
      !_isArrayObject &&
        this.setData({
          options: options.map(i =>
            i.map(j => ({
              key: j,
              value: j,
            }))
          ),
        });
    },
    _handleTouchStart() {
      this.setData({
        _isReadyConfirm: false,
      })
    },
    getValues(value, defaultKey) {
      const {
        options,
        _options,
        _isLinkage,
      } = this.data;
      let values = [];
      const currentOpitons = _isLinkage ? _options : options;
      const currentkey = defaultKey === 'key' ? 'key' : 'value';
      try {
        currentOpitons.forEach((v, i) => {
          values[i] = !!Array.prototype.toString.call(value) ? v[value[i]][currentkey] : v[0][currentkey];
        })
      } catch (error) {}
      return values;
    },
    _handleChange(e) {
      const value = e.detail.value;
      this.setData({
        value,
        _isReadyConfirm: true,
      });
      this.formatOptions();
      // this.triggerEvent('onChange',{
      //   value: this.getValues(value),
      // },{})
    },
    formatOptions() {
      const {
        options,
        value,
        _isLinkage,
      } = this.data;
      if (!_isLinkage) return false;
      const _options = [];
      let prev;
      options.forEach((v, i) => {
        if (i === 0) {
          return _options.push(v);
        } else {
          prev = _options[i - 1][value[i - 1] || 0] || _options[i - 1][0];
        }
        _options.push(options[i].filter(iv => prev.value === iv.parent));
      });
      this.setData({
        _options,
      });
    },
  },
  ready: function () {
    const {
      options,
      defaultValue,
      showValue,
      placeholder,
    } = this.data;
    this.setData({
      value: defaultValue,
      _isLinkage: !!(
        options[1] &&
        options[1][0] &&
        options[1][0].hasOwnProperty('parent')
      ),
    });
    this._ArrayKeysToArrayObject();
    this.formatOptions();
    this.setData({
      _currentText: !!Array.prototype.toString.call(defaultValue) ? this.getValues(defaultValue,showValue ? 'value' : 'key').join(' ', '') : placeholder,
    });
  },
});