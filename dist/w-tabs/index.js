/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-03 15:12:31 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-07 11:14:01
 */
const PATH = '../w-tab/index';
Component({
  externalClasses: ['wuss-class'],
  relations: {
    [PATH]: {
      type: 'descendant',
      linked(target) {
        const { tabs } = this.data;
        tabs.push({
          instance: target,
          data: target.data,
        });
        this.setData({
          tabs,
          isScroll: tabs.length > this.data.itemThreshold,
        });

        this.setTabActive();
      },

      unlinked(target) {
        const { tabs } = this.data;
        this.setData({
          tabs: tabs.filter(item => item.instance !== target),
          isScroll: tabs.length > this.data.itemThreshold,
        });
      },
    },
  },

  /**
   * 组件的属性列表
   * @param {array} tabs tab列表的数据源 参数有 text,icon,iconColor,iconSize
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
      value: '',
    },
    fixed: {
      type: Boolean,
      value: false,
    },
    itemThreshold: {
      type: Number,
      value: 4,
      observer(newValue) {
        const { tabs } = this.data;
        this.setData({
          isScroll: tabs.length > newValue,
        });
      },
    },
  },
  data: {
    scrollLeft: 0,
    tabs: [],
  },
  ready: function() {
    this.setLineStyle();
    this.computedStyles();
  },
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
        .selectAll('.tabs-item')
        .boundingClientRect()
        .exec(([rects]) => {
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
      const { borderColor } = this.data;

      this.setData({ styles: `border-bottom: 1rpx solid ${borderColor};` });
    },
    _trigger(name, index) {
      this.triggerEvent(name, {
        index,
        title: this.data.tabs[index].data.title,
      });
    },
    //设置高亮index并且触发事件
    setCurrentIndex(currentIndex) {
      if (this.data.tabs.length < currentIndex) return false;
      this._trigger('onChange', currentIndex);
      this.setTabActive();
      this.setLineStyle();
      this._scrolltoView();
    },
    //设置子组件tab
    setTabActive() {
      const { currentIndex, tabs } = this.data;

      tabs.forEach((item, index) => {
        const { mounted: Imounted, show: Ishow } = item.instance.data;
        const show = index === currentIndex;
        const data = { show };

        !Imounted && data.show && (data.mounted = true);

        if (show !== Ishow) {
          item.instance.setData(data);
        }
      });
    },
    //点击tab触发
    handleTab(e) {
      const { currentIndex, tabs } = this.data;
      const { index } = e.currentTarget.dataset;
      if (index == null || index == undefined) return false;
      if (tabs[index].data.disabled) {
        this._trigger('disabled', index);
      } else {
        this._trigger('click', index);

        if (index == currentIndex) return;
        this.setData({ currentIndex: index });
      }
    },
    //移动scroll滚动条
    _scrolltoView() {
      const { currentIndex } = this.data;
      wx.createSelectorQuery()
        .in(this)
        .select('.wuss-tabs-content')
        .boundingClientRect()
        .selectAll('.tabs-item')
        .boundingClientRect()
        .exec(([contentRect, itemRect]) => {
          const _scrollLeft = itemRect
            .slice(0, currentIndex)
            .reduce((prev, curr) => prev + curr.width, 0);
          this.setData({
            scrollLeft:
              _scrollLeft -
              (contentRect.width - itemRect[currentIndex].width) / 2, //居中展示
          });
        });
    },
  },
});
