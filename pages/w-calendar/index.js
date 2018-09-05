/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-01 13:25:28 
 * @Last Modified by:   Github.Caitingwei[https://github.com/Caitingwei] 
 * @Last Modified time: 2018-09-01 13:25:28 
 */
// pages/w-calendar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible1: false,
    visible2: false,
    visible3: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  handleClick1() {
    this.setData({ visible1: !this.data.visible1 })
  },
  handleClick2() {
    this.setData({ visible2: !this.data.visible2 })
  },
  handleClick3() {
    this.setData({ visible3: !this.data.visible3 })
  },
  handleCancel() {
    this.setData({
      visible1: false,
      visible2: false,
      visible3: false,
    })
  },
  handleSelected(date) {
    const {
      detail: {
        checkInDate,
        checkOutDate,
        checkTotalDay,
      },
    } = date;
    wx.showModal({
      title: '提示',
      content: `您选择了 入住日期:${checkInDate}，离店日期:${checkOutDate},总天数:${checkTotalDay}`,
      showCancel: false,
    });
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