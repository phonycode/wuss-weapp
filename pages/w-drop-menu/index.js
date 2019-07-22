import { registerShareEvent } from '../../common/share';


const pageOptions = {
  data: {
    options: [{
        text: '最高评分',
        type: 'sort',
      },
      {
        text: '风格',
        type: 'radio',
        options: [{
            text: '全部',
          },
          {
            text: '原创',
          },
          {
            text: '漫改',
            checked: true,
          },
          {
            text: '轻改',
          },
          {
            text: '游戏改',
          },
          {
            text: '动态漫',
          },
          {
            text: '布袋戏',
          },
          {
            text: '热血',
          },
          {
            text: '奇幻',
          },
          {
            text: '战斗',
          },
          {
            text: '搞笑',
          },
          {
            text: '日常',
          },
          {
            text: '科幻',
          },
          {
            text: '萌系',
          },
          {
            text: '治愈',
          },
          {
            text: '校园',
          },
        ],
      },
      {
        text: '类型',
        type: 'checkbox',
        options: [{
            text: '国产',
          },
          {
            text: '正片',
          },
          {
            text: '剧场版',
          },
          {
            text: '日本动漫',
            checked: true,
          },
          {
            text: '其他',
          },
        ],
      },
      {
        text: '筛选',
        type: 'filter',
        slotName: 'filter',
        highlight: false,
      },
    ],
    radioOptions: ["全部", "正片", "剧场版", "其他"],
    checkboxOptions: ["免费","付费","大会员"],
  },
  handleClick() {
    this.setData({
      [`options[3].show`]: false,
      [`options[3].highlight`]: true,
    });
  },
  handleChange(e) {
    console.log(e);
  },
}
registerShareEvent(pageOptions);

Page(pageOptions);