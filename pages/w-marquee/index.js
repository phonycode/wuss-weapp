import { registerShareEvent } from '../../common/share';

const pageOptions = {

  /**
   * 页面的初始数据
   */
  data: {
    arr: [
      {
        title: '廊坊发生刑事案件',
        url: 'xxxx',
        imgSrc: 'http://img5.imgtn.bdimg.com/it/u=2918240254,2454690875&fm=26&gp=0.jpg',
      },
      {
        title: '小伙四万网购奔驰',
        url: 'xxxx',
        imgSrc: 'http://img3.imgtn.bdimg.com/it/u=3013567159,2250112086&fm=26&gp=0.jpg',
      },
      {
        title: '家人去世请假被拒',
        url: 'xxxx',
        imgSrc: 'http://img5.imgtn.bdimg.com/it/u=180988904,275450817&fm=26&gp=0.jpg',
      },
      {
        title: '于正秒删',
        url: 'xxxx',
        imgSrc: 'http://img2.imgtn.bdimg.com/it/u=1094944933,4065700883&fm=26&gp=0.jpg',
      },
      {
        title: '岳华去世',
        url: 'xxxx',
        imgSrc: 'http://img1.imgtn.bdimg.com/it/u=822102141,3878875172&fm=26&gp=0.jpg',
      },
      {
        title: '美将退出中导条约',
        url: 'xxxx',
        imgSrc: 'http://img4.imgtn.bdimg.com/it/u=1828593470,806721422&fm=26&gp=0.jpg',
      },
      {
        title: '范丞丞悼念粉丝',
        url: 'xxxx',
        imgSrc: 'http://img4.imgtn.bdimg.com/it/u=3939936779,946895769&fm=26&gp=0.jpg',
      },
      {
        title: '梅西骨折',
        url: 'xxxx',
        imgSrc: 'http://img4.imgtn.bdimg.com/it/u=3830398842,3489851318&fm=26&gp=0.jpg',
      },
      {
        title: '女子踩到男子',
        url: 'xxxx',
        imgSrc: 'http://img3.imgtn.bdimg.com/it/u=3348027003,368668260&fm=26&gp=0.jpg',
      },
      {
        title: '福原爱宣布退役',
        url: 'xxxx',
        imgSrc: 'http://img1.imgtn.bdimg.com/it/u=440375388,3364532017&fm=26&gp=0.jpg',
      },
      {
        title: '郭炳湘病逝',
        url: 'xxxx',
        imgSrc: 'http://img4.imgtn.bdimg.com/it/u=3133605357,944042545&fm=26&gp=0.jpg',
      },
    ],
    currentIndex: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  handleClick1() {
    this.setData({
      arr: this.data.arr.concat({
        title: '我是新添加的数据',
        url: 'new url',
        imgSrc: 'http://img4.imgtn.bdimg.com/it/u=3133605357,944042545&fm=26&gp=0.jpg',
      },)
    })
  },
  handleClick2() {
    this.setData({
      currentIndex: 8,
    })
  },
  handleClick3() {
    this.setData({
      currentIndex: 1,
    })
  },
  handleClick4() {
    this.setData({
      currentIndex: this.data.currentIndex >= this.data.arr.length-1 ? 0 : this.data.currentIndex+=1,
    })
  },
  handleChange(e) {
    this.setData({
      currentIndex: e.detail.value,
    })
  },
  handleChange(e) {
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
}
registerShareEvent(pageOptions);

Page(pageOptions);
