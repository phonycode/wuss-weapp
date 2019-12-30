import WussComponent from '../common/extends/baseComponent';
import field from '../common/behavior/field';

WussComponent({
  relations: {
    '../w-form/index': {
      type: 'ancestor'
    },
    '../w-validate/index': {
      type: 'ancestor'
    }
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
   * @param {string} indicatorStyle 设置选择器中间选中框的样式
   * @param {boolean} maskClosable 点击蒙层是否允许关闭
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
          _datePickerOptionsInit
        } = this.data;
        if (
          !Array.isArray(options) ||
          !Array.prototype.toString.call(options)
        ) {
          // console.warn('warning:(wuss-weapp) cell-picker Warning: Missing required parameters: options');
        }
        
        if (isDatePicker) {
          if (!_datePickerOptionsInit && options.length > 0) {
            const _currentValue =
              _currentValue && Array.isArray(defaultValue)
                ? defaultValue.filter(_ => _ !== undefined) ||
                  options.map(_ => 0)
                : null;
            this.syncSetData(
              Object.assign(
                {
                  _datePickerOptionsInit: true
                },
                _currentValue ? { _currentValue } : {}
              )
            );
          }
          return this._ArrayKeysToArrayObject();
        }
        this.syncSetData({
          _isLinkage: !!(
            options[1] &&
            options[1][0] &&
            options[1][0].hasOwnProperty('parent')
          ),
          _isRadio: !!(options[0] && !Array.isArray(options[0]))
        });
        this.initPicker()
        this.syncSetData({ _initPicker: false });
        this.sleep(200);
        this.syncSetData({ _initPicker: true });
      }
    },
    defaultValue: {
      type: null
    },
    currentValue: {
      type: null,
      observer(currentValue) {
        const dataType = Object.prototype.toString.call(currentValue);
        if (dataType === '[object Null]' || dataType === '[object Undefined]') {
          return console.warn('wuss-weapp: Picker currentValue expect to accept an array or string or number but accept an invalid value.')
        };
        const { showValue, placeholder, defaultKey, _isLinkage } = this.data;
        this._ArrayKeysToArrayObject();
        this.formatOptions();
        let defaultText = placeholder || '';
        if (currentValue && Array.isArray(currentValue)) {
          currentValue =
            currentValue.filter(_ => _ !== undefined) || currentValue.map(_ => 0);
        }
        if (currentValue) {
          if (_isLinkage) {
            if (Array.isArray(currentValue) && !!currentValue.length && typeof currentValue[0] === 'number') {
                this.formatOptions(currentValue);
                this.syncSetData({ _currentValue: currentValue });
            } else {
              const formatValue = this.getValues(currentValue, defaultKey, true);
              this.formatOptions(formatValue);
              this.syncSetData({ _currentValue: formatValue });
            }
          } else {
            const formatValue = this.getValues(currentValue, defaultKey, true);
            this.syncSetData({ _currentValue: formatValue });
          }
          if (!this.data._isRadio) {
            if (
              Array.isArray(currentValue) &&
              !!Array.prototype.toString.call(currentValue)
            ) {
              defaultText = this.getValues(
                currentValue,
                showValue ? 'value' : 'key'
              ).join(' ');
            }
          } else {
            this.data.options.forEach((__v, _i) => {
              if (this.dataToString(__v['value']) === this.dataToString(currentValue)) {
                defaultText = __v[showValue ? 'value' : 'key'];
              }
            });
          }
        }
        this.syncSetData({
          value: this.getValues(this.data._currentValue, defaultKey),
          _currentText: defaultText
        });
        this.validate(this.data.value);
      }
    },
    cancelTextColor: String,
    cancelText: {
      type: String,
      value: '取消'
    },
    label: String,
    title: String,
    confirmTextColor: String,
    confirmText: {
      type: String,
      value: '确认'
    },
    showValue: {
      type: Boolean,
      value: false
    },
    defaultKey: {
      type: String,
      value: 'value'
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    placeholder: String,
    isDatePicker: Boolean,
    indicatorStyle: String,
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
    _isReadyConfirm: true
  },
  methods: {
    _handleClick() {
      this.setData(
        {
          _visible: true
        },
        () => this.triggerEvent('onOpen')
      );
    },
    _handleCancel() {
      const { _currentValue, value, defaultKey, _isLinkage } = this.data;
      const currentValues = this.getValues(_currentValue, defaultKey);
      if (
        (typeof value === 'string' ? value : JSON.stringify(value)) ===
        (typeof currentValues === 'string'
          ? currentValues
          : JSON.stringify(currentValues))
      ) {
        // console.log('两个值相等，不重置当前值');
      } else {
        if (_isLinkage) {
          this.setData(
            {
              _currentValue: value
            },
            () => {
              this.formatOptions();
              this.setData({
                _currentValue: this.getValues(value, defaultKey, true)
              });
            }
          );
        } else {
          this.setData({
            _currentValue: this.getValues(value, defaultKey, true)
          });
        }
      }
      this.setData(
        {
          _visible: false,
          _isReadyConfirm: true
        },
        () => this.triggerEvent('onCancel')
      );
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
        options
      } = this.data;
      const currentOpitons = _isLinkage ? _options : options;
      let _currentValue = this.data._currentValue;
      if (_currentValue.length < currentOpitons.length) {
        // picker 长度校验
        let _diffLen = currentOpitons.length - _currentValue.length;
        for (let i = 0; i < _diffLen; i++) {
          _currentValue.push(0);
        }
      }
      if (!_isReadyConfirm) return false;
      let currentValues = this.getValues(_currentValue, defaultKey);
      if (
        (typeof currentValues === 'string'
          ? currentValues
          : JSON.stringify(currentValues)) !==
        (typeof value === 'string' ? value : JSON.stringify(value))
      ) {
        this.setData({
          value: currentValues
        });
      }
      this.setData(
        {
          _currentText: !_isRadio
            ? this.getValues(_currentValue, showValue ? 'value' : 'key').join(' ')
            : this.getValues(_currentValue, showValue ? 'value' : 'key')
        },
        () => {
          this.triggerEvent(
            'onSelect',
            {
              value: currentValues
            },
            {}
          );
          this.validate(this.data.value);
          this.setData({
            _visible: false
          });
        }
      );
    },
    _ArrayKeysToArrayObject() {
      const { options } = this.data;
      if (options.length <= 0) return false;
      const { 0: items } = options;
      if (Array.isArray(items)) {
        // [ [], [], [] ] ,  [ a,b,c,d,e,f,g ]
        const _isArrayObject = this.isArrayObject(items);
        !_isArrayObject &&
          this.setData({
            options: options.map(i =>
              i.map(j => ({
                key: j,
                value: j
              }))
            )
          });
      } else if (Object.prototype.toString.call(items) !== '[object Object]') {
        this.setData({
          options: options.map(_v => ({
            key: _v,
            value: _v
          }))
        });
      }
    },
    _handleTouchStart() {
      this.setData({
        _isReadyConfirm: false
      });
    },
    _handleTouchEnd() {
      this.setData({
        _isReadyConfirm: true
      });
    },
    dataToString(data) {
      return typeof data === 'string' ? data : JSON.stringify(data);
    },
    getValues(value, defaultKey, decode = false) {
      const { options, _options, _isLinkage, _isRadio, isDatePicker } = this.data;
      let values = [];
      const currentOpitons = _isLinkage && value.length && typeof value[0] === 'number' ? _options : options;
      const currentkey = defaultKey === 'key' ? 'key' : 'value';
      // if (!(!!value)) return false;
      try {
        currentOpitons.forEach((v, i) => {
          if (!_isRadio) {
            if (!!Array.prototype.toString.call(value || [])) {
              if (!decode) {
                if (typeof value[i] === 'string') {
                  if (!isDatePicker) {
                    const filterOptions = values.length > 0 ? v.filter(item => (this.dataToString(item.parent) === this.dataToString(value[i - 1]))) : v;
                    const _cur = filterOptions.find(__v => __v['value'] === value[i]);
                    values[i] = _cur && this.dataToString(_cur['parent']) === this.dataToString(value[i - 1]) ? _cur[currentkey] : filterOptions[0][currentkey];
                  } else {
                    const _cur = v.find(__v => this.dataToString(__v['value']) === this.dataToString(value[i]));
                    values[i] = _cur ? _cur[currentkey] : v[0][currentkey];
                  }
                } else {
                  values[i] = v[value[i]][currentkey];
                }
              } else {
                if (!isDatePicker) {
                  const filterOptions = values.length > 0 ? v.filter(item => (this.dataToString(item.parent) === this.dataToString(value[i - 1]))) : v;
                  const _findIndex = filterOptions.findIndex((__f, __i) => this.dataToString(__f[currentkey]) === this.dataToString(value[i]));
                  if (_findIndex !== -1) { // 目标节点不存在 则默认选中第一个选项
                    values[i] = _findIndex;
                  } else {
                    values[i] = 0;
                  }
                } else {
                  const _datePickerFindIndex = v.findIndex((__f, __i) => this.dataToString(__f[currentkey]) === this.dataToString(value[i]));
                  if (_datePickerFindIndex !== -1) { // 目标节点不存在 则默认选中第一个选项
                    values[i] = _datePickerFindIndex;
                  } else {
                    values[i] = 0;
                  }
                }
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
                return (values = currentOpitons[0][currentkey]);
              }
            } else {
              if (
                (typeof v[currentkey] === 'string'
                  ? v[currentkey]
                  : JSON.stringify(v[currentkey])) ===
                (typeof value === 'string' ? value : JSON.stringify(value))
              ) {
                values = [i];
              }
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
      return values;
    },
    _handleChange(e) {
      const value = e.detail.value;
      this.setData({
        _currentValue: value
      });
      this.formatOptions();
      this.triggerEvent('onChange', { value }, {});
    },
    sleep(timeout) {
      return new Promise(resolve => setTimeout(() => resolve(), timeout))
    },
    formatOptions(cur) {
      let { options, _currentValue = [], _isLinkage } = this.data;
      if (Array.isArray(cur) && !!cur.length && typeof cur[0] === 'number') {
        _currentValue = cur;
      }
      if (!_isLinkage) return false;
      // if(!_currentValue || !_currentValue.length || typeof _currentValue[0] === 'string') return false;
      const _options = [];
      let prev;
      options.forEach((v, i) => {
        if (i === 0) {
          return _options.push(v);
        } else {
          prev =
            _options[i - 1][_currentValue[i - 1] || 0] || _options[i - 1][0];
        }
        _options.push(options[i].filter(iv => prev.value === iv.parent));
      });
      this.setData({ _options });
    },

    isValidValue(value) {
      return typeof value !== 'undefined' || Object.prototype.toString.call(value) !== '[object Null]' || !isNaN(value);
    },
    /**
     * 同步设置DATA
     */
    syncSetData(data) {
      return new Promise(resolve => this.setData(data, () => resolve(this.data)))
    },
    initPicker() {
      const { showValue, placeholder, defaultKey, _isLinkage } = this.data;
      let { defaultValue } = this.data;
      this._ArrayKeysToArrayObject();
      this.formatOptions();
      let defaultText = placeholder || '';
      if (this.isValidValue(defaultValue) && Array.isArray(defaultValue)) {
        defaultValue =
          defaultValue.filter(_ => _ !== undefined) || defaultValue.map(_ => 0);
      }
      if (this.isValidValue(defaultValue)) {
        if (_isLinkage) {
          if (Array.isArray(defaultValue) && !!defaultValue.length && typeof defaultValue[0] === 'number') {
              this.formatOptions(defaultValue);
              this.syncSetData({ _currentValue: defaultValue });
          } else {
            const formatValue = this.getValues(defaultValue, defaultKey, true);
            this.formatOptions(formatValue);
            this.syncSetData({ _currentValue: formatValue });
          }
        } else {
          const formatValue = this.getValues(defaultValue, defaultKey, true);
          this.syncSetData({ _currentValue: formatValue });
        }
        if (!this.data._isRadio) {
          if (
            Array.isArray(defaultValue) &&
            !!Array.prototype.toString.call(defaultValue)
          ) {
            defaultText = this.getValues(
              defaultValue,
              showValue ? 'value' : 'key'
            ).join(' ');
          }
        } else {
          this.data.options.forEach((__v, _i) => {
            if (this.dataToString(__v['value']) === this.dataToString(defaultValue)) {
              defaultText = __v[showValue ? 'value' : 'key'];
            }
          });
        }
      }
      this.syncSetData({
        value: this.getValues(this.data._currentValue, defaultKey),
        _currentText: defaultText
      });
    }
  },
  ready: function() {
    const { options, defaultValue, isDatePicker } = this.data;
    this.validate(defaultValue);
    if (isDatePicker) {
      this.setData(
        {
          value: defaultValue || [],
          _isLinkage: !!(
            options[1] &&
            options[1][0] &&
            options[1][0].hasOwnProperty('parent')
          ),
          _isRadio: !!(options[0] && !Array.isArray(options[0])),
          _currentValue: defaultValue || options.map(_ => 0)
        },
        () => this.initPicker()
      );
      this.setData(
        {
          _initPicker: false
        },
        () =>
          setTimeout(() => {
            this.setData({
              _initPicker: true
            });
          }, 20)
      );
    }
  }
});
