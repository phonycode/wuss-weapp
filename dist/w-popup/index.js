Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class','wuss-popup-content'], 

  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * @param {Boolean} visible 组件是否可见
     * @param {String} position 弹出位置,可选值: left right top bottom
     * @param {Boolean} mask 是否开启遮罩层
     * @param {String} width 内容区的宽度，当type的值为left,right 时生效
     * @param {String} height 内容区的高度, 当type的值为top,bottom 时生效
     * @param {String} padding 内容区的内边距
      */
    visible: {
      type: Boolean,
      value: false,
      observer(visible) {
        if(visible) {
          this.openMaskShadow()
        } else {
          this.handleClose()
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
  },

  /**
   * 组件的初始数据
   */
  data: {
    maskShadow: false, // 模态框是否可见
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 遮罩层点击遮罩关闭
     */
    handleClose(){
      const { mask, visible } = this.data;
      if(!mask)return false; // 如果用户没开则退出
      this.setData({ maskShadow: false })
      this.triggerEvent('close',{ visible },{})
    },
    /**
     * 打开遮罩层
     */
    openMaskShadow() {
      const { mask } = this.data;
      if(!mask)return false; // 如果用户没开则退出
      this.setData({
        maskShadow: true,
      })
    },
  },
  ready: function() {
    const { position, height, width, padding, zIndex  } = this.data;
    let popupStyles = '';
    switch (position.toLowerCase()) {
      case 'top':
        popupStyles += `height: ${height};`
        break;
      case 'bottom':
        popupStyles += `height: ${height};`
        break;
      case 'left':
        popupStyles += `width: ${width};`
        break;
      case 'right':
        popupStyles += `width: ${width};`
        break;
      default:
        break;
    }
    popupStyles += `padding: ${padding}; z-index: ${zIndex};`;
    this.setData({ popupStyles })
  },
})
