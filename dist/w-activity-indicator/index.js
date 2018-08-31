
Component({
   /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class','wuss-activity-indicator'], 
  
  /**
   * 组件间关系定义
   */
   relations: {},
   
  /**
   * 组件选项
   */
   options: {},
   
  /**
   * 组件的属性列表
   * @param {Boolean} visible 控制动画的显示隐藏
   * @param {String} size 指示器的大小,分别为[small/default/larger]
   * @param {String} color 动画的颜色
   * @param {String} type 动画类型，可选参数为[snake/diffusion/ball/catapult]
   * @param {String} text 附加的文本内容
   * @param {String} textStyle 附加的文本内容样式
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    size: {
      type: String,
      value: 'default',
      observer(val) {
        this.initAnimation()
      },
    },
    color: {
      type: String,
      value: 'rgb(252, 145, 83)',
      observer(val) {
        this.initAnimation()
      },
    },
    type: {
      type: String,
      value: 'snake',
      observer(val) {
        this.initAnimation()
      },
    },
    text: {
      type: String,
      value: '',
    },
    textStyle: {
      type: String,
      value: '',
    },
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    animationStyles: '',
    animationClass: '',
  },
  
  /**
   * 组件方法列表
   */
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
      animationClass += ` animation-${type}-size-${size}`
      this.setData({ 
        animationStyles,
        animationClass,
      })
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
    this.initAnimation();
  },
  
  /**
   * 在组件实例进入页面节点树时执行
   */
   attached: function() {},
   
  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
   moved: function() {},
   
})