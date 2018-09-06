/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-03 15:12:31 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-06 18:31:37
 */
Component({
  externalClasses: ['wuss-class'],
  relations: {
    '../w-tab/index': {
      type: 'descendant',
      linked(target) {
        const { tabs, itemThreshold } = this.data;
        tabs.push({
          instance: target,
          data: target.data,
        });
        this.setData({
          tabs,
          isScroll: tabs.length > itemThreshold,
        });
        this.setTabActive();
      },

      unlinked(target) {
        const { tabs, itemThreshold } = this.data;
        this.setData({
          tabs: tabs.filter(item => item.instance !== target),
          isScroll: tabs.length > itemThreshold,
        });
      },
    },
  },

  /**
   * 组件选项
   */
  options: {},

  /**
   * 组件的属性列表
   * @param {array} tabs tab列表的数据源 参数有 text,icon,iconColor,iconSize
   * @param {number} currentIndex  设置当前初始化索引
   * @param {number} activeIndex  可控索引
   * @param {boolean} transition 是否开启过渡动画
   * @param {string} line 是否开启线条
   * @param {number} margin 设置两边 边距
   * @param {number} lineSize 线条长度大小 0 - 1
   * @param {string} border 开启线条
   * @param {string} borderSize 线条粗细
   * @param {string} borderColor 线条颜色
   * @param {string} activeColor 颜色
   * @param {string} textStyles 文本样式
   * @param {boolean} fixed 是否开启定位
   */
  properties: {
    // activeIndex: Number,
    currentIndex: {
      type: Number,
      value: 0,
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
    margin: {
      type: Number,
      value: 0,
      observer: 'computedStyles',
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
      value: '2px',
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
  methods: {
    setLineStyle() {
      const {
        tabs,
        lineSize,
        activeColor,
        currentIndex,
        transition,
        margin,
        borderSize,
        isScroll,
        width,
      } = this.data;
      // wx.createSelectorQuery()
      //   .in(this)
      //   .select('.tabs-item');

      // let tabWidth = 0;

      // let left = tabWidth * currentIndex + (tabWidth - tabWidth * lineSize) / 2;
      // let lineStyles = '';
      // lineStyles +=
      //   `width: ${tabWidth * lineSize}px;` +
      //   `height: ${
      //     borderSize.indexOf('px') > -1 ? borderSize : borderSize + 'px'
      //   };` +
      //   `transform: translate3d(${left}px,0,0);` +
      //   `background-color: ${activeColor};` +
      //   `${!transition ? 'transition: none;' : ''}`;

      // this.setData({ lineStyles });
    },
    computedStyles() {
      const { borderColor, margin } = this.data;
      let styles = '';
      styles +=
        `border-bottom: 1rpx solid ${borderColor};` +
        `margin: 0 ${margin + 'px'};`;
      this.setData({
        styles,
      });
    },
    _trigger(name, index) {
      this.triggerEvent(name, {
        index,
        title: this.data.tabs[index].data.title,
      });
    },
    //设置高亮index并且触发事件
    setCurrentIndex(currentIndex) {
      const { currentIndex: lastCurrentIndex } = this.data;
      if (currentIndex == lastCurrentIndex) return;

      this._trigger('onChange', currentIndex);
      this.setData({ currentIndex });
      this.setTabActive();
      this.setLineStyle();
      this._scrolltoView();
    },
    //设置子组件tab
    setTabActive() {
      const { currentIndex, tabs } = this.data;
      
      tabs.forEach((item, index) => {
        const show = index === currentIndex;
        const data = { show };

        data.show && (data.mounted = true);

      if (show !== item.instance.data.show) {
        console.log(data);
        
          item.instance.setData(data);
        }
      });
    },
    //点击tab触发
    handleTab(e) {
      const { index } = e.currentTarget.dataset;
      if (index == null || index == undefined) return false;
      if (this.data.tabs[index].data.disabled) {
        this._trigger('disabled', index);
      } else {
        this._trigger('click', index);
        // 设置高亮Index
        this.setCurrentIndex(index);
      }
    },
    //移动scroll滚动条
    _scrolltoView(index) {
      // wx.createSelectorQuery()
      //   .in(this)
      //   .select('#wuss-scroll-view')
      //   .boundingClientRect()
      //   .select(`#item${index}`)
      //   .boundingClientRect()
      //   .exec(([scrollRect, itemRect]) => {
      //     this.setData({
      //       scrollLeft:0
      //     });
      //   });
    },
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function() {},

  /**
   * 组件布局完成后执行
   */
  ready: function() {
    this.setLineStyle();
    this.computedStyles();
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  attached: function() {},

  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
  moved: function() {},
});
