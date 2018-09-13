/*
 * @Author: Github.Juzhiqiang 
 * @Date: 2018-08-30 15:49:51 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-09-13 22:42:57
 */

Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class', 'wuss-button-hover-class'],

  /**
   * 组件间关系定义
   */
  relations: {},

  /**
   * 组件选项
   */
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   * @param {string} icon 添加按钮图标
   * @param {string} openType 设置开放数据, 可选值为 [contact|share|getUserInfo|openSetting|feedback]
   * @param {string} type 按钮样式类型，可选值为 []
   * @param {string} styles 按钮的自定义样式
   * @param {string} color 自定义按钮颜色
   * @param {string} bgColor 自定义背景颜色
   * @param {string} max 最大值
   * 
   */
  properties: {
    icon: {
      type: String,
      value: '',
    },
    iconColor: {
      type: String,
      value: '',
    },
    iconSize: {
      type: String,
      value: '20px',
    },
    openType: {
      type: String,
      value: '',
    },
    type: {
      type: String,
      value: '',
    },
    bgColor: {
      type: String,
      value: '',
    },
    color: {
      type: String,
      value: '',
    },
    styles: {
      type: String,
      value: '',
    },
    inline: {
      type: Boolean,
      value: false,
    },
    max :{
      type : [Number,String],
      value : 99
    },
    value: {
      type: [Number, String],
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件方法列表
   */
  methods: {
    initStyles() {
      const {
        styles,
        color,
        bgColor,
      } = this.data;
      let buttonStyles = '';
      buttonStyles += ` ${styles}` + (color ? `color: ${color}!important;` : '') + (bgColor ? ` background-color: ${bgColor}!important;` : '');
      this.setData({
        buttonStyles
      })
    },
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function () { },

  /**
   * 组件布局完成后执行
   */
  ready: function () {
    this.initStyles()
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  attached: function () { 
    console.log(this)
    let host = this;
    let data = host.data;
    let max = parseInt(data.max, 10);
    let value = parseInt(data.value, 10);

    // 超出 max 范围显示 max+
    if (value && max && value > max) {
      host.setData({
        value: '...'
      })
    }
  },

  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
  moved: function () { },

})