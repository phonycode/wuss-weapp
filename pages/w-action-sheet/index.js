// pages/w-action-sheet/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    items1: [
      {
        text: '分享给朋友',
        type: 'share',
      },
      {
        text: '分享到朋友圈',
        type: 'shareTimeLine',
      },
    ],
    items2: [
      {
        text: '分享给朋友',
        type: 'share',
        icon: 'forward-o',
      },
      {
        text: '分享到朋友圈',
        type: 'shareTimeLine',
        icon: 'share',
      },
    ],
    items3: [
      {
        text: '分享给朋友',
        type: 'share',
        icon: 'forward-o',
      },
      {
        text: '分享到朋友圈',
        type: 'shareTimeLine',
        icon: 'share',
      },
    ],
    items4: [
      {
        text: '分享给朋友',
        type: 'share',
        icon: 'forward-o',
      },
      {
        text: '分享到朋友圈',
        type: 'shareTimeLine',
        icon: 'share',
      },
    ],
    items5: [
      {
        text: '分享给朋友',
        type: 'share',
        icon: 'forward-o',
      },
      {
        text: '分享到朋友圈',
        type: 'shareTimeLine',
        icon: 'share',
      },
    ],
    items6: [
      {
        text: '分享给朋友',
        type: 'share',
      },
      {
        text: '分享到朋友圈',
        type: 'shareTimeLine',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleClick(e) {
    const key = e.currentTarget.dataset.key;
    const item = e.detail;
    if(key == 6) {
      this.setData({
        [`items${key}[${item.key}].loading`]: true,
      },() => {
        setTimeout(() => {
          this.setData({
            [`items${key}[${item.key}].loading`]: false,
            [`visible${key}`]: false,
          })
        }, 2000);
      })
    } else {
      this.setData({
        [`visible${key}`]: false,
      })
    }
  },
  handleClose(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ [`visible${key}`]: false })
  },
  handleShow(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ [`visible${key}`]: true })
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