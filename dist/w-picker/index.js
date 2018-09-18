/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-15 09:20:34 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-18 09:12:12
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
   * @param {string} visible  组件是否可见
   * @param {string} disabled 禁用
   * @param {string} options  传入的选项数据源，格式text, ...item
   * @param {string} value  form表单收集的值
   * @param {string} title  header中间的标题
   * @param {string} cancelText 取消按钮的文本
   * @param {string} confirmText  确定按钮的文本
   * @param {string} confirmTextColor 确定按钮的颜色
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    options: {
      type: Array,
      value: [],
    },
    value: {
      type: Object,
      value: {},
    },
    title: {
      type: String,
      value: '',
    },
    cancelText: {
      type: String,
      value: '取消',
    },
    confirmText: {
      type: String,
      value: '确认',
    },
    confirmTextColor: {
      type: String,
      value: '#ff8800',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    scroll_element: [],
    currentItem: null,
    startY: 0,
    scrollY: 0,
    touchMove: false,
  },

  /**
   * 组件方法列表
   */
  methods: {
    _handleTouchStart(e) {
      this.setData({
        startY: e.changedTouches["0"].pageY,
        touchMove: true,
      })
      // console.log('_handleTouchStart',e)
    },
    _handleTouchMove(e) {

    },
    _handleTouchEnd(e) {
      // console.log('handleTouchEnd',e)
      const endY = e.changedTouches["0"].pageY;
      let diff = {
        ...e,
        detail: {
          ...e.detail,
          y: endY - this.data.startY,
        },
      };
      this.setData({
        touchMove: false,
      }, () => this._handleChange(diff))
    },
    _handleChange(e) {
      const scrollY = e.detail.y;
      if (this.data.touchMove) return false;
      const {
        scroll_element
      } = this.data;
      let diffArray = scroll_element.map(item => {
        return {
          ...item,
          diff: Math.abs(Math.abs(item.top) - Math.abs(scrollY)),
        }
      }).sort((a, b) => {
        if (a.diff > b.diff) {
          return -1; //返回的是负数，是降序
        } else if (a.diff < b.diff) {
          return 1; //返回的是正数，升序
        } else {
          return 0;
        }
      })
      const currentItem = diffArray[diffArray.length - 1];
      if (this.data.scrollY === currentItem.top) return false;
      // console.log('_handleChange',currentItem)
      this.setData({
        scrollY: currentItem.top,
        currentItem: currentItem.item,
      }, () => this.triggerEvent('onChange', {
        currentItem: currentItem.item
      }, {}))
    },
    _handleCancel() {
      this.triggerEvent('cancel', {}, {})
    },
    _confirm() {
      let {
        currentItem
      } = this.data;
      if (!currentItem) {
        currentItem = this.data.options[0];
      }
      this.setData({
        value: currentItem,
      }, () => {
        this.triggerEvent('onSelect', {
          ...currentItem,
        }, {})
        this._handleCancel();
      })
    },
    _initial() {
      const systemInfo = wx.getSystemInfoSync();
      wx.createSelectorQuery().in(this).selectAll('.wuss-picker-scroll-item').boundingClientRect(items => {
        const {
          options
        } = this.data;
        if (options.length <= 0) {
          throw Error('options不能为空')
        }
        const firstItem = items[0];
        let diffArray = [{
          ...firstItem,
          top: 0,
          item: {
            ...options[0],
          },
        }].concat(items.map((i, idx) => {
          if (idx > 0) {
            return {
              ...i,
              item: {
                ...options[idx],
              },
              top: -(i.top - firstItem.top),
            }
          }
        }).filter(i => (i && typeof i === 'object')))
        this.setData({
          systemInfo,
          scroll_element: diffArray,
          scroll_height: (firstItem.height * items.length) + (250 - firstItem.height),
        })
      }).exec();
    },
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function () {},

  /**
   * 组件布局完成后执行
   */
  ready: function () {
    this._initial()
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  attached: function () {},

  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
  moved: function () {},

})