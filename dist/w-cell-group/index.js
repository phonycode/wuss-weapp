/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-05 09:15:49 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-05 10:33:14
 */
Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'],

  /**
   * 组件间关系定义
   */
  relations: {
    '../w-cell/index': {
      type: 'child',
      linked() {
        this._mapLastCell()
      },
      linkChanged() {
        this._mapLastCell()
      },
      unlinked() {
        this._mapLastCell()
      },
    },
  },

  /**
   * 组件选项
   */
  options: {},

  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件方法列表
   */
  methods: {
    _mapLastCell() {
      let nodes = this.getRelationNodes('../w-cell/index');
      this.setData({ hasBefore: nodes.length >= 1 })
      nodes.length >= 1 ? nodes[0].updateFistCell() : '';
    },
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function () {
  },

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