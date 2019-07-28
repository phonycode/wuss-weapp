import { registerShareEvent } from '../../common/share';


const pageOptions = {
  data: {
    dataItems: [
      {
        key: '苹果',
        value: 'iphone',
      },
      {
        key: '三星',
        disabled: true,
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
    dataItems2: ['种子轮','天使轮','A轮','B轮','C轮','D轮'],
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
}
registerShareEvent(pageOptions);

Page(pageOptions);