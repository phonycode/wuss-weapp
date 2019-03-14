/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-10-30 14:52:00 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2019-03-07 15:29:09
 */
import WussComponent from '../common/extends/baseComponent';


WussComponent({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class-hd', 'wuss-class-bd', 'wuss-class-ft'],

  /**
   * 组件间关系定义
   */
  relations: {},

  /**
   * 组件的属性列表
   * @param {boolean} full 通栏模式
   * @param {string} title 头部标题
   * @param {string} extra 头部副标题
   * @param {string} content 内容区信息
   * @param {string} footer 底部标题
   * @param {string} footerExtra 底部副标题
   * @param {boolean} shadow 开启卡片阴影
   * @param {boolean} loading 进入loading模式
   * @param {number} loadingIndex 进入loading模式骨架的z-index层级
   */
  properties: {
    full: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    extra: {
      type: String,
    },
    content: {
      type: String,
    },
    footer: {
      type: String,
    },
    footerExtra: {
      type: String,
    },
    shadow: {
      type: Boolean,
      value: true,
    },
    loading: {
      type: Boolean,
      value: false,
      observer(__v) {
        if(__v) return this._renderLoadingCard();
      },
    },
    loadingIndex: {
      type: Number,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _CARD_LOADING_HEIGHT: 138,
    _RENDER_CARD_COUNT: 1,
  },

  /**
   * 组件方法列表
   */
  methods: {
    handleHdClick (e) {
      this.triggerEvent('onHdClick',e);
    },
    handleBdClick (e) {
      this.triggerEvent('onBdClick',e);
    },
    _renderLoadingCard() {
      wx.createSelectorQuery()
      .in(this)
      .select('.wuss-card')
      .boundingClientRect()
      .exec(([node]) => this.setData({
        _RENDER_CARD_COUNT: Math.ceil(node.height/this.data._CARD_LOADING_HEIGHT),
      }));
    },
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function () {},

  /**
   * 组件布局完成后执行
   */
  ready: function () {},

  /**
   * 在组件实例进入页面节点树时执行
   */
  attached: function () {},

  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
  moved: function () {},

})