/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-15 09:20:34 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-21 16:45:59
 */
import Behavior from '../common/behavior/index';
import field from '../common/behavior/field';

Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class', 'wuss-class-picker'],

  /**
   * 组件间关系定义
   */
  relations: {
    '../w-popup-picker/index': {
      type: 'ancestor',
    },
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
  behaviors: [Behavior, field],

  /**
   * 组件的属性列表
   * @param {string} disabled 禁用
   * @param {string} options  传入的选项数据源，格式key,value ...item
   * @param {string} value  form表单收集的值
   * @param {string} keyName  Object的键值名称
   * @param {string} defaultValue 初始化默认值
   * @param {string} wModel  双向绑定当前值
   * @param {string} width  设置当前picker的宽度,不建议使用
   */
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    options: {
      type: Array,
      value: [],
      observer(val) {
        this._initial();
      },
    },
    defaultValue: {
      type: String,
      value: {},
    },
    value: {
      type: Object,
      value: {},
    },
    keyName: {
      type: String,
      value: 'key',
    },
    width: {
      type: Number,
      value: '',
    },
    wModel: {
      type: String,
      value: '',
      observer(val) {
        this._changeValue();
      },
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
    stopPrevent: false,
  },

  /**
   * 组件方法列表
   */
  methods: {
    _handleTouchStart(e) {
      this.setData({
        startY: e.changedTouches['0'].pageY,
        touchMove: true,
      });
    },
    _handleTouchMove(e) {},
    _handleTouchEnd(e) {
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
        scroll_element,
        scroll_height,
        stopPrevent,
      } = this.data;
      if (
        touchMove ||
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
          // if (options.length <= 0) {
          //   throw Error('options不能为空')
          // }
          /**
           * 数据量过多时导致页面还没渲染完成获取到的元素数目不对,只能重新获取一次
           */
          if (options.length <= 0 || items.length !== options.length) {
            setTimeout(() => {
              this._initial();
            }, 200);
            return false;
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
              if (defaultValue && item.item.value === defaultValue) {
                currentItem = item;
              }
              return item;
            })
            .filter(i => i && typeof i === 'object');
          this.setData(
            {
              systemInfo,
              currentItem,
              stopPrevent: true,
              scroll_element: diffArray,
              scroll_height:
                firstItem.height * items.length + (250 - firstItem.height),
              scrollY: defaultValue ? currentItem.top : firstItem.top,
              value: currentItem.item,
            },
            () => {
              setTimeout(() => {
                this.setData(
                  {
                    stopPrevent: false,
                  },
                  () => {
                    this._handleChange({
                      detail: {
                        y: -1,
                      },
                    });
                    this._confirm();
                  }
                );
              }, 200);
            }
          );
        })
        .exec();
    },
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function() {},

  /**
   * 组件布局完成后执行
   */
  ready: function() {
    // this._initial()
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  attached: function() {},

  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
  moved: function() {},
});
