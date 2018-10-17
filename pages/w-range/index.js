Page({
  onChange(e) {
    console.log('onChange:  ' + e.detail.value);
  },
  afterChange(e) {
    console.log('afterChange:  ' + e.detail.value);
  },
});
