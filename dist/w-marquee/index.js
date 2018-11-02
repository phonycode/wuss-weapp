import Behavior from '../common/behavior/index';

const MarqueeItem = '../w-marquee-item/index';

Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'],

  /**
   * 组件间关系定义
   */
  relations: {
    [MarqueeItem]: {
      type: 'descendant', // 关联的目标节点应为子节点
      linked: function(target) {
        let { itemHeight, ITEM_COUNT } = this.data;
        this.setData({
          ITEM_COUNT: ++ITEM_COUNT,
        }, () => {
          target.updateItemHeight(itemHeight);
          this.initSlide();
        })
      },
      unlinked: function(target) {
        let { ITEM_COUNT } = this.data;
        this.setData({
          ITEM_COUNT: --ITEM_COUNT,
        }, () => {
          this.initSlide();
        })
      }
    },
  },

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
   * @param {number} interval 过渡时间，默认为3s
   * @param {number} defaultIndex 初始化后默认的索引
   * @param {number} itemHeight 每个子节点(w-marquee-item)的高度
   * @param {number} currentIndex 设置当前的激活索引
   */
  properties: {
    interval: {
      type: Number,
      value: 3000,
    },
    defaultIndex: {
      type: Number,
      value: 0,
    },
    itemHeight: {
      type: Number,
      value: 44,
    },
    currentIndex: {
      type: Number,
      value: 0,
      observer(val) {
        if(!isNaN(val) && typeof val === 'number') {
          const { _currentIndex, ITEM_COUNT } = this.data;
          if(val === _currentIndex || val > ITEM_COUNT)return false;
          this.nextSlide(val);
          this.autoplay();
        }
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _isOnready: false,
    _containerHeight: 0,
    _styles: '',
    _currentIndex: 0,
    _autoplay: null,
    ITEM_COUNT: 0,
  },

  /**
   * 组件方法列表
   */
  methods: {
    _updateContainerHeight() {
      const {
        _isOnready
      } = this.data;
      clearInterval(_autoplay);
      if (_isOnready) {
        wx.createSelectorQuery()
          .in(this)
          .select('.wuss-marquee-slide')
          .boundingClientRect(res => {
            this.setData({
              _containerHeight: res.height,
            },() => this.initSlide())
          }).exec();
      }
    },
    initSlide() {
      const { _currentIndex, itemHeight } = this.data;
      this.setData({
        _styles: `transform: translate3d(0%,-${ itemHeight * _currentIndex }px,0);`,
      }, () => this.autoplay());
    },
    autoplay() {
      const { interval } = this.data;
      clearInterval(this.data._autoplay);
      this.setData({
        _autoplay: setInterval(() => this.nextSlide(this.data._currentIndex),interval),
      })
    },
    nextSlide(index = 1) {
      let { itemHeight, _currentIndex, ITEM_COUNT } = this.data;
      if(index > ITEM_COUNT) {debugger;}
      this.setData({
        _styles: `transform: translate3d(0%,-${ index > ITEM_COUNT ? itemHeight : itemHeight * index }px,0);`,
        _currentIndex: _currentIndex >= --ITEM_COUNT || index > ITEM_COUNT ? 0 : ++_currentIndex,
      }, () => this.triggerEvent('onChange',{ value: this.data._currentIndex },{}));
    },
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function () {},

  /**
   * 组件布局完成后执行
   */
  ready: function () {
      const { defaultIndex, ITEM_COUNT } = this.data;
      this.setData({
      _isOnready: true,
      _currentIndex: defaultIndex,
    }, () => {
      if(ITEM_COUNT >0) { this.initSlide() };
    })
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  attached: function () {},

  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
  moved: function () {},

})