import WussComponent from '../common/extends/baseComponent';

/**
 * @emits {Function} selected 当前下拉列表选中的options向父组件发出的回调方法
 * @emits {Function} sortChange 当前sort排序改变时向父组件发出的回调方法
 */
WussComponent({
  externalClasses: ['wuss-class-content','wuss-class-item','wuss-class-item-text'],
  properties: {
    /**
     * @param {array} options 父组件传递过来的菜单数组对象, 参数有: text,show,highlight,options
     * @param {string} defaultColor 默认颜色
     * @param {string} activeColor 激活颜色
     * @param {string | number} height bar的高度
     * @param {boolean} border 显示底部线条
     * @param {string} popupStyles 弹出层的样式
     */
    options: {
      type: Array,
      observer: 'updateCheckValue',
    },
    activeColor: {
      type: String,
      value: '#ff8800',
    },
    defaultColor: {
      type: String,
      value: '#999999',
    },
    height: { 
      type: String,
      value: '88rpx',
    },
    border: {
      type: Boolean,
      value: true,
    },
    popupStyles: {
      type: String,
    },
  },
  options: {
    multipleSlots: true,
  },
  data: {
    _options: [],
    isFirstUpdated: true, // 是否是第一次更新数据
  },
  methods: {
    /**
     * 下拉菜单被点击时的事件
     * @param {Object} e clcikEvent传递过来的对象
     */
    handleMenuClick(e) {
      const {
        itemkey
      } = e.currentTarget.dataset;
      const {
        _options: options,
      } = this.data;
      const current = options[itemkey];
      switch (String(current.type)) {
        case 'radio': // 当前筛选条件为radio时
          return this._handleSelected(e);
        case 'checkbox': // 当前筛选条件为checkbox时
          return this._handleSelected(e);
        case 'filter': // 当前筛选条件为filter时
          return this._handleFilter(e);
        case 'sort': // 当前筛选条件为sort时
          return this._handleSort(e);
        case 'custom': // 当前筛选条件为custom时
          return this._handleCustomClick(e);
        default:
          break;
      }
    },
    /**
     * 关闭popup-filter
     */
    _handleCloseFilter() {
      this.setData({
        _filterVisible: false,
      })
    },
    /**
     * 处理type为filter时的点击事件
     * @param {object} e  event
     */
    _handleFilter(e) {
      const {
        itemkey
      } = e.currentTarget.dataset;
      let {
        _options: options,
      } = this.data;
      if(options[itemkey].show) {
        return this.handleClose();
      }
      options.map(i => {
        i.show = false;
        return i;
      })
      this.setData({
        _options: options,
      },() => this.setData({
        [`_options[${itemkey}].show`]: true,
        [`_options[${itemkey}].highlight`]: true,
      }))
    },
    /**
     * 处理type为sort时的点击事件
     * @param {object} e event
     */
    _handleSort(e) {
      const {
        itemkey
      } = e.currentTarget.dataset;
      let {
        _options: options
      } = this.data;
      switch (options[itemkey].sortBy) {
        case 'desc': // 降序
          options[itemkey].sortBy = 'asc';
          break;
        case 'asc': // 升序
          options[itemkey].sortBy = 'desc';
          break;
        default:
          // 默认 default
          options[itemkey].sortBy = 'asc';
          break;
      }
      this.setData({
        [`_options[${itemkey}]`]: {
          ...options[itemkey],
          sortBy: options[itemkey].sortBy,
          highlight: true,
        },
      });
      this.triggerEvent(
        'onChange', {
          ...options[itemkey],
          type: 'sort'
        }, {}
      );
    },
    /**
     * 自定义点击
     * @param {*} e 
     */
    _handleCustomClick(e) {
      const {
        itemkey
      } = e.currentTarget.dataset;
      let {
        _options: options
      } = this.data;
      this.triggerEvent(
        'onChange', {
          ...options[itemkey],
          type: 'custom'
        }, {}
      );
    },
    /**
     * 处理type为radio和checkbox时的点击事件
     * @param {object} e event
     */
    _handleSelected(e) {
      const {
        itemkey
      } = e.currentTarget.dataset;
      let {
        _options: options
      } = this.data;
      let current = options[itemkey];
      /**
       * 如果子节点列表为空时，直接返回对应事件
       */
      if (
        !current.options ||
        current.options.length <= 0
      ) {
        this.setData({
          [`options[${itemkey}].highlight`]: true,
        });
        return this.triggerEvent(
          'onChange', {
            ...current,
            type: current.type === 'radio' ? 'radio' : current.type === 'checkbox' ? 'checkbox' : 'radio',
          }, {}
        );
      }
      // 如果当前下拉列表已展开，则收起当前下拉列表
      if (current.show) {
        // current.show = false;
        return this.handleClose();
      } else {
        options = options.map(i => {
          if (i.show) {
            i.show = false;
          }
          return i;
        });
        this.setData({
          _options: options,
        },() => {
          options[itemkey].show = true;
          this.setData({
            _options: options,
          })
        });
      }
    },
    /**
     * 重置当前options的选中项
     */
    _handleSelectedReset() {
      let { _options: options, _defaultOptions } = this.data;
      let currentOptions = options.filter(i => (i.show === true))[0] || [];
      if(String(currentOptions.type) === 'checkbox') {
        options.map((i,idx) => {
          if(i.show === true) {
            i.options.map(i => {
              i.checked = false;
              i.highlight = false;
              return i;
            })
            this.setData({
              [`options[${idx}].options`]: i.options,
              [`options[${idx}].text`]: _defaultOptions[idx].text,
              [`options[${idx}].highlight`]: false,
            })
            return this._handleConfirmSelected(false);
          }
        })
      } else if(String(currentOptions.type) === 'filter') {

      }
    },
    /**
     * 获取当前options的全部选中项
     */
    _handleConfirmSelected(close = true) {
      const { _options: options } = this.data;
      let currentOptions = '';
      let currentIndex = '';
      options.map((i,idx) => {
        if(i.show === true) {
          currentOptions = i;
          currentIndex = idx;
        }
        return i;
      })
      if(String(currentOptions.type) === 'checkbox') {
        let resultText = '';
        const result = currentOptions.options.filter(i => (i.checked === true)).map(i => {
          resultText += i.text;
          return i;
        });
        if(resultText) {
          this.setData({
            [`options[${currentIndex}].text`]: resultText,
          })
        }
        this.triggerEvent(
          'onChange', {
            ...options[currentIndex],
            checked: result,
            type: 'checkbox',
          }, {}
        );
      } else if(String(currentOptions.type) === 'filter') {
        this.triggerEvent(
          'onChange', {
            type: 'filter',
          }, {}
        );
      }
      close ? this.handleClose() : '';
    },
    /**
     * 设置当前type为checkbox的点击选中项的值
     * @param {object} e event
     */
    _setCheckboxOptions(e) {
      const {
        optkey,
        parentkey
      } = e.currentTarget.dataset;
      let {
        _options: options,
        _defaultOptions,
      } = this.data;
      let items = options[parentkey];
      /**
       * 当_当前点击的item是选中状态时
       */
      if (items.options[optkey].checked) {
        items.options[optkey].checked = false;
        items.highlight = false;
        items.text = _defaultOptions[parentkey].text;
        // return this.handleClose();
      } else {
        items.options[optkey].checked = true;
        // this.handleClose();
      }
      this.setData({
        [`options[${parentkey}]`]: Object.assign({}, items, {
          highlight: true,
        }),
      });
    },
    /**
     * 设置当前type为filter的点击选中项的值
     * @param {object} e event
     */
    _setFilterOptions(e) {

    },
    /**
     * 设置当前type为sort的点击选中项的值
     * @param {object} e event
     */
    _setSortOptions(e) {

    },
    /**
     * 设置当前type为radio的点击选中项的值
     * @param {object} e event
     */
    _setRadioOptions(e) {
      const {
        optkey,
        parentkey
      } = e.currentTarget.dataset;
      let {
        _options: options,
      } = this.data;
      const eventDetail = {
        ...options[parentkey],
        key: optkey,
        item: options[parentkey] && options[parentkey].options && options[parentkey].options[optkey] ? options[parentkey].options[optkey] : {},
      };
      let items = options[parentkey];

      /**
       * 当_当前点击的item是选中状态时
       */
      if (items.options[optkey].checked) {
        return this.handleClose();
      } else {
        items.options = items.options.map(i => {
          if (i.checked) {
            i.checked = false;
          }
          return i;
        });
        items.options[optkey].checked = true;
        this.handleClose();
      }
      this.setData({
        [`_options[${parentkey}]`]: Object.assign({}, items, {
          text: items.options[optkey].text,
          highlight: true,
          show: false,
        }),
      });
      this.triggerEvent(
        'onChange', {
          ...eventDetail,
          type: 'radio',
        }, {}
      );
    },
    /**
     * 下拉列表Options被点击时的回调
     * @param {Object} e clcikEvent传递过来的对象
     */
    handleOptionsClick(e) {
      const {
        parentkey
      } = e.currentTarget.dataset;
      const {
        _options
      } = this.data;
      switch (String(_options[parentkey].type)) {
        case 'radio':
          return this._setRadioOptions(e)
        case 'checkbox':
          return this._setCheckboxOptions(e)
        case 'filter':
          return this._setFilterOptions(e)
        case 'sort':
          return this._setSortOptions(e)
        default:
          break;
      }
    },
    /**
     * 点击遮罩层关闭事件
     */
    handleClose() {
      let {
        _options
      } = this.data;
      _options = _options.map(i => {
        if (i.show) {
          i.show = false;
        }
        if(i.type === 'filter' && i.highlight) {
          i.highlight = false;
        }
        return i;
      });
      this.setData({
        _options,
      });
    },
    /**
     * 更新当前的下拉选中项
     */
    updateCheckValue() {
      const { options, isFirstUpdated, _defaultOptions } = this.data;
      const _options = options.map((__v,index) => {
        let items = Object.assign({}, __v, {
          highlight: __v.highlight || false,
          type: __v.type,
          options: __v.options || [],
          show: __v.show || false,
        }, __v.type === 'sort' ? {
          sortBy: __v.sortBy || 'default',
        }: {});
        switch (items.type) {
          case 'radio':
          const current = items.options.findIndex(i => (i.checked === true));
          return Object.assign({
            ...items,
            highlight: current > -1 && !isFirstUpdated,
          },current > -1 ? {
            text: items.options[current].text,
          } : {});
          case 'checkbox':
          const hasChecked = items.options.findIndex(i => (i.checked === true)) > -1;
          return  Object.assign({
            ...items,
            highlight: hasChecked,
          }, !hasChecked && !isFirstUpdated && _defaultOptions ? {
            text: _defaultOptions[index].text,
          } : {});
          case 'filter':
          return {
            ...items,
          };
          case 'slot':
          return {
            ...items,
          };
          case 'custom':
          return {
            ...items,
          };
          default:
          return {
            ...items,
          };
        }
      });
      this.setData(Object.assign({
        _options,
      }, isFirstUpdated ? {
        isFirstUpdated: false,
      } : {}))
    },
  },

  ready: function () {
    const {
      options,
    } = this.data;
    this.setData({
      _defaultOptions: [].concat(options),
      systemInfo: wx.getSystemInfoSync(),
    });
  },
});