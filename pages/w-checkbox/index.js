const MOCK_DATA = {
  productName: 'iphone X max',
  total: 1,
  num: 642135,
  id: 2143324234,
  price: 12700.0,
  desc: 'iphone is good',
};

import { registerShareEvent } from '../../common/share';

const pageOptions = {
  data: {
    items1Str: '',
    items1: [
      {
        text: '复选框1',
        ...MOCK_DATA,
      },
      {
        text: '复选框2',
        ...MOCK_DATA,
      },
      {
        text: '复选框3',
        ...MOCK_DATA,
      },
    ],
    items2: [
      {
        text: '复选框1',
        ...MOCK_DATA,
      },
      {
        text: '复选框2',
        ...MOCK_DATA,
        disabled: true,
      },
      {
        text: '复选框3',
        ...MOCK_DATA,
      },
    ],
    items3: ['测试1','测试2','测试3','测试4','测试5'],
  },
  handleChange(e) {
    console.log(e.detail.value)
    this.setData({ items1Str: JSON.stringify(e.detail.value) });
  },
};

registerShareEvent(pageOptions);

Page(pageOptions);

