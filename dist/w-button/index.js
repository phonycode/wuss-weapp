/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-08-30 15:49:51 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-08-31 16:12:23
 */
Component({
   /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class','wuss-button-hover-class'], 
  
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
   * @param {Boolean} disabled 禁用按钮
   * @param {Boolean} loading 设置loading状态
   * @param {String} formType 处理表单类型，可选值为 [submit|reset]
   * @param {Boolean} ghost 幽灵按钮
   * @param {Boolean} dashed 虚线
   * @param {String} icon 添加按钮图标
   * @param {String} openType 设置开放数据, 可选值为 [contact|share|getUserInfo|openSetting|feedback]
   * @param {String} type 按钮样式类型，可选值为 []
   * @param {String} styles 按钮的自定义样式
   * @param {String} color 自定义按钮颜色
   * @param {String} bgColor 自定义背景颜色
   * @param {Boolean} flat 开启按钮扁平化
   * @param {Boolean} full 撑满容器
   * @param {Boolean} inline 行内块按钮
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
  
  /**
   * 组件的初始数据
   */
  data: {},
  
  /**
   * 组件方法列表
   */
  methods: {
    handleClick() {
      this.tirggerEvent('click',{},{});
    },
    initStyles() {
      const { styles, color, bgColor, hoverColor } = this.data;
      let buttonStyles = '';
      buttonStyles += ` ${styles}` + (color ? `color: ${color}!important;` : '') + (bgColor ? ` background-color: ${bgColor}!important;` : '');
      this.setData({ buttonStyles })
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
    this.initStyles()
  },
  
  /**
   * 在组件实例进入页面节点树时执行
   */
   attached: function() {},
   
  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
   moved: function() {},
   
})