Component({
  externalClasses: ['wuss-class', 'wuss-popup-content'],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   * @param {boolean} visible 组件是否可见
   * @param {string} position 弹出位置,可选值: left right top bottom
   * @param {boolean} mask 是否开启遮罩层
   * @param {boolean} maskCancel 点击遮罩层可否关闭
   * @param {string} width 内容区的宽度，当type的值为left,right 时生效
   * @param {string} height 内容区的高度, 当type的值为top,bottom 时生效
   * @param {string} padding 内容区的内边距
   * @param {number} maskIndex 当前组件的z-index值
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer(visible) {
        if (visible) {
          this.openMaskShadow();
        } else {
          this.handleClose();
        }
      },
    },
    position: {
      type: String,
      value: 'bottom',
    },
    mask: {
      type: Boolean,
      value: true,
    },
    maskIndex: {
      type: Number,
      value: 100,
    },
    width: {
      type: String,
      value: '80%',
    },
    height: {
      type: String,
      value: 'auto',
    },
    padding: {
      type: String,
      value: '0 10px',
    },
    styles: {
      type: String,
      value: '',
    },
    zIndex: {
      type: Number,
      value: 1000,
    },
    maskCancel: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    maskShadow: false, // 模态框是否可见
  },
  methods: {
    /**
     * 遮罩层点击遮罩关闭
     */
    handleClose() {
      const { mask, visible } = this.data;
      if (!mask) return false; // 如果用户没开则退出
      this.setData({ maskShadow: false });
      this.triggerEvent('onClose', { visible }, {});
    },
    /**
     * 打开遮罩层
     */
    openMaskShadow() {
      const { mask } = this.data;
      if (!mask) return false; // 如果用户没开则退出
      this.setData({
        maskShadow: true,
      });
    },
  },
  ready: function() {
    const { position, height, width, padding, zIndex } = this.data;
    let popupStyles = '';
    switch (position.toLowerCase()) {
      case 'top':
        popupStyles += `height: ${height};`;
        break;
      case 'bottom':
        popupStyles += `height: ${height};`;
        break;
      case 'left':
        popupStyles += `width: ${width};`;
        break;
      case 'right':
        popupStyles += `width: ${width};`;
        break;
      default:
        break;
    }
    popupStyles += `padding: ${padding}; z-index: ${zIndex};`;
    this.setData({ popupStyles });
  },
});
