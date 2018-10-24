import Behavior from '../common/behavior/index';

const Marquee = '../w-marquee/index';

Component({
   /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'], 
  
  /**
   * 组件间关系定义
   */
   relations: {
    [Marquee]: {
      type: 'ancestor',
    },
   },
   
  /**
   * 组件选项
   */
   options: {
   },
   
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
    height: 0,
  },
  
  /**
   * 组件方法列表
   */
  methods: {
    handleClick(e) {
      this.triggerEvent('onClick',e)
    },
    /**
     * 更新一个item的高度
     * @param {number} height 
     */
    updateItemHeight(height) {
      if(height) this.setData({ height })
    }
  },
  
  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function() {},
   
  /**
   * 组件布局完成后执行
   */
  ready: function() {},
  
  /**
   * 在组件实例进入页面节点树时执行
   */
   attached: function() {},
   
  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
   moved: function() {},
   
})