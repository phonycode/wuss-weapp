// pages/w-checkbox/index.js
const MOCK_DATA = {
  productName: 'iphone X max',
  total: 1,
  num: 642135,
  id: 2143324234,
  price: 12700.00,
  desc: 'iphone is good',
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        label: '复选框1',
        ...MOCK_DATA,
      },
      {
        label: '复选框2',
        ...MOCK_DATA,
      },
      {
        label: '复选框3',
        ...MOCK_DATA,
      },
      {
        label: '复选框4',
        ...MOCK_DATA,
      },
      {
        label: '复选框5',
        ...MOCK_DATA,
      },
      {
        label: '复选框6',
        ...MOCK_DATA,
      },
      {
        label: '复选框7',
        ...MOCK_DATA,
      },
      {
        label: '复选框8',
        ...MOCK_DATA,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleChange(e) {
    console.log(e.detail.checked)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})