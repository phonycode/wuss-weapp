/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-12 14:03:55 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-12 17:29:43
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
  options: {
    multipleSlots: true,
  },

  /**
   * 组件间关系定义
   */
  behaviors: [Behavior],

  /**
   * 组件的属性列表
   * @param {boolean} visible 是否可见
   * @param {array} items 当前传出的菜单列表
   * @param {boolean} maskCancel 点击遮罩是否可关闭
   * @param {boolean} showCancel  是否展示取消按钮
   * @param {string} cancelText 取消按钮文字
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer(visible) {
        if(visible) {
          this.show();
        } else {
          this.hide()
        }
      },
    },
    items: {
      type: Array,
      value: [],
      observer(val) {
        this.setData({
          _globalTouch: val.reduce((p,n) => {
            n.loading ? p+=1 : p;
            return p;
          },0) > 0,
        })
      },
    },
    maskCancel: {
      type: Boolean,
      value: true,
    },
    showCancel: {
      type: Boolean,
      value: true,
    },
    cancelText: {
      type: String,
      value: '取消',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _globalTouch: false, //禁用全局点击
  },

  /**
   * 组件方法列表
   */
  methods: {
    /**
     * 取消回调
     */
    _handleCancel() {
      this.triggerEvent('close',{},{});
    },
    /**
     * 菜单被点击回调
     */
    _handleItemClick(e) {
      const item = this.data.items[e.currentTarget.dataset.key];
      const { autoClose } = this.data;
      if (!item || item.disabled) return false;
      this.triggerEvent('click', {
        ...item,
        key: e.currentTarget.dataset.key,
      }, {});
    },
    show(opts = {}) {
      this.setData({
        visible: true,
        ...opts,
      })
    },
    hide() {
      this.triggerEvent('close',{},{});
    },
    _handlePopupClose() {
      this.triggerEvent('close',{},{});
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