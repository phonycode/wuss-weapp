// pages/w-radio/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataItems: [{
        key: '苹果',
        value: 'iphone',
      },
      {
        key: '三星',
        value: 'sanxing',
      },
      {
        key: '华为',
        value: 'huawei',
      },
      {
        key: 'oppo音乐手机',
        value: 'oppo',
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
    const {
      value
    } = e.target.dataset;
    this.setData({
      radioModel: value
    })
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