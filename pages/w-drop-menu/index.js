// pages/w-drop-menu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataItems: [
      {
        text: '户型',
        type: 'sort',
        options: [],
      },
      {
        text: '推荐排序',
        type: 'selected',
        options: [
          {
            text: '推荐排序',
            checked: false,
          },
          {
            text: '好评优先',
            checked: false,
          },
          {
            text: '高价优先',
            checked: false,
          },
          {
            text: '低价优先',
            checked: false,
          },
          {
            text: '距离优先',
            checked: false,
          },
        ],
      },
      {
        text: '价格星级',
        type: 'selected',
        options: [
          {
            text: '快捷酒店',
            checked: false,
          },
          {
            text: '二星以下/经济型',
            checked: false,
          },
          {
            text: '三星/舒适',
            checked: false,
          },
          {
            text: '四星/高档',
            checked: false,
          },
          {
            text: '五星/豪华',
            checked: false,
          },
        ],
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  handleSelected(e) {
    console.log(e)
  },
  handleSelectedSort(e) {
    console.log(e)
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