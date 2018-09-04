/**
 * @param {string} type icon类型
 * @param {string} message 提示内容
 * @param {number} duration 自动关闭的延时，单位毫秒
 * @param {string} position 弹出位置,可选值:  default  top  middle  bottom
 * @param {boolean} mask 是否显示透明蒙层，防止触摸穿透
 */
const DEFAULTS_OPTS = {
  type: '',
  duration: 1500,
  mask: true,
  message: '一般使用',
  position: 'default',
};

const DEFAULT_TOAST = {
  hide: null, // 隐藏hide方法
  time: null, // 定时器
};
const DURATION = 400;
let wussToast = DEFAULT_TOAST;
const toast_Animation = wx.createAnimation({ duration: DURATION });

Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'],

  /**
   * 组件的初始数据
   * @param {boolean} visible 组件是否可见
   */
  data: {
    visible: false,
    animationData: {},
  },

  /**
   * 组件方法列表
   */
  methods: {
    show({ position = 'default', ...opts }) {
      const p = new Promise(resolve => {
        if (wussToast.time) {
          wussToast.hide();
          clearTimeout(wussToast.time);
          wussToast = DEFAULT_TOAST;
        }

        wussToast.hide = () => {
          this.hide.call(this, position);
          resolve(true);
        };
        this.setData(
          {
            ...DEFAULTS_OPTS,
            ...opts,
            position,
            visible: true,
          },
          () => {
            setTimeout(() => {
              this.__move(position, wussToast);
            }, 20);
          }
        );
      });
      wussToast.then = (resolve, reject) => {
        return p.then(resolve, reject);
      };
      return wussToast;
    },
    __move(position, wussToast) {
      switch (position) {
        case 'top':
          toast_Animation.top('50rpx');
          break;
        case 'bottom':
          toast_Animation.bottom('100rpx');
          break;
      }
      this.setData(
        {
          animationData: toast_Animation
            .opacity(1)
            .step()
            .export(),
        },
        () => {
          this.data.duration &&
            (wussToast.time = setTimeout(
              wussToast.hide,
              this.data.duration + DURATION
            ));
        }
      );
    },
    hide(position) {
      switch (position) {
        case 'top':
          toast_Animation.top('-100%');
          break;
        case 'bottom':
          toast_Animation.bottom('-100%');
          break;
      }
      this.setData(
        {
          animationData: toast_Animation
            .opacity(0)
            .step()
            .export(),
          visible: false,
        },
        () => {
          this.setData({
            animationData: {},
          });
        }
      );
    },
    toastClick() {},
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function() {},

  /**
   * 组件布局完成后执行
   */
  ready: function() {},

  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
  moved: function() {},
});
