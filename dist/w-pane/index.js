/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-08-31 15:30:11 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-04 11:59:32
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
   options: {
    multipleSlots: true,
   },
   
  /**
   * 组件的属性列表
   * @param {string} title 标题
   * @param {string} desc 描述
   * @param {number} tsize 标题文字大小
   * @param {number} dsize 描述文字大小
   */
  properties: {
    title: {
      type: String,
      value: '',
    },
    desc: {
      type: String,
      value: '',
    },
    tsize: {
      type: Number,
      value: 18,
    },
    dsize: {
      type: Number,
      value: 14,
    },
  },
  
  /**
   * 组件的初始数据
   */
  data: {},
  
  /**
   * 组件方法列表
   */
  methods: {},
  
  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function() {},
   
  /**
   * 组件布局完成后执行
   */
  ready: function() {
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