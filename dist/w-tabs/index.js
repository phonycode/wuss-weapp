/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-03 15:12:31 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-04 11:56:04
 */
Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'],

  /**
   * 组件间关系定义
   */
  relations: {},

  /**
   * 组件选项
   */
  options: {},

  /**
   * 组件的属性列表
   * @param {Array} tabs tab列表的数据源 参数有 text,icon,iconColor,iconSize
   * @param {Number} index  设置当前初始化索引
   * @param {Boolean} transition 是否开启过渡动画
   * @param {String} line 是否开启线条
   * @param {Number} margin 设置两边 边距
   * @param {Number} lineSize 线条长度大小 0 - 1
   * @param {String} border 开启线条
   * @param {String} borderColor 线条颜色
   * @param {String} activeColor 颜色
   * @param {String} textStyles 文本样式
   * @param {Boolean} fixed 是否开启定位
   */
  properties: {
    tabs: {
      type: Array,
      value: [],
      observer: function (val) {
        const {
          currentIndex,
          index
        } = this.data;
        this.computedStyles()
        this.tabIndex(currentIndex || index)
      },
    },
    index: {
      type: Number,
      value: 0,
      observer: function (val) {
        this.tabIndex(val)
      },
    },
    transition: {
      type: Boolean,
      value: true,
    },
    line: {
      type: Boolean,
      value: true,
    },
    lineSize: {
      type: Number,
      value: .5,
    },
    margin: {
      type: Number,
      value: 0,
      observer: function (val) {
        this.computedStyles()
      },
    },
    border: {
      type: Boolean,
      value: true,
    },
    borderColor: {
      type: String,
      value: '#eeeeee',
      observer: function (val) {
        this.computedStyles()
      },
    },
    activeColor: {
      type: String,
      value: 'rgb(69, 143, 246)',
    },
    textStyles: {
      type: String,
      value: '',
    },
    fixed: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: null,
  },

  /**
   * 组件方法列表
   */
  methods: {
    /**
     * 计算并切换到对应导航栏
     * @param {Number} index 
     */
    tabIndex(index = 0) {
      const {
        tabs,
        lineSize,
        activeColor,
        currentIndex,
        transition,
        margin,
      } = this.data;
      const systemInfo = wx.getSystemInfoSync();
      if (!tabs || tabs.length < 0) throw Error('tab 长度不能为空');
      if (currentIndex === index) return false;
      let tabWidth = ((systemInfo.windowWidth - margin * 2) / tabs.length);
      let left = (tabWidth * index) + (tabWidth - (tabWidth * lineSize)) / 2;
      let lineStyles = '';
      lineStyles += `width: ${tabWidth * lineSize}px;` +
        `transform: translate3d(${ left }px,0,0);` +
        `background-color: ${activeColor};` +
        `${!transition ? 'transition: none;' : ''}`;
      this.setData({
        lineStyles,
        currentIndex: index,
      })
      this.triggerEvent('onChange', {
        index,
        item: tabs[index],
      }, {})
    },
    computedStyles() {
      const {
        borderColor,
        margin,
      } = this.data;
      let styles = '';
      styles += `border-bottom: 1rpx solid ${borderColor};` +
        `margin: 0 ${ margin + 'px' };`;
      this.setData({
        styles
      })
    },
    handleTab(e) {
      let index = e.currentTarget.dataset.index;
      if (index == null || index == undefined) return false;
      this.tabIndex(index);
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
    const {
      index
    } = this.data;
    wx.getSystemInfo({
      success: systemInfo => {
        this.computedStyles()
        this.tabIndex(index);
      },
    })
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