Page({
  data: {
    code: 'text',
  },
  onShow: function() {
    //console.log(this.selectAllComponents('.QrCode'))
  },
  handleClick() {
    const code = String(Math.random()).replace('0.', '');
    this.setData({ code });
  },
});
