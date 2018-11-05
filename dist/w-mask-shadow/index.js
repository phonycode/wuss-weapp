Component({
  externalClasses: ['wuss-class'],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   * @param {boolean} visible 组件是否可见
   * @param {boolean} maskCancel 是否开启遮罩层点击关闭
   * @param {number} zIndex 当前组件的z-index值
   * @param {number} opacity 当前组件遮罩的不透明度
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    maskCancel: {
      type: Boolean,
      value: true,
    },
    zIndex: {
      type: Number,
      value: 100,
    },
    opacity: {
      type: Number,
      value: 0.6,
    },
  },
  data: {
    maskStyles: '',
  },
  methods: {
    handleClick() {
      const { visible } = this.data;
      const { maskCancel } = this.data;
      if (!maskCancel) return false; // 如果用户没开则退出
      this.triggerEvent(
        'onClose',
        {
          visible,
        },
        {}
      );
    },
  },
  ready: function() {
    const { zIndex, opacity } = this.data;
    let maskStyles = '';
    maskStyles += `z-index: ${zIndex}; background: rgba(0, 0, 0, ${opacity});`;
    this.setData({
      maskStyles,
    });
  },
});
