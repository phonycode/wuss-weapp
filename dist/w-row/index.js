import Behavior from '../common/behavior/index';

const LayoutCol = '../w-col/index';
const DIRECTION = ['flex-start','flex-end','center','space-around','space-between'];

Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'],

  /**
   * 组件间关系定义
   */
  relations: {
    [LayoutCol]: {
      type: 'descendant', // 关联的目标节点应为子孙节点
      linked(target) {
        const { gutter, direction } = this.data;
        if(gutter && typeof gutter === 'number') {
          target.updateGutter(gutter)
        }
        if(direction && DIRECTION.findIndex(i => i.indexOf(direction) > -1 )) {
          target.updateDirection(direction)
        }
      },
      linkChanged() {},
      unlinked() {},
    },
  },

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
   * @param {number} gutter 栅格间隔
   * @param {string} direction 布局排列方式：[left/right]
   */
  properties: {
    gutter: {
      type: Number,
      value: 0,
    },
    direction: {
      type: String,
      value: 'left',
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