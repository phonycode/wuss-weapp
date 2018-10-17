Component({
  externalClasses: ['wuss-class'],

  options: {
    addGlobalClass: true,
  },

  relations: {},

  options: {},

  properties: {
    disabled: Boolean,
    max: {
      type: Number,
      value: 100,
    },
    min: {
      type: Number,
      value: 0,
    },
    step: {
      type: Number,
      value: 1,
    },
    value: {
      type: Array,
      value: [25, 75],
    },
    trackStyle: {
      type: String,
      value: '',
    },
    railStyle: {
      type: String,
      value: '',
    },
    handleStyle: {
      type: Array,
      value: ['', ''],
    },
  },
  data: {
    _trackStyle: '',
    _handleStyle: '',
  },
  methods: {
    onTouchStart(e) {
      const { disabled, value } = this.data;
      if (disabled) return;
      this.startX = e.touches[0].clientX;
      this.startValue = value[e.currentTarget.dataset.moveNode];
    },
    onTouchMove(e) {
      const { disabled, value } = this.data;
      if (disabled) return;
      const diffClientX = e.touches[0].clientX - this.startX;
      wx.createSelectorQuery()
        .in(this)
        .select('.wuss-slider')
        .boundingClientRect(rect => {
          value[e.currentTarget.dataset.moveNode] =
            this.startValue + (diffClientX / rect.width) * 100;
          this.updateStyle(value);
        })
        .exec();
    },
    onTouchEnd() {
      const { disabled, value } = this.data;
      if (disabled) return;
      this.triggerEvent('afterChange', { value });
    },
    updateStyle(value, start) {
      const { trackStyle = '', handleStyle } = this.data;
      value[0] = this.formatValue(value[0]);
      value[1] = this.formatValue(value[1]);
      const [handleStyle0 = '', handleStyle1 = ''] = handleStyle;
      this.setData({
        value,
        _trackStyle:
          trackStyle +
          `left:${Math.min(...value)}%;width:${Math.max(...value) -
            Math.min(...value)}%`,
        _handleStyle: [
          handleStyle0 + `left:${value[0]}%;`,
          handleStyle1 + `left:${value[1]}%;`,
        ],
      });
      if (!start) this.triggerEvent('onChange', { value });
    },
    formatValue(value) {
      const { max, min, step } = this.data;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    },
  },

  ready() {
    this.updateStyle(this.data.value, true);
  },
});
