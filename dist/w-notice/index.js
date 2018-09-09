/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-09 14:35:55 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-09 19:36:33
 */
// dist/w-notice/index.js

Component({
  externalClasses: ['wuss-class'],
  optiton: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
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

  /**
   * 组件的初始数据
   */
  data: {
    show: true,
    animationData: null,
    timer: null,
    wrapWidth: null,
    width: null,
    noticeAnimation: null,
    resetAnimation: null,
  },
  /**
   * 组件的方法列表
   */
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
      this.triggerEvent('click', e);
    },
    onClose(e) {
      if (this.data.mode !== 'closeable') return;
      this.setData({ show: false });
      this.triggerEvent('close', e);
    },
  },
});
