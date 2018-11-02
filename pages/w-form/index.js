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
    userNameRules: {
      maxLength: {
        value: 6,
        message: '姓名最多6个字',
      },
      minLength: {
        value: 3,
        message: '姓名最少三个字',
      },
    },
    isRequired: {
      required: {
        value: true,
        message: '必填',
      },
    },
    options1: [
      {
        key: '苹果',
        value: 'iphone',
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
    items1: [
      {
        text: '复选框1',
        ...MOCK_DATA,
        checked: true,
      },
      {
        text: '复选框2',
        ...MOCK_DATA,
        checked: true,
        disabled: true,
      },
      {
        text: '复选框3',
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
