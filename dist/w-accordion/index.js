const PATH = '../w-accordion-group/index';
Component({
  externalClasses: ['wuss-class'],
  relations: {
    [PATH]: { type: 'parent' },
  },
  properties: {
    key: null,
    title: String,
    disabled: Boolean,
  },
  data: {
    current: false,
    index: 0,
    height: '',
  },
  ready() {
    wx.createSelectorQuery()
      .in(this)
      .select('.wuss-accordion--content')
      .boundingClientRect()
      .exec(rect => {
        console.log(rect[0].height);
        // this.setData({ _height: rect[0].height, height: `height:0px` });
      });
  },
  methods: {
    changeCurrent(e) {
      console.log(e);

      if (e) {
        console.log(this.data._height);
        this.setData({
          height: `height:${this.data._height}px`,
        });
      } else {
        this.setData({
          height: `height:0px`,
        });
      }
    },
    onTap() {
      const { index, disabled, key } = this.data;
      const parent = this.getRelationNodes(PATH)[0];
      if (parent) {
        if (disabled) {
          parent.clickDisabledItem(index);
        } else {
          parent.clickItem(index);
        }
      }
    },
  },
});
