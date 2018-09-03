// pages/w-popup/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popup1: false,
    popup2: false,
    popup3: false,
    popup4: false,
    popup5: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  handleClose() {
    this.setData({
      popup1: false,
      popup2: false,
      popup3: false,
      popup4: false,
      popup5: false,
    })
  },
  handleClick1() {
    this.setData({ popup1: true })
  },
  handleClick2() {
    this.setData({ popup2: true })
  },
  handleClick3() {
    this.setData({ popup3: true })
  },
  handleClick4() {
    this.setData({ popup4: true })
  },
  handleClick5() {
    this.setData({ popup5: true })
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