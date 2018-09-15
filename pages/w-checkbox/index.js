// pages/w-checkbox/index.js
const MOCK_DATA = {
  productName: 'iphone X max',
  total: 1,
  num: 642135,
  id: 2143324234,
  price: 12700.0,
  desc: 'iphone is good',
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    items1Str: '',
    items1: [
      {
        label: '复选框1',
        ...MOCK_DATA,
      },
      {
        label: '复选框2',
        ...MOCK_DATA,
      },
      {
        label: '复选框3',
        ...MOCK_DATA,
      },
    ],
    items2: [
      {
        label: '复选框1',
        ...MOCK_DATA,
      },
      {
        label: '复选框2',
        ...MOCK_DATA,
        disabled: true,
      },
      {
        label: '复选框3',
        ...MOCK_DATA,
      },
    ],
  },
  handleChange(e) {
    this.setData({ items1Str: JSON.stringify(e.detail.checked) });
  },
});
