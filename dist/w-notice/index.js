/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-09 14:35:55 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-11-02 16:48:03
 */
Component({
  externalClasses: ['wuss-class'],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   * @param {string} text 文本内容
   * @param {string} mode 模式 可选 link |  closeable
   * @param {string} color 文本颜色
   * @param {string} backgroundColor 背景颜色
   * @param {string} backgroundColor 背景颜色
   * @param {string} url mode为link时 跳转地址
   * @param {string} openType mode为link时 跳转类型
   * @param {string} speed 滚动速度 scrollable为true时有效
   * @param {string} scrollable 是否可以滚动
   * @param {string} icon 左边的图标地址
   */
  properties: {
    text: {
      type: String,
      value: '',
      observer: 'init',
    },
    mode: {
      type: String,
      value: '',
    },
    color: {
      type: String,
      value: '#f76a24',
    },
    backgroundColor: {
      type: String,
      value: '#fefcec',
    },
    url: {
      type: String,
      value: '',
    },
    openType: {
      type: String,
      value: 'navigate',
    },
    speed: {
      type: Number,
      value: 50,
    },
    scrollable: {
      type: Boolean,
      value: true,
    },
    icon: {
      type: String,
      value: '',
    },
  },
  data: {
    show: true,
    animationData: null,
    timer: null,
    wrapWidth: null,
    width: null,
    noticeAnimation: null,
    resetAnimation: null,
  },
  detached() {
    clearTimeout(this.data.timer);
    this.setData({
      timer: null,
    });
  },
  methods: {
    init() {
      wx.nextTick(() => {
        this.data.scrollable &&
          wx
            .createSelectorQuery()
            .in(this)
            .select('.wuss-notice__content-wrap')
            .boundingClientRect()
            .select('.wuss-notice__content')
            .boundingClientRect()
            .exec(([{ width: wrapWidth }, { width }]) => {
              const { speed } = this.data;
              const duration = (width / speed) * 1000;
              const noticeAnimation = wx.createAnimation({ duration });
              const resetAnimation = wx.createAnimation({ duration: 0 });
              this.setData(
                {
                  wrapWidth,
                  width,
                  duration,
                  noticeAnimation,
                  resetAnimation,
                },
                this.setAnimations
              );
            });
      });
    },
    setAnimations() {
      const {
        duration,
        wrapWidth,
        noticeAnimation,
        resetAnimation,
        speed,
      } = this.data;
      noticeAnimation.translateX(-(duration * speed) / 1000).step();

      resetAnimation.translateX(wrapWidth).step();
      this.setData({
        animationData: resetAnimation.export(),
      });
      setTimeout(() => {
        this.setData({
          animationData: noticeAnimation.export(),
        });
      }, 100);

      const timer = setTimeout(() => {
        this.setAnimations();
      }, duration);

      this.setData({
        timer,
      });
    },
    handleClick(e) {
      this.triggerEvent('onClick', e);
    },
    onClose(e) {
      if (this.data.mode !== 'closeable') return;
      this.setData({ show: false });
      this.triggerEvent('onClose', e);
    },
  },
});
