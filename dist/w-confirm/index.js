import Behavior from '../common/behavior/index';

/**
 * @param title 标题
 * @param content 内容
 * @param cancelText 取消按钮文本
 * @param confirmText 确定按钮文本
 * @param cancelTextColor 取消按钮文本颜色
 * @param confirmTextColor 确定按钮文本颜色
 * @param showCancel 是否展示取消按钮
 * @param confirm 确定按钮回调
 */
const DEFAULT_OPTIONS = {
  title: '',
  content: '',
  cancelText: '取消',
  confirmText: '确定',
  cancelTextColor: '#333333',
  confirmTextColor: '#ff9900',
  showCancel: true,
  confirm: () => void 0,
  cancel: () => void 0,
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
  options: {
    addGlobalClass: true,
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
    _visible: false, // 内部方法 隐藏/可见
  },

  /**
   * 组件方法列表
   */
  methods: {
    _handleConfirm() {
      const {
        confirm
      } = this.data;
      this.setData({
        _visible: false,
      }, () => {
        if (confirm) {
          confirm();
        }
      });
    },
    _handleCancel() {
      const {
        cancel
      } = this.data;
      this.setData({
        _visible: false,
      }, () => {
        if (cancel) {
          cancel();
        }
      });
    },
    confirm(opts) {
      const {
        _visible
      } = this.data;
      if (_visible) return false;
      this.setData({
        _visible: true,
        ...DEFAULT_OPTIONS,
        ...opts,
      });
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