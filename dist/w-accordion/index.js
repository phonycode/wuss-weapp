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
    height: 'height:0px',
    zeroHeight: '',
  },
  ready() {
    wx.createSelectorQuery()
      .in(this)
      .select('.wuss-accordion--content')
      .boundingClientRect()
      .exec(rect => {
        this.setData({
          height: `height:${rect[0].height}px`,
          zeroHeight: 'height:0px',
        });
      });
  },
  methods: {
    onTap() {
      const { index, disabled } = this.data;
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
