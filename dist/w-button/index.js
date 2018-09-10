/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-08-30 15:49:51 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-10 09:18:11
 */
Component({
  externalClasses: ['wuss-class', 'wuss-button-hover-class'],
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   * @param {boolean} disabled 禁用按钮
   * @param {boolean} loading 设置loading状态
   * @param {string} formType 处理表单类型，可选值为 [submit|reset]
   * @param {boolean} ghost 幽灵按钮
   * @param {boolean} dashed 虚线
   * @param {string} icon 添加按钮图标
   * @param {string} openType 设置开放数据, 可选值为 [contact|share|getUserInfo|openSetting|feedback]
   * @param {string} type 按钮样式类型，可选值为 []
   * @param {string} styles 按钮的自定义样式
   * @param {string} color 自定义按钮颜色
   * @param {string} bgColor 自定义背景颜色
   * @param {boolean} flat 开启按钮扁平化
   * @param {boolean} full 撑满容器
   * @param {boolean} inline 行内块按钮
   */
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    formType: {
      type: String,
      value: ''
    },
    ghost: {
      type: Boolean,
      value: false,
    },
    dashed: {
      type: Boolean,
      value: false,
    },
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
      value: 'default',
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
    flat: {
      type: Boolean,
      value: false,
    },
    full: {
      type: Boolean,
      value: false,
    },
    inline: {
      type: Boolean,
      value: false,
    },
  },
  data: {},
  methods: {
    handleClick() {
      this.triggerEvent('click', {}, {});
    },
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
  ready: function () {
    this.initStyles()
  },

})