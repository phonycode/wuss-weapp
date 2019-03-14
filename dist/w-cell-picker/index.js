import WussComponent from '../common/extends/baseComponent';
import field from '../common/behavior/field';

WussComponent({
  relations: {
    '../w-form/index': {
      type: 'ancestor',
    },
    '../w-validate/index': {
      type: 'ancestor',
    },
  },
  behaviors: [field],
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
   * @param {boolean} isDatePicker 类型切换为日期选择器
   */
  properties: {
    options: {
      type: Array,
      value: [],
      observer(__val) {
        /**
         * 这里_initPicker是为了解决官方组件picker-view在第一次初始化后 改变值无法检测高度问题
         * 只能使用非惰性让他在渲染一次以重置picker-view-column下view的高度。
         */
        const {
          options,
          defaultValue,
          isDatePicker,
          _datePickerOptionsInit,
        } = this.data;
        if (!Array.isArray(options) || !Array.prototype.toString.call(options)) {
          // console.warn('cell-picker Warning: Missing required parameters: options');
        };
        if(isDatePicker) {
          if (!_datePickerOptionsInit && options.length > 0) {
            const _currentValue = _currentValue && Array.isArray(defaultValue) ? defaultValue.filter(_ => _ !== undefined) || options.map(_ => 0) : null;
            this.setData(Object.assign({
              _datePickerOptionsInit: true,
            }, _currentValue ? { _currentValue } : {}));
          }
          return this._ArrayKeysToArrayObject();
        };
        this.setData({
          _isLinkage: !!(
            options[1] &&
            options[1][0] &&
            options[1][0].hasOwnProperty('parent')
          ),
          _isRadio: !!(options[0] && !Array.isArray(options[0])),
        }, () => this.initPicker());
        this.setData({
          _initPicker: false,
        }, () => setTimeout(() => {
          this.setData({
            _initPicker: true,
          })
        }, 20));
      },
    },
    defaultValue: {
      type: null,
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
    isDatePicker: {
      type: Boolean,
    }
  },
  data: {
    _visible: false,
    _initPicker: true,
    _currentText: '',
    _options: [],
    value: null,
    _isLinkage: false,
    _currentValue: [],
    _isRadio: false,
    _datePickerOptionsInit: false,
    _isReadyConfirm: true,
  },
  methods: {
    _handleClick() {
      this.setData({
        _visible: true,
      }, () => this.triggerEvent('onOpen'));
    },
    _handleCancel() {
      const {
        _currentValue,
        value,
        defaultKey,
        _isLinkage
      } = this.data;
      const currentValues = this.getValues(_currentValue, defaultKey);
      if ((typeof value === 'string' ? value : JSON.stringify(value)) === (typeof currentValues === 'string' ? currentValues : JSON.stringify(currentValues))) {
        // console.log('两个值相等，不重置当前值');
      } else {
        if(_isLinkage) {
          this.setData({
            _currentValue: value,
          }, () => {
            this.formatOptions();
            this.setData({
              _currentValue: this.getValues(value, defaultKey, true),
            })
          })
        } else {
          this.setData({
            _currentValue: this.getValues(value, defaultKey, true),
          })
        }
      }
      this.setData({
        _visible: false,
        _isReadyConfirm: true,
      }, () => this.triggerEvent('onCancel'));
    },
    _handleConfirm() {
      const {
        _isReadyConfirm,
        showValue,
        value,
        _isRadio,
        defaultKey,
        _isLinkage,
        _options,
        options,
      } = this.data;
      const currentOpitons = _isLinkage ? _options : options;
      let _currentValue = this.data._currentValue;
      if (_currentValue.length < currentOpitons.length) { // picker 长度校验
        for (let i = 0; i < (currentOpitons.length - _currentValue.length); i++) {
          _currentValue.push(0);
        };
      };
      if (!_isReadyConfirm) return false;
      let currentValues = this.getValues(_currentValue, defaultKey);
      if ((typeof currentValues === 'string' ? currentValues : JSON.stringify(currentValues)) !== (typeof value === 'string' ? value : JSON.stringify(value))) {
        this.setData({
          value: currentValues,
        });
      };
      this.setData({
        _currentText: !_isRadio ? this.getValues(_currentValue, showValue ? 'value' : 'key').join(' ', '') : this.getValues(_currentValue, showValue ? 'value' : 'key'),
      }, () => {
        this.triggerEvent('onSelect', {
          value: currentValues,
        }, {});
        this.validate(this.data.value);
        this.setData({
          _visible: false,
        });
      });
    },
    _ArrayKeysToArrayObject() {
      const {
        options
      } = this.data;
      if (options.length <= 0) return false;
      const {
        0: items
      } = options;
      if (Array.isArray(items)) { // [ [], [], [] ] ,  [ a,b,c,d,e,f,g ]
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
      } else if (Object.prototype.toString.call(items) !== '[object Object]') {
        this.setData({
          options: options.map(_v => ({
            key: _v,
            value: _v,
          })),
        });
      }
    },
    _handleTouchStart() {
      this.setData({
        _isReadyConfirm: false,
      })
    },
    _handleTouchEnd() {
      this.setData({
        _isReadyConfirm: true,
      });
    },
    getValues(value, defaultKey, decode = false) { // value: [2], defaultKey: 'value'
      const {
        options,
        _options,
        _isLinkage,
        _isRadio,
      } = this.data;
      let values = [];
      const currentOpitons = _isLinkage ? _options : options;
      const currentkey = defaultKey === 'key' ? 'key' : 'value';
      try {
        currentOpitons.forEach((v, i) => {
          if (!_isRadio) {
            if (!!Array.prototype.toString.call(value)) {
              if (!decode) {
                values[i] = typeof value[i] === 'string' ? v.filter(__v => (__v[currentkey] === value[i]))[0][currentkey] : v[value[i]][currentkey];
              } else {
                v.forEach((__f, __i) => {
                  if ((typeof __f[currentkey] === 'string' ? __f[currentkey] : JSON.stringify(__f[currentkey])) === (typeof value[i] === 'string' ? value[i] : JSON.stringify(value[i]))) {
                    values[i] = __i;
                  }
                });
              }
            } else {
              values[i] = v[0][currentkey];
            }
          } else {
            if (!decode) {
              if (Array.isArray(value) && value[0]) {
                if (value[0] === i) {
                  values = v[currentkey];
                }
              } else {
                return values = currentOpitons[0][currentkey];
              }
            } else {
              if ((typeof v[currentkey] === 'string' ? v[currentkey] : JSON.stringify(v[currentkey])) === (typeof value === 'string' ? value : JSON.stringify(value))) {
                values = [i];
              }
            }
          }
        });
      } catch (error) {}
      return values;
    },
    _handleChange(e) {
      const value = e.detail.value;
      this.setData({
        _currentValue: value,
      });
      this.formatOptions();
      this.triggerEvent('onChange',{value},{});
    },
    formatOptions() {
      const {
        options,
        _currentValue,
        _isLinkage,
      } = this.data;
      if (!_isLinkage) return false;
      const _options = [];
      let prev;
      options.forEach((v, i) => {
        if (i === 0) {
          return _options.push(v);
        } else {
          prev = _options[i - 1][_currentValue[i - 1] || 0] || _options[i - 1][0];
        }
        _options.push(options[i].filter(iv => prev.value === iv.parent));
      });
      this.setData({
        _options,
      });
    },
    initPicker() {
      const {
        showValue,
        placeholder,
        defaultKey,
        _isLinkage,
      } = this.data;
      let { defaultValue } = this.data;
      this._ArrayKeysToArrayObject();
      this.formatOptions();
      let defaultText = placeholder || '';
      if (defaultValue && Array.isArray(defaultValue)) {
        defaultValue = defaultValue.filter(_ => _ !== undefined) || defaultValue.map(_ => 0);
      };
      if (defaultValue) {
        if (!this.data._isRadio) {
          if (Array.isArray(defaultValue) && !!Array.prototype.toString.call(defaultValue)) {
            defaultText = this.getValues(defaultValue, showValue ? 'value' : 'key').join(' ', '');
          }
        } else {
          this.data.options.forEach((__v, _i) => {
            if ((typeof __v['value'] === 'string' ? __v['value'] : JSON.stringify(__v['value'])) === (typeof defaultValue === 'string' ? defaultValue : JSON.stringify(defaultValue))) {
              defaultText = __v[showValue ? 'value' : 'key'];
            }
          });
        }
        if(_isLinkage) {
          this.setData({
            _currentValue: defaultValue,
          }, () => {
            this.formatOptions();
            this.setData({
              _currentValue: this.getValues(defaultValue, defaultKey, true),
            })
          })
        } else {
          this.setData({
            _currentValue: this.getValues(defaultValue, defaultKey, true),
          })
        }
      };
      this.validate(defaultValue);
      this.setData({
        value: this.getValues(this.data._currentValue, defaultKey),
        _currentText: defaultText,
      });
    },
    //调用验证
    validate(newValue) {
      const validate = this.getRelationNodes('../w-validate/index')[0];
      if (!validate) return false;
      validate.isValidate(newValue || '');
    },
  },
  ready: function () {
    const { options, defaultValue, isDatePicker } = this.data;
    if(isDatePicker) {
      this.setData({
        value: defaultValue || [],
        _isLinkage: !!(
          options[1] &&
          options[1][0] &&
          options[1][0].hasOwnProperty('parent')
        ),
        _isRadio: !!(options[0] && !Array.isArray(options[0])),
        _currentValue: defaultValue || options.map(_ => 0),
      }, () => this.initPicker());
      this.setData({
        _initPicker: false,
      }, () => setTimeout(() => {
        this.setData({
          _initPicker: true,
        })
      }, 20));
    }
  },
});