Page({
  data: {
    dataItems: [
      {
        key: '苹果',
        value: 'iphone',
      },
      {
        key: '三星',
        value: 'sanxing',
      },
      {
        key: '华为',
        value: 'huawei',
      },
      {
        key: 'oppo音乐手机',
        value: 'oppo',
      },
    ],
    radioModel: '',
  },
  handleonChange(e) {
    console.log(e);
  },
  handleChange(e) {
    const { value } = e.target.dataset;
    this.setData({
      radioModel: value,
    });
  },
});
