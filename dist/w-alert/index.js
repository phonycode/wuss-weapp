/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-10 16:03:51 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-10 17:40:40
 */
import Behavior from '../common/behavior/index';

const OPTIONS = {
  title: '',
  content: '',
  maskClose: false,
  buttonColor: '#333333',
};

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
   * 组件间关系定义
   */
  behaviors: [Behavior],

  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    _visible: false,
  },

  /**
   * 组件方法列表
   */
  methods: {
    _handleClick() {
      const {
        confirm
      } = this.data;
      this.setData({
        _visible: false,
      })
      if (confirm) {
        confirm()
      }
    },
    alert(opts) {
      this.setData({
        _visible: true,
        ...OPTIONS,
        ...opts,
      })
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