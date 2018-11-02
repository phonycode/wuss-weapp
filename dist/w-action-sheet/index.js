/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-12 14:03:55 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-11-02 12:06:58
 */
import Behavior from '../common/behavior/index';

Component({
  externalClasses: ['wuss-class'],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  behaviors: [Behavior],
  /**
   * 组件的属性列表
   * @param {boolean} visible 是否可见
   * @param {array} options 当前传出的菜单列表
   * @param {boolean} maskCancel 点击遮罩是否可关闭
   * @param {boolean} showCancel  是否展示取消按钮
   * @param {string} cancelText 取消按钮文字
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    options: {
      type: Array,
      value: [],
      observer(val) {
        this.setData({
          _globalTouch:
            val.reduce((p, n) => {
              n.loading ? (p += 1) : p;
              return p;
            }, 0) > 0,
        });
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
  data: {
    _globalTouch: false, //禁用全局点击
  },
  methods: {
    /**
     * 取消回调
     */
    _handleCancel() {
      this.setData({
        visible: false,
      },() => this.triggerEvent('onClose', {}, {}))
    },
    /**
     * 菜单被点击回调
     */
    _handleItemClick(e) {
      const item = this.data.options[e.currentTarget.dataset.key];
      if (!item || item.disabled) return false;
      this.triggerEvent(
        'onChange',
        {
          ...item,
          key: e.currentTarget.dataset.key,
        },
        {},
      );
    },
    show(opts = {}) {
      this.setData({
        visible: true,
        ...opts,
      },() => this.triggerEvent('onShow', {}, {}));
    },
    hide(opts = {}) {
      this.setData({
        visible: false,
        ...opts,
      }, () => this.triggerEvent('onClose', {}, {}));
    },
  },
});
