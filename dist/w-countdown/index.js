/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-10 14:13:23 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-10 15:31:10
 */
// components/countdown/countdown.js

Component({
  externalClasses: ['wuss-class'],
  options: {
    addGlobalClass: true,
  },
  /**
   * @param {boolean} notimestamp  是否使用时间戳  true为不是
   * @param {boolean} bindcallback 倒计时结束的回调函数
   * @param {number} time         倒计时的时间  单位s
   * @param {string} format        格式化时间格式  默认为 H
   * */
  properties: {
    notimestamp: {
      type: Boolean,
      value: false,
    },
    format: {
      type: String,
      value: 'H',
    },
    time: {
      type: Number,
      value: '',
      observer: function(newValue) {
        let initTimes;
        if (!this.data.notimestamp) {
          initTimes = parseInt((newValue - new Date().getTime()) / 1000, 10);
          initTimes = initTimes < 0 ? 0 : initTimes;
        } else {
          initTimes = newValue;
        }
        this.setData({ initTimes }, () => {
          this._startTime();
        });
      },
    },
  },
  data: {
    initTimes: 0,
    timeText: '',
  },
  detached() {
    clearTimeout(this.timer);
  },
  methods: {
    callback(e) {
      this.triggerEvent('callback', {}, {});
    },
    _startTime() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this._timer();
      }, 1e3);
      this._timer();
    },
    _timer() {
      const { initTimes, format } = this.data;
      this.setData({
        initTimes: initTimes - 1,
        timeText: this.getTime(initTimes - 1, format, true),
      });
      this._isEnd();
    },
    _isEnd() {
      const { initTimes } = this.data;
      if (initTimes <= 0) {
        this.callback();
        return clearInterval(this.timer);
      }
    },
    add0 (m) {
      return m < 10 ? '0' + m : m;
    },
    getTime (time, type, notimestamp = false) {
      if (!notimestamp) {
        time = Math.round((time - new Date().getTime()) / 1000);
      }
      if(time <= 0) time =  0;    
      const s = this.add0(time % 60),
        mm = this.add0(parseInt(time / 60) % 60),
        h = this.add0(parseInt(time / 3600) % 24),
        d = parseInt(time / 86400);
    
      switch (type) {
        case 'D':
          return `${d}天 ${h}:${mm}:${s}`;
        case 'H':
          return `${h}:${mm}:${s}`;
        case 'MM':
          return `${mm}:${s}`;
        case 's':
          return s;
        case 'd':
          return d;
        default:
          return s;
      }
    }
  },
});
