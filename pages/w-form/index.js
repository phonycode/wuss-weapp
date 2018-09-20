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
      mode: ['email', 'mobile', 'url'],
      regexp: {
        value: ['^琚志强$', 'g'],
        message: '必须输入琚志强作为用户名',
      },
      maxLength: {
        value: 2,
        message: '长度必须是琚志强的三分之二',
      },
    },
    items1: [
      {
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
      },
    ],
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
    cityData: [
      {
        key: '北京',
        value: '北京Beijing010',
        pinyin: 'Beijing',
        zip: '010',
      },
      {
        key: '重庆',
        value: '重庆Chongqing023',
        pinyin: 'Chongqing',
        zip: '023',
      },
      {
        key: '上海',
        value: '上海Shanghai021',
        pinyin: 'Shanghai',
        zip: '021',
      },
      {
        key: '天津',
        value: '天津Tianjin022',
        pinyin: 'Tianjin',
        zip: '022',
      },
      {
        key: '长春',
        value: '长春Changchun0431',
        pinyin: 'Changchun',
        zip: '0431',
      },
      {
        key: '长沙',
        value: '长沙Changsha0731',
        pinyin: 'Changsha',
        zip: '0731',
      },
      {
        key: '常州',
        value: '常州Changzhou0519',
        pinyin: 'Changzhou',
        zip: '0519',
      },
      {
        key: '成都',
        value: '成都Chengdu028',
        pinyin: 'Chengdu',
        zip: '028',
      },
      {
        key: '大连',
        value: '大连Dalian0411',
        pinyin: 'Dalian',
        zip: '0411',
      },
      {
        key: '东莞',
        value: '东莞Dongguan0769',
        pinyin: 'Dongguan',
        zip: '0769',
      },
      {
        key: '佛山',
        value: '佛山Foshan0757',
        pinyin: 'Foshan',
        zip: '0757',
      },
      {
        key: '福州',
        value: '福州Fuzhou0591',
        pinyin: 'Fuzhou',
        zip: '0591',
      },
      {
        key: '广州',
        value: '广州Guangzhou020',
        pinyin: 'Guangzhou',
        zip: '020',
      },
      {
        key: '贵阳',
        value: '贵阳Guiyang0851',
        pinyin: 'Guiyang',
        zip: '0851',
      },
      {
        key: '哈尔滨',
        value: '哈尔滨Haerbin0451',
        pinyin: 'Haerbin',
        zip: '0451',
      },
      {
        key: '海口',
        value: '海口Haikou0898',
        pinyin: 'Haikou',
        zip: '0898',
      },
      {
        key: '邯郸',
        value: '邯郸Handan0310',
        pinyin: 'Handan',
        zip: '0310',
      },
      {
        key: '杭州',
        value: '杭州Hangzhou0571',
        pinyin: 'Hangzhou',
        zip: '0571',
      },
      {
        key: '合肥',
        value: '合肥Hefei0551',
        pinyin: 'Hefei',
        zip: '0551',
      },
      {
        key: '惠州',
        value: '惠州Huizhou0752',
        pinyin: 'Huizhou',
        zip: '0752',
      },
      {
        key: '焦作',
        value: '焦作Jiaozuo0391',
        pinyin: 'Jiaozuo',
        zip: '0391',
      },
      {
        key: '嘉兴',
        value: '嘉兴Jiaxing0573',
        pinyin: 'Jiaxing',
        zip: '0573',
      },
      {
        key: '吉林',
        value: '吉林Jilin0423',
        pinyin: 'Jilin',
        zip: '0423',
      },
      {
        key: '济南',
        value: '济南Jinan0531',
        pinyin: 'Jinan',
        zip: '0531',
      },
      {
        key: '昆明',
        value: '昆明Kunming0871',
        pinyin: 'Kunming',
        zip: '0871',
      },
      {
        key: '兰州',
        value: '兰州Lanzhou0931',
        pinyin: 'Lanzhou',
        zip: '0931',
      },
      {
        key: '柳州',
        value: '柳州Liuzhou0772',
        pinyin: 'Liuzhou',
        zip: '0772',
      },
      {
        key: '洛阳',
        value: '洛阳Luoyang0379',
        pinyin: 'Luoyang',
        zip: '0379',
      },
      {
        key: '南昌',
        value: '南昌Nanchang0791',
        pinyin: 'Nanchang',
        zip: '0791',
      },
      {
        key: '南京',
        value: '南京Nanjing025',
        pinyin: 'Nanjing',
        zip: '025',
      },
      {
        key: '南宁',
        value: '南宁Nanning0771',
        pinyin: 'Nanning',
        zip: '0771',
      },
      {
        key: '南通',
        value: '南通Nantong0513',
        pinyin: 'Nantong',
        zip: '0513',
      },
      {
        key: '宁波',
        value: '宁波Ningbo0574',
        pinyin: 'Ningbo',
        zip: '0574',
      },
      {
        key: '青岛',
        value: '青岛Qingdao0532',
        pinyin: 'Qingdao',
        zip: '0532',
      },
      {
        key: '泉州',
        value: '泉州Quanzhou0595',
        pinyin: 'Quanzhou',
        zip: '0595',
      },
      {
        key: '沈阳',
        value: '沈阳Shenyang024',
        pinyin: 'Shenyang',
        zip: '024',
      },
    ],
    currentCity: '',
  },
  handleClick() {
    this.setData({ picker_visible: true });
  },
  handleOnSelected(e) {
    console.log(e)
    this.setData({ currentCity: e.detail.value });
  },
  handleCancel() {
    this.setData({ picker_visible: false });
  },
  wussFormSubmit(e) {
    console.log('提交了:', e.detail);
  },
  wussFormReset(e) {
    console.log('重置了:', e.detail);
  },
});
