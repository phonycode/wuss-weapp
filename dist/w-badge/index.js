import WussComponent from '../common/extends/baseComponent';

WussComponent({
  externalClasses: [
    'wuss-button-hover-class',
    'wuss-class-badge',
  ],
  /**
   * 组件的属性列表
   * @param {string} icon 添加按钮图标
   * @param {string} type 按钮样式类型，可选值为 []
   * @param {string} styles 按钮的自定义样式
   * @param {string} color 自定义按钮颜色
   * @param {string} bgColor 自定义背景颜色
   * @param {string} max 最大值
   *
   */
  properties: {
    icon: String,
    iconColor: String,
    type: String,
    bgColor: String,
    color: String,
    styles: String,
    iconSize: {
      type: String,
      value: '20px',
    },
    inline: {
      type: Boolean,
      value: false,
    },
    max: {
      type: Number,
      value: 99,
    },
    value: {
      type: Number,
      value: 0,
    },
  },
  data: {
    isMax: false,
  },
  methods: {
    initStyles() {
      let { styles, color, bgColor } = this.data;
      styles +=
        ` ${styles}` +
        (color ? `color: ${color}!important;` : '') +
        (bgColor ? ` background-color: ${bgColor}!important;` : '');
      this.setData({ styles });
    },
    handleClick(e) {
      this.triggerEvent('onClick', { ...e }, {});
    },
  },
  ready: function() {
    this.initStyles();
    let { max, value } = this.data;
    // 超出 max 范围显示 max+
    if (value > max) {
      this.setData({ isMax: true });
    }
  },
});
