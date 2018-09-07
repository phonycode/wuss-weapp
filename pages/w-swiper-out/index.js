// pages/w-swiper-out/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btns1: [{
      text: '添加',
      color: '#ffffff',
      background: '#28a745',
      disabled: false,
      size: '14px',
      type: 'added',
    }, {
      text: '删除',
      color: '#ffffff',
      background: '#e42112',
      disabled: false,
      size: '14px',
      type: 'delete',
    }],
    btns2: [{
      text: '添加',
      color: '#ffffff',
      background: '#28a745',
      disabled: false,
      size: '14px',
      type: 'added',
    },{
      text: '编辑',
      color: '#ffffff',
      background: '#ff8800',
      disabled: false,
      size: '14px',
      type: 'edit',
    }, {
      text: '删除',
      color: '#ffffff',
      background: '#e42112',
      disabled: false,
      size: '14px',
      type: 'delete',
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  added() {
    wx.showModal({
      title: '提示',
      content: 'added',
      showCancel: false,
    });
  },
  delete() {
    wx.showModal({
      title: '提示',
      content: 'delete',
      showCancel: false,
    });
  },
  edit() {
    wx.showModal({
      title: '提示',
      content: 'edit',
      showCancel: false,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  handleBtnClick(e) {
    const {
      onPress
    } = e.detail;
    onPress.call(this)
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