// pages/w-form/index.js
const MOCK_DATA = {
  productName: 'iphone X max',
  total: 1,
  num: 642135,
  id: 2143324234,
  price: 12700.0,
  desc: 'iphone is good',
};
Page({
  data: {
    items1: [
      {
        label: '复选框1',
        ...MOCK_DATA,
        checked: true,
      },
      {
        label: '复选框2',
        ...MOCK_DATA,
        checked: true,
        disabled: true,
      },
      {
        label: '复选框3',
        ...MOCK_DATA,
      },
    ],
  },
  wussFormSubmit(e) {
    console.log('提交了:', e.detail);
  },
  wussFormReset(e) {
    console.log('重置了:', e.detail);
  },
});
