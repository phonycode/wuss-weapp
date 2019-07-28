import { registerShareEvent } from '../../common/share';

import {
  CountUp
} from '../../dist/index';

const pageOptions = {

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    count2: 0,
    count3: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleSubmit(e) {
    const { startVal = 0 , endVal = 3000, decimals = 0, duration = 3000 } = e.detail;
    this.setData({
      count: 0
    } , () => {
      new CountUp(startVal, endVal, decimals, duration, count => this.setData({
        count
      })).start()
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
    new CountUp(0, 3000, 0, 3, count => this.setData({
      count
    })).start();
    new CountUp(1000, 2333.33, 2, 5, count2 => this.setData({
      count2
    })).start();
    new CountUp(666, 66666.6666, 4, 6, count3 => this.setData({
      count3
    })).start();
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
};


registerShareEvent(pageOptions);

Page(pageOptions);
