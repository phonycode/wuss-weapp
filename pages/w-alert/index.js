/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-10 15:51:06 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-19 09:20:34
 */
import { Alert } from '../../dist/common/index';

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  handleClick() {
    Alert({
      title: '提示',
      content: 'wuss weapp is good',
      confirm: () => {
        console.log('ok');
      },
    });
  },
  handleClick2() {
    Alert({
      title: 'ButtonColor',
      content: '按钮字体颜色是#28a2f3',
      buttonColor: '#28a2f3',
    });
  },
  handleClick3() {
    Alert({
      title: 'MoreText',
      content:
        '更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字更多文字',
    });
  },
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
