/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-11-01 10:38:31 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-11-02 16:48:50
 */
import Behavior from '../common/behavior/index';

Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class','wuss-placeholder-class'],

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
   * 组件间关系定义
   */
  behaviors: [Behavior],

  /**
   * 组件的属性列表
   * @param {string} label 标签
   * @param {string} value 值
   * @param {string} placeholder 占位符
   * @param {boolean} disabled 禁用
   * @param {string} vcodeSrc 验证码图片地址
   * @param {number} maxLength 最大长度
   */
  properties: {
    label: {
      type: String,
    },
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    vcodeSrc: {
      type: String,
    },
    maxLength: {
      type: Number,
      value: 140,
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
    _handleChange(e) {
      const value = e.detail.value;
      this.setData({ value }, () => this.triggerEvent('onChange',{ value }));
    },
    _handleChangeVCode() {
      this.triggerEvent('onChangeVCode');
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