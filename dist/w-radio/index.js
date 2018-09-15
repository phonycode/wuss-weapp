/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-14 09:43:02 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-15 16:53:51
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
   * @param {string} checked 控制当前是否选中
   * @param {string} defaultChecked 初始化选中
   * @param {string} disabled 禁用
   * @param {string} color 颜色
   * @param {string} size 大小,可选[small/default/larger]
   */
  properties: {
    checked: {
      type: Boolean,
      value: false,
      observer(val) {
        console.log(11111, val);
        if (typeof val === 'boolean') {
          val ? this.checked() : this.pickup();
        }
      },
    },
    defaultChecked: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    color: {
      type: String,
      value: '#28a2f3',
    },
    size: {
      type: String,
      value: 'default',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _checked: false,
  },

  /**
   * 组件方法列表
   */
  methods: {
    /**
     * 单选框被选中
     */
    _handleChecked() {
      const { _checked, disabled } = this.data;
      if (disabled) return false;
      this.setData({ _checked: !_checked });
      this.triggerEvent('onChange', { checked: !_checked }, {});
    },
    checked() {
      console.log(1);

      this.setData({ _checked: true });
    },
    pickup() {
      this.setData({ _checked: false });
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
    const { defaultChecked } = this.data;
    defaultChecked ? this.checked() : this.pickup();
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  attached: function() {},

  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
  moved: function() {},
});
