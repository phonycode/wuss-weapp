// pages/w-tabs/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs1: [{
        text: '电器',
      },
      {
        text: '数码',
      },
      {
        text: '食品',
      },
      {
        text: '手机',
      }
    ],
    tabs2: [{
        text: '待付款',
        icon: 'credit-card',
        iconSize: '32rpx',
        iconColor: '#ef473a',
      },
      {
        text: '待发货',
        icon: 'inbox',
        iconSize: '32rpx',
        iconColor: '#ef473a',
      },
      {
        text: '待评价',
        icon: 'commenting',
        iconSize: '32rpx',
        iconColor: '#ef473a',
      },
      {
        text: '已完成',
        icon: 'cubes',
        iconSize: '32rpx',
        iconColor: '#ef473a',
      }
    ],
    tabs3: [{
        text: '英雄联盟',
      },
      {
        text: '绝地求生',
      },
      {
        text: 'DNF',
      },
      {
        text: '炉石传说',
      }
    ],
    tabs4: [{
        text: 'tab1',
      },
      {
        text: 'tab2',
      },
      {
        text: 'tab3',
      },
      {
        text: 'tab4',
      },
    ],
    tabs5: [{
        text: 'tab1',
      },
      {
        text: 'tab2',
      },
      {
        text: 'tab3',
      },
      {
        text: 'tab4',
      },
      {
        text: 'tab5',
      },
      {
        text: 'tab6',
      },
      {
        text: 'tab7',
      },
      {
        text: 'tab8',
      },
      {
        text: 'tab9',
      },
      {
        text: 'tab10',
      },
    ],
  },
  handleChange(e) {
    const index = e.detail.index;
    console.log(e)
  },
  handleSelected() {
    this.selectComponent('.w-tabs4').tabIndex(1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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