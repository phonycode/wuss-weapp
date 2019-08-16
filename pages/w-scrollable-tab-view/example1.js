import { registerShareEvent } from '../../common/share';
import { Loading } from '../../dist/index';
// pages/w-scrollable-tab-view/index.js
const pageOptions = {

  /**
   * 页面的初始数据
   */
  data: {
    options: [
      '关注',
      '推荐',
      '热榜',
      '视频',
    ],
    dataListView: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const dataListView = [];
    for (let i = 1; i <= 20; i++) {
      dataListView.push({
        content: `列表 ${i}`,
        label: `第${i}个描述`,
      })
    }
    this.setData({ dataListView })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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

  handleLoadmore() {
    Loading.show({
      content: '正在加载...',
    });
    const { dataListView } = this.data;
    const len = dataListView.length;
    for (let i = 0; i < 10; i++) {
      dataListView.push({
        content: `列表 ${len + i}`,
        label: `第${len + i}个描述`,
      })
    }
    this.setData({ dataListView }, () => setTimeout(() => {
      Loading.hide();
    }, 500));
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}

registerShareEvent(pageOptions);

Page(pageOptions);