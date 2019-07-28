
import { registerShareEvent } from '../../common/share';


const pageOptions = {

  /**
   * 页面的初始数据
   */
  data: {
    items: ['娃娃菜', "牛肉脯", "鸡柳", "酸菜鱼", "卤蛋", "鱼豆腐", "章鱼丸", "空心菜", "猪血", "番茄", "黄瓜", "鸭肠", "牛杂"],
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
}
registerShareEvent(pageOptions);

Page(pageOptions);