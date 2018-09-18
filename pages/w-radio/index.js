// pages/w-radio/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataItems: [{
        key: 'phone',
        value: '苹果',
      },
      {
        key: 'sanxing',
        value: '三星',
      },
      {
        key: 'huawei',
        value: '华为',
      },
      {
        key: 'oppo',
        value: 'oppo音乐手机',
      },
    ],
    radioModel: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  handleonChange(e) {
    console.log(e)
  },
  handleChange(e) {
    const { value } = e.target.dataset;
    this.setData({ radioModel: value })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});