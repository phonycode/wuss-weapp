import { registerShareEvent } from '../../common/share';


const pageOptions = {

  /**
   * 页面的初始数据
   */
  data: {
    src: 'https://ws1.sinaimg.cn/large/663d3650gy1fq684go3glj203m01hmwy.jpg',
    flag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleChange() {
    this.setData({
      src: this.data.flag ? 'http://img5.imgtn.bdimg.com/it/u=3224070611,1493841838&fm=26&gp=0.jpg' : 'https://ws1.sinaimg.cn/large/663d3650gy1fq684go3glj203m01hmwy.jpg',
      flag: !this.data.flag,
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
}
registerShareEvent(pageOptions);

Page(pageOptions);