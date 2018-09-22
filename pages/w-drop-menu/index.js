Page({
  data: {
    dataItems: [
      {
        text: '户型',
        type: 'sort',
        options: [],
      },
      {
        text: '推荐排序',
        type: 'selected',
        options: [
          {
            text: '推荐排序',
            checked: false,
          },
          {
            text: '好评优先',
            checked: false,
          },
          {
            text: '高价优先',
            checked: false,
          },
          {
            text: '低价优先',
            checked: false,
          },
          {
            text: '距离优先',
            checked: false,
          },
        ],
      },
      {
        text: '价格星级',
        type: 'selected',
        options: [
          {
            text: '快捷酒店',
            checked: false,
          },
          {
            text: '二星以下/经济型',
            checked: false,
          },
          {
            text: '三星/舒适',
            checked: false,
          },
          {
            text: '四星/高档',
            checked: false,
          },
          {
            text: '五星/豪华',
            checked: false,
          },
        ],
      },
    ],
  },
  handleSelected(e) {
    console.log(e);
  },
  handleSelectedSort(e) {
    console.log(e);
  },
});
