/**
 * @emits {Function} selected 当前下拉列表选中的options向父组件发出的回调方法
 * @emits {Function} sortChange 当前sort排序改变时向父组件发出的回调方法
 */
Component({
  externalClasses: ['wuss-class'],
  properties: {
    /**
     * @param {array} options 父组件传递过来的菜单数组对象, 参数有: text,show,highlight,options
     */
    options: {
      type: Array,
      value: [],
    },
  },
  options: {
    multipleSlots: true,
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
        options,
      } = this.data;
      const current = options[itemkey];
      switch (String(current.type)) {
        case 'radio': // 当前筛选条件为radio时
          this._handleSelected(e);
          break;
        case 'checkbox': // 当前筛选条件为checkbox时
          this._handleSelected(e);
          break;
        case 'filter': // 当前筛选条件为filter时
          this._handleFilter(e);
          break;
        case 'sort': // 当前筛选条件为sort时
          this._handleSort(e);
          break;
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
        options,
      } = this.data;
      if(options[itemkey].show) {
        return this.handleClose();
      }
      options.map(i => {
        i.show = false;
        return i;
      })
      this.setData({
        options,
      },() => this.setData({
        [`options[${itemkey}].show`]: true,
        [`options[${itemkey}].highlight`]: true,
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
        options
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
        [`options[${itemkey}]`]: {
          ...options[itemkey],
          sortBy: options[itemkey].sortBy,
          highlight: true,
        },
      });
      this.triggerEvent(
        'onChange', {
          sort: options[itemkey].sortBy,
          parent: options[itemkey],
          type: 'sort'
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
        options
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
          options,
        },() => {
          options[itemkey].show = true;
          this.setData({
            options,
          })
        });
      }
    },
    /**
     * 重置当前options的选中项
     */
    _handleSelectedReset() {
      let { options,_defaultOptions } = this.data;
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
      const { options } = this.data;
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
        options,
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
        options,
      } = this.data;
      const eventDetail = {
        parent: options[parentkey],
        parentkey,
        optkey,
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
        [`options[${parentkey}]`]: Object.assign({}, items, {
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
        options
      } = this.data;
      switch (String(options[parentkey].type)) {
        case 'radio':
          this._setRadioOptions(e)
          break;
        case 'checkbox':
          this._setCheckboxOptions(e)
          break;
        case 'filter':
          this._setFilterOptions(e)
          break;
        case 'sort':
          this._setSortOptions(e)
          break;
        default:
          break;
      }
    },
    /**
     * 点击遮罩层关闭事件
     */
    handleClose() {
      let {
        options
      } = this.data;
      options = options.map(i => {
        if (i.show) {
          i.show = false;
        }
        if(i.type === 'filter' && i.highlight) {
          i.highlight = false;
        }
        return i;
      });
      this.setData({
        options,
      });
    },
  },

  ready: function () {
    let {
      options,
    } = this.data;
    this.setData({
      _defaultOptions: options,
      systemInfo: wx.getSystemInfoSync(),
    })
    options = options.map(i => {
      let items = Object.assign({}, i, {
        highlight: i.highlight || false,
        type: i.type || 'radio',
        options: i.options || [],
      });
      switch (String(items.type)) {
        case 'radio':
          items.show = items.show || false;
          break;
        case 'checkbox':
          items.show = items.show || false;
          break;
        case 'sort':
          items.sortBy = items.sortBy || 'default';
          break;
        default:
          break;
      }
      return items;
    });
    this.setData({
      options,
    });
  },
});