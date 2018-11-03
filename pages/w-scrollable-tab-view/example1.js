// pages/w-scrollable-tab-view/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    options1: ['关注','推荐','热榜','视频'],
    options: [
      {
        containerName: '关注',
      },
      {
        containerName: '推荐',
      },
      {
        containerName: '热榜',
      },
      {
        containerName: '视频',
      },
    ],
    pageHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  handleScrollableChange(e) {
    this.setData({
      currentIndex: e.detail.value,
    })
  },
  handleChange(e) {
    this.setData({
      currentIndex: e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.createSelectorQuery()
    .select('.w-scrollable-tab-view-bar')
    .boundingClientRect()
    .exec(([node]) => {
      console.log(node.height,wx.getSystemInfoSync())
      this.setData({
        pageHeight: wx.getSystemInfoSync().windowHeight - node.height,
      })
    })
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