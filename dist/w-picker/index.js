/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-15 09:20:34 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-19 08:27:33
 */
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
  behaviors: [Behavior, field],

  /**
   * 组件的属性列表
   * @param {string} visible  组件是否可见
   * @param {string} disabled 禁用
   * @param {string} options  传入的选项数据源，格式key,value ...item
   * @param {string} value  form表单收集的值
   * @param {string} wModel  双向绑定当前值
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
    defaultValue: {
      type: String,
      value: {},
    },
    value: {
      type: Object,
      value: {},
    },
    wModel: {
      type: String,
      value: '',
      observer(val) {
        this._changeValue();
      },
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
  data: {
    scroll_element: [],
    currentItem: null,
    startY: 0,
    scrollY: 0,
    touchMove: false,
    stopPrevent: false,
  },
  methods: {
    _handleTouchStart(e) {
      this.setData({
        startY: e.changedTouches['0'].pageY,
        touchMove: true,
      });
      // console.log('_handleTouchStart',e)
    },
    _handleTouchMove(e) {},
    _handleTouchEnd(e) {
      // console.log('handleTouchEnd',e)
      const endY = e.changedTouches['0'].pageY;
      let diff = {
        ...e,
        detail: {
          ...e.detail,
          y: endY - this.data.startY,
        },
      };
      this.setData(
        {
          touchMove: false,
        },
        () => this._handleChange(diff)
      );
    },
    _handleChange(e) {
      const scrollY = e.detail.y;
      const {
        touchMove,
        visible,
        scroll_element,
        scroll_height,
        stopPrevent,
      } = this.data;
      if (
        touchMove ||
        !visible ||
        scroll_element.length <= 0 ||
        !scroll_height ||
        stopPrevent
      )
        return false;
      let diffArray = scroll_element
        .map(item => {
          return {
            ...item,
            diff: Math.abs(Math.abs(item.top) - Math.abs(scrollY)),
          };
        })
        .sort((a, b) => {
          if (a.diff > b.diff) {
            return -1; //返回的是负数，是降序
          } else if (a.diff < b.diff) {
            return 1; //返回的是正数，升序
          } else {
            return 0;
          }
        });
      const currentItem = diffArray[diffArray.length - 1];
      if (this.data.scrollY === currentItem.top) return false;
      // console.log('_handleChange',currentItem)
      this.setData(
        {
          scrollY: currentItem.top,
          currentItem: currentItem.item,
        },
        () =>
          this.triggerEvent(
            'onChange',
            {
              currentItem: currentItem.item,
            },
            {}
          )
      );
    },
    _handleCancel() {
      this.triggerEvent('cancel', {}, {});
    },
    _confirm() {
      let { currentItem } = this.data;
      if (!currentItem) {
        currentItem = this.data.options[0];
      }
      this.setData(
        {
          value: currentItem,
        },
        () => {
          this.triggerEvent(
            'onSelect',
            {
              ...currentItem,
            },
            {}
          );
          this._handleCancel();
        }
      );
    },
    _changeValue() {
      const { wModel, scroll_element } = this.data;
      if (wModel && typeof wModel === 'string') {
        const diffData = scroll_element.filter(i => i.item.value === wModel);
        if (diffData.length > 0) {
          this.setData(
            {
              stopPrevent: true,
              scrollY: diffData[0].top,
            },
            () =>
              setTimeout(() => {
                this.setData(
                  {
                    stopPrevent: false,
                    value: diffData[0].item,
                  },
                  () =>
                    this.triggerEvent(
                      'onSelect',
                      {
                        ...diffData[0],
                      },
                      {}
                    )
                );
              }, 200)
          );
        }
      }
    },
    _initial() {
      const systemInfo = wx.getSystemInfoSync();
      wx.createSelectorQuery()
        .in(this)
        .selectAll('.wuss-picker-scroll-item')
        .boundingClientRect(items => {
          const { options, defaultValue } = this.data;
          if (options.length <= 0) {
            throw Error('options不能为空');
          }
          const firstItem = items[0];
          let currentItem = '';
          let diffArray = items
            .map((i, idx) => {
              const item = Object.assign(
                {
                  ...i,
                  item: {
                    ...options[idx],
                  },
                },
                idx === 0
                  ? {
                      ...item,
                      top: 0,
                    }
                  : {
                      ...item,
                      top: -(i.top - firstItem.top),
                    }
              );
              if (item.item.value === defaultValue) {
                currentItem = item;
              }
              return item;
            })
            .filter(i => i && typeof i === 'object');
          this.setData(
            {
              systemInfo,
              scroll_element: diffArray,
              scroll_height:
                firstItem.height * items.length + (250 - firstItem.height),
            },
            () => {
              this.setData({
                value: currentItem.item,
                scrollY: currentItem.top || firstItem.top,
              });
            }
          );
        })
        .exec();
    },
  },
  ready: function() {
    this._initial();
  },
});
