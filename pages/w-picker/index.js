// pages/w-picker/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    items: [
      {
        text: '测试数据1',
        value: 'key1',
      },
      {
        text: '测试数据2',
        value: 'key2',
      },
      {
        text: '测试数据3',
        value: 'key3',
      },
      {
        text: '测试数据4',
        value: 'key4',
      },
      {
        text: '测试数据5',
        value: 'key5',
      },
      {
        text: '测试数据6',
        value: 'key6',
      },
      {
        text: '测试数据7',
        value: 'key7',
      },
      {
        text: '测试数据8',
        value: 'key8',
      },
      {
        text: '测试数据9',
        value: 'key9',
      },
      {
        text: '测试数据10',
        value: 'key10',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleSelect(e) {
    this.setData({
      string: JSON.stringify(e.detail),
    })
  },

  handleChange(e) {
    this.setData({
      sync_string: JSON.stringify(e.detail),
    })
  },
  handleClick() {
    this.setData({
      visible: true
    })
  },
  handleCancel() {
    this.setData({
      visible: false
    })
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