/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-13 10:24:04 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-13 14:13:40
 */
import Behavior from '../common/behavior/index';

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
   * @param {string} size 大小,可选[small/default/larger]
   * @param {string} open 设置当前开关状态
   * @param {string} color 颜色，激活后的颜色
   * @param {boolean} disabled 是否禁用
   */
  properties: {
    size: {
      type: String,
      value: 'default',
    },
    open: {
      type: Boolean,
      value: false,
      observer(val) {
        if(typeof val === 'boolean') {
          val ? this.open() : this.close();
        }
      },
    },
    color: {
      type: String,
      value: '#33cc33'
    },
    disabled: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _open: false,
  },

  /**
   * 组件方法列表
   */
  methods: {
    _handleClick() {
      const _open = !this.data._open;
      if(this.data.disabled) return false;
      this.setData({
        _open,
      })
      this.triggerEvent('onChange',{ open: _open },{});
    },
    open() {
      this.setData({
        _open: true,
      })
    },
    close() {
      this.setData({
        _open: false,
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