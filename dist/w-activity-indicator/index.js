Component({
  externalClasses: ['wuss-class', 'wuss-activity-indicator'],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   * @param {string} size 指示器的大小,分别为[small/default/larger]
   * @param {string} color 动画的颜色
   * @param {string} type 动画类型，可选参数为[snake/diffusion/ball/catapult]
   * @param {string} text 附加的文本内容
   * @param {string} textStyles 附加的文本内容样式
   */
  properties: {
    size: {
      type: String,
      value: 'default',
      observer(val) {
        this.initAnimation();
      },
    },
    color: {
      type: String,
      value: 'rgb(252, 145, 83)',
      observer(val) {
        this.initAnimation();
      },
    },
    type: {
      type: String,
      value: 'snake',
      observer(val) {
        this.initAnimation();
      },
    },
    text: {
      type: String,
      value: '',
    },
    textStyles: {
      type: String,
      value: '',
    },
  },
  data: {
    animationStyles: '',
    animationClass: '',
  },
  methods: {
    initAnimation() {
      const { color } = this.data;
      const size = this.data.size.toLowerCase();
      const type = this.data.type.toLowerCase();
      let animationStyles = '';
      let animationClass = '';
      switch (type) {
        case 'snake':
          animationStyles += ` border: 2px solid ${color};background: transparent;border-bottom-color: transparent;`;
          break;
        case 'diffusion':
          animationStyles += ` background: ${color};`;
          break;
        case 'ball':
          animationStyles += ` background: ${color};`;
          break;
        case 'catapult':
          animationStyles += ` background: ${color};`;
          break;
        default:
          break;
      }
      animationClass += ` animation-${type}-size-${size}`;
      this.setData({
        animationStyles,
        animationClass,
      });
    },
  },
  ready: function() {
    this.initAnimation();
  },
});
