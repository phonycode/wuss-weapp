import Behavior from '../common/behavior/index';

/**
 * @param {string} content 展示内容
 * @param {boolean} showText 是否展示内容文字
 * @param {number} timeout 指定时间段内关闭loading
 * @param {function} hide loading消失后的回调
 */
const DEFAULT_OPTIONS = {
  content: '正在加载...',
  showText: true,
  timeout: null,
  hide: () => void 0,
};

Component({
   /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'], 
  
  /**
   * 组件间关系定义
   */
   relations: {},
   
  /**
   * 组件选项
   */
   options: {},
   
  /**
   * 组件间关系定义
   */
  behaviors: [Behavior],
   
  /**
   * 组件的属性列表
   */
  properties: {},
  
  /**
   * 组件的初始数据
   */
  data: {
    _visible: false, // 内部显示/可见'
    _p: void 0,
  },
  
  /**
   * 组件方法列表
   */
  methods: {
    show(opts = {}) {
      const { timeout, content, _visible } = opts;
      if(_visible) return false;
      const _p = new Promise(resolve => {
        if(timeout && typeof timeout === 'number') {
          return setTimeout(() => {
            this.hide();
            resolve();
          }, timeout);
        }
      })
      this.setData({
        _visible: true,
        ...DEFAULT_OPTIONS,
        ...opts,
        _p,
      })
      return _p;
    },
    hide() {
      const { hide, _visible } = this.data;
      if(!_visible) return false;
      this.setData({
        _visible: false,
        ...DEFAULT_OPTIONS,
      })
      if(hide) return hide();
    },
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
   * 在组件实例进入页面节点树时执行
   */
   attached: function() {},
   
  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
   moved: function() {},
   
})