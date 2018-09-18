/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-08-30 17:12:04 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-18 15:04:36
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
   * @param {string} type 图标类型
   * @param {string} size 图标大小
   * @param {string} color 图标颜色
   */
  properties: {
    type: {
      type: String,
      value: '',
    },
    size: {
      type: String,
      value: '40',
    },
    color: {
      type: String,
      value: '#333333',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件方法列表
   */
  methods: {
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function () {},

  /**
   * 组件布局完成后执行
   */
  ready: function () {
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  attached: function () {},

  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
  moved: function () {},
});