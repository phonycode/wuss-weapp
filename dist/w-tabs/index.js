/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-03 15:12:31 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2019-01-26 15:56:17
 */
import WussComponent from '../common/extends/baseComponent';

WussComponent({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class-item'],

  /**
   * 组件间关系定义
   */
  relations: {},


  /**
   * 组件的属性列表
   */
  /**
   * 组件的属性列表
   * @param {array} options tab列表的数据源 参数有 text,icon,iconColor,iconSize,支持 array-keys形式
   * @param {number} currentIndex  初始化或者控制索引
   * @param {boolean} transition 是否开启过渡动画
   * @param {string} line 是否开启线条
   * @param {number} duration 设置动画时长 单位s
   * @param {number} lineSize 线条长度大小 0 - 1
   * @param {string} border 开启线条
   * @param {string} borderSize 线条粗细 单位px
   * @param {string} borderColor 线条颜色
   * @param {string} activeColor 颜色
   * @param {string} textStyles 文本样式
   * @param {boolean} fixed 是否开启定位
   */
  properties: {
    options: {
      type: Array,
      value: [],
      observer(v) {
        this.setData({
          isScroll: v.length > this.data.itemThreshold,
        });
      },
    },
    currentIndex: {
      type: Number,
      value: 0,
      observer: 'setCurrentIndex',
    },
    transition: {
      type: Boolean,
      value: true,
    },
    line: {
      type: Boolean,
      value: true,
    },
    lineSize: {
      type: Number,
      value: 0.5,
    },
    border: {
      type: Boolean,
      value: true,
    },
    borderColor: {
      type: String,
      value: '#eeeeee',
      observer: 'computedStyles',
    },
    borderSize: {
      type: String,
      value: '2',
    },
    duration: {
      type: Number,
      value: 0.2,
    },
    activeColor: {
      type: String,
      value: 'rgb(69, 143, 246)',
    },
    textStyles: {
      type: String,
    },
    fixed: {
      type: Boolean,
      value: false,
    },
    itemThreshold: {
      type: Number,
      value: 4,
      observer(newValue) {
        const {
          options
        } = this.data;
        this.setData({
          isScroll: options.length > newValue,
        });
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件方法列表
   */
  methods: {
    setLineStyle() {
      const {
        activeColor,
        currentIndex,
        lineSize,
        transition,
        borderSize,
        duration,
      } = this.data;
      wx.createSelectorQuery()
        .in(this)
        .selectAll('.wuss-tabs-item')
        .boundingClientRect()
        .exec(([rects]) => {
          if (!Array.prototype.toString.call(rects)) return false;
          const currentRect = rects[currentIndex];

          let left = rects
            .slice(0, currentIndex)
            .reduce((prev, curr) => prev + curr.width, 0);
          left += (currentRect.width - currentRect.width) / 2;
          left += (currentRect.width * (1 - lineSize)) / 2;

          this.setData({
            lineStyles: `
                        width: ${currentRect.width * lineSize}px;
                        height:${borderSize}px;
                        background-color: ${activeColor};
                        transform: translate3d(${left}px,0,0);
                        ${!transition ? 'transition: none;' : ''}
                        transition-duration: ${duration}s;
                      `,
          });
        });
    },
    computedStyles() {
      const {
        borderColor
      } = this.data;

      this.setData({
        styles: `border-bottom: 1rpx solid ${borderColor};`
      });
    },
    _trigger(name, value) {
      this.triggerEvent(name, {
        value,
        title: this.data.options[value].title,
      });
    },
    //设置高亮index并且触发事件
    setCurrentIndex(currentIndex) {
      if (this.data.options.length < currentIndex) return false;
      // this._trigger('onChange', currentIndex);
      this.setLineStyle();
      this._scrolltoView();
    },
    //点击tab触发
    handleTab(e) {
      const {
        currentIndex,
        options
      } = this.data;
      const {
        index
      } = e.currentTarget.dataset;
      if (index == null || index == undefined) return false;
      if (options[index].disabled) {
        this._trigger('disabled', index);
      } else {
        this._trigger('onChange', index);

        if (index == currentIndex) return;
        this.setData({
          currentIndex: index
        });
      }
    },
    //移动scroll滚动条
    _scrolltoView() {
      const {
        currentIndex
      } = this.data;
      wx.createSelectorQuery()
        .in(this)
        .select('.wuss-tabs-content')
        .boundingClientRect()
        .selectAll('.wuss-tabs-item')
        .boundingClientRect()
        .exec(([contentRect, itemRect]) => {
          if (!Array.prototype.toString.call(itemRect)) return false;
          const _scrollLeft = itemRect
            .slice(0, currentIndex)
            .reduce((prev, curr) => prev + curr.width, 0);
          this.setData({
            scrollLeft: _scrollLeft -
              (contentRect.width - itemRect[currentIndex].width) / 2, //居中展示
          });
        });
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
    const {
      options
    } = this.data;
    const _isArrayObject = this.isArrayObject(options);
    if (!_isArrayObject) {
      const newOptions = options.map(text => Object.assign({
        text
      }, {}));
      this.setData({
        options: newOptions,
      })
    };
    this.setLineStyle();
    this.computedStyles();
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