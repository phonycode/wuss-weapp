Page({
  data: {
    value: false,
  },
  handleChange(e) {
    console.log(e);
    this.setData({ value: e.detail.value });
  },
});
