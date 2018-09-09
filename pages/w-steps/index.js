// pages/w-steps/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    steps: [
      {
        title: '步骤一',
        desc: '描述一',
      },
      {
        title: '步骤二',
        desc: '描述二',
      },
      {
        title: '步骤三',
        desc: '描述三',
      },
    ],
    steps2: [
      {
        title: '步骤一',
      },
      {
        title: '步骤二',
      },
      {
        title: '步骤三',
        status: 'error',
      },
    ],
  },
  setCurrent() {
    this.setData({
      current: ++this.data.current % 4,
    });
  },
  complete(e) {
    console.log('complete', e.detail.step);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
});
