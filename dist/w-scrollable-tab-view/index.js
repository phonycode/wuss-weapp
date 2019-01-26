/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-10-31 15:15:00 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2019-01-26 15:55:14
 */
import WussComponent from '../common/extends/baseComponent';

WussComponent({
  /**
   * 组件间关系定义
   */
  relations: {

  },
  
  /**
   * 组件的属性列表
   * @param {array} options 传入的选项组： { containerName, containerHeight } 支持array-keys形式传参
   * @param {number} height 固定每个容器的高度
   * @param {number} width 固定每个容器的高度
   * @param {number} currentIndex 设置当前激活的索引
   * @param {number} defaultIndex 设置初始化索引
   */
  properties: {
    options: {
      type: Array,
      value: [],
      observer: 'initTabView',
    },
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
    renderTabBar: {
      type: String,
      value: 'tabs',
    },
    currentIndex: {
      type: Number,
      observer(v) {
        if (isNaN(v) || typeof v !== 'number') return false;
        this.setData({
          currentIndex: v
        })
      },
    },
    defaultIndex: {
      type: Number,
      value: 0,
    },
    tabsTransition: {
      type: Boolean,
      value: true,
    },
    tabsLine: {
      type: Boolean,
      value: true,
    },
    tabsLineSize: {
      type: Number,
      value: 0.5,
    },
    tabsBorder: {
      type: Boolean,
      value: true,
    },
    tabsBorderColor: {
      type: String,
      value: '#eeeeee',
    },
    tabsBorderSize: {
      type: String,
      value: '2',
    },
    tabsDuration: {
      type: Number,
      value: 0.2,
    },
    tabsActiveColor: {
      type: String,
      value: 'rgb(69, 143, 246)',
    },
    tabsTextStyles: {
      type: String,
      value: '',
    },
    tabsFixed: {
      type: Boolean,
      value: false,
    },
    tabsItemThreshold: {
      type: Number,
      value: 4,
    },
    tabsDisabled: {
      type: Boolean,
    },
    tabsDefaultIndex: {
      type: Number,
      value: 0,
    },
    tabsStyles: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    _options: [],
    _tabBarOptions: [],
    _isRadio: false,
    _currentHeight: 0, // pageview默认的高度
    _currentWidth: wx.getSystemInfoSync().windowWidth, // 默认为当前屏幕的宽度
    _isArrayObject: false,
  },

  /**
   * 组件方法列表
   */
  methods: {
    handleSwiperChange(e) {
      const {
        options
      } = this.data;
      const currentIndex = e.detail.current;
      if (isNaN(currentIndex)) return false;
      const currentItem = options[currentIndex];
      if (currentItem.height) {
        this.setData({
          _currentHeight: currentItem.height,
        })
      }
      if (currentItem.width) {
        this.setData({
          _currentWidth: currentItem.width,
        })
      }
      this.setData({
        currentIndex: currentIndex,
      }, () => this.triggerEvent('onChange', {
        value: currentIndex
      }, {}));
    },
    handleAnimationFinish(e) {
      const {
        current
      } = e.detail;
      if (isNaN(current)) return false;
      this.triggerEvent('onAnimationFinish', {
        value: current
      }, {});
    },
    handleTabChange(e) {
      this.setData({
        currentIndex: e.detail.value,
      })
    },
    initTabView() {
      const {
        options,
        defaultIndex,
        renderTabBar,
      } = this.data;
      const _isArrayObject = this.isArrayObject(options);
      const _isRadio = !!(options[0] && !Array.isArray(options[0]) && Object.prototype.toString.call(options[0]) !== '[object Object]');
      let newOptions = [];
      let tabBarOptions = [];
      if (_isRadio) {
        newOptions = options;
        options.forEach((__v) => tabBarOptions.push(renderTabBar === 'tabs' ? { text: __v } : __v ));
      } else {
        options.forEach((__v) => {
          tabBarOptions.push(renderTabBar === 'tabs' ? Object.assign({
            text: __v.name,
            icon: __v.icon || null,
            iconSize: __v.iconSize || null,
            iconColor: __v.iconColor || null,
          }) : __v.name);
          newOptions.push(Object.assign({
            ...__v,
          }, __v.height ? {
            height: __v.height,
          } : {}, __v.width ? {
            width: __v.width,
          } : {}));
        });
      };
      this.setData({
        _options: newOptions,
        _tabBarOptions: tabBarOptions,
        _isRadio,
        _isArrayObject,
        currentIndex: defaultIndex,
      });
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
    wx.createSelectorQuery()
      .in(this)
      .select('.w-scrollable-tab-view-bar')
      .boundingClientRect()
      .exec(([node]) => this.setData({
        _currentHeight: wx.getSystemInfoSync().windowHeight - node.height,
      }));
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