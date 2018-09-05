Component({
  externalClasses: ['wuss-class'],
  /**
   * 组件的属性列表
   * @param {string} shape 指定头像的形状，可选值为 circle、square
   * @param {string} size 设置头像的大小，可选值为 small、default、large
   * @param {string} src 图片类头像的 src 地址
   * @param {Boolean} scale 是否自动调整大小
   */
  properties: {
    shape: {
      type: String,
      value: 'circle',
    },
    size: {
      type: String,
      value: 'default',
    },
    src: {
      type: String,
      value: '',
    },
    scale: {
      type: Boolean,
      value: false,
    },
  },
});
