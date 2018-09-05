/**
 * @emits {Function} selected 当前下拉列表选中的options向父组件发出的回调方法
 * @emits {Function} sortChange 当前sort排序改变时向父组件发出的回调方法
 */

Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'],

  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * @param {array} dataItems 父组件传递过来的菜单数组对象, 参数有: text,show,highlight,options
     */
    dataItems: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 下拉菜单被点击时的事件
     * @param {Object} e clcikEvent传递过来的对象
     */
    handleMenuClick(e) {
      const {
        itemkey
      } = e.currentTarget.dataset;
      let {
        dataItems
      } = this.data;
      if (dataItems[itemkey].type === 'selected') {
        // 如果子节点列表为空时，直接返回对应事件
        if (!dataItems[itemkey].options || dataItems[itemkey].options.length <= 0) {
          this.setData({
            [`dataItems[${itemkey}].highlight`]: true,
          })
          return this.triggerEvent('selected', {
            ...dataItems[itemkey],
            type: 'function',
          }, {})
        }

        // 如果当前下拉列表已展开，则收起当前下拉列表
        if (dataItems[itemkey].show) {
          // dataItems[itemkey].show = false;
          return this.handleClose()
        } else {
          dataItems = dataItems.map(i => {
            if (i.show) {
              i.show = false
            }
            return i;
          });
          this.setData({
            dataItems,
          },() => {
            dataItems[itemkey].show = true;
            this.setData({
              dataItems,
            })
          });
        }
      } else if (dataItems[itemkey].type === 'sort') { // 当前筛选条件为sort时
        switch (dataItems[itemkey].sortBy) {
          case 'desc': // 降序
            dataItems[itemkey].sortBy = 'asc';
            break;
          case 'asc': // 升序
            dataItems[itemkey].sortBy = 'desc';
            break;
          default: // 默认 default
            dataItems[itemkey].sortBy = 'asc';
            break;
        }
        this.setData({
          [`dataItems[${itemkey}]`]: {
            ...dataItems[itemkey],
            sortBy: dataItems[itemkey].sortBy,
            highlight: true,
          }
        })
        this.triggerEvent('sortChange', {
          sort: dataItems[itemkey].sortBy,
          parent: dataItems[itemkey],
        }, {});

      } else {

      }
    },
    /**
     * 下拉列表Options被点击时的回调
     * @param {Object} e clcikEvent传递过来的对象
     */
    handleOptionsClick(e) {
      const {
        optkey,
        parentkey
      } = e.currentTarget.dataset;
      let {
        dataItems
      } = this.data;
      const eventDetail = {
        parent: dataItems[parentkey],
        parentkey,
        optkey,
      };
      let items = dataItems[parentkey];
      if (items.options[optkey].checked) {
        // items.options[optkey].checked = false;
        return this.handleClose()
      } else {
        items.options = items.options.map(i => {
          if (i.checked) {
            i.checked = false
          }
          return i;
        });
        items.options[optkey].checked = true;
        this.handleClose()
      }
      this.setData({
        [`dataItems[${parentkey}]`]: Object.assign({}, items, {
          text: items.options[optkey].text,
          highlight: true,
          show: false,
        }),
      })
      this.triggerEvent('selected', {
        ...eventDetail,
        type: 'object',
      }, {})
    },
    /**
     * 点击遮罩层关闭事件
     */
    handleClose() {
      let {
        dataItems
      } = this.data;
      dataItems = dataItems.map(i => {
        if (i.show) {
          i.show = false
        }
        return i;
      });
      this.setData({
        dataItems,
      })
    },
  },

  ready: function () {
    let {
      dataItems
    } = this.data;
    dataItems = dataItems.map(i => {
      let items = Object.assign({}, i, {
        highlight: i.highlight || false,
        type: i.type || 'selected',
        options: i.options || [],
      });
      switch (items.type) {
        case 'selected':
          items.show = items.show || false;
          break;
        case 'sort':
          items.sortBy = items.sortBy || 'default';
          break;
        default:
          break;
      }
      return items;
    })
    this.setData({
      dataItems
    })
  },

})