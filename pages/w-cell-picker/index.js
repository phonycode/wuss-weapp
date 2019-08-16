import { registerShareEvent } from "../../common/share";

const pageOptions = {
  data: {
    options1: [
      [
        {
          key: "北京市",
          value: "110000"
        },
        {
          key: "广东省",
          value: "440000"
        }
      ],
      [
        {
          key: "市辖区",
          value: "110100",
          parent: "110000"
        },
        {
          key: "广州市",
          value: "440100",
          parent: "440000"
        },
        {
          key: "韶关市",
          value: "440200",
          parent: "440000"
        }
      ],
      [
        {
          key: "东城区",
          value: "110101",
          parent: "110100"
        },
        {
          key: "西城区",
          value: "110102",
          parent: "110100"
        },
        {
          key: "朝阳区",
          value: "110105",
          parent: "110100"
        },
        {
          key: "丰台区",
          value: "110106",
          parent: "110100"
        },
        {
          key: "石景山区",
          value: "110107",
          parent: "110100"
        },
        {
          key: "海淀区",
          value: "110108",
          parent: "110100"
        },
        {
          key: "门头沟区",
          value: "110109",
          parent: "110100"
        },
        {
          key: "房山区",
          value: "110111",
          parent: "110100"
        },
        {
          key: "通州区",
          value: "110112",
          parent: "110100"
        },
        {
          key: "顺义区",
          value: "110113",
          parent: "110100"
        },
        {
          key: "昌平区",
          value: "110114",
          parent: "110100"
        },
        {
          key: "大兴区",
          value: "110115",
          parent: "110100"
        },
        {
          key: "怀柔区",
          value: "110116",
          parent: "110100"
        },
        {
          key: "平谷区",
          value: "110117",
          parent: "110100"
        },
        {
          key: "密云区",
          value: "110118",
          parent: "110100"
        },
        {
          key: "延庆区",
          value: "110119",
          parent: "110100"
        },
        {
          key: "荔湾区",
          value: "440103",
          parent: "440100"
        },
        {
          key: "越秀区",
          value: "440104",
          parent: "440100"
        },
        {
          key: "海珠区",
          value: "440105",
          parent: "440100"
        },
        {
          key: "天河区",
          value: "440106",
          parent: "440100"
        },
        {
          key: "白云区",
          value: "440111",
          parent: "440100"
        },
        {
          key: "黄埔区",
          value: "440112",
          parent: "440100"
        },
        {
          key: "番禺区",
          value: "440113",
          parent: "440100"
        },
        {
          key: "花都区",
          value: "440114",
          parent: "440100"
        },
        {
          key: "南沙区",
          value: "440115",
          parent: "440100"
        },
        {
          key: "从化区",
          value: "440117",
          parent: "440100"
        },
        {
          key: "增城区",
          value: "440118",
          parent: "440100"
        },
        {
          key: "武江区",
          value: "440203",
          parent: "440200"
        },
        {
          key: "浈江区",
          value: "440204",
          parent: "440200"
        },
        {
          key: "曲江区",
          value: "440205",
          parent: "440200"
        },
        {
          key: "始兴县",
          value: "440222",
          parent: "440200"
        },
        {
          key: "仁化县",
          value: "440224",
          parent: "440200"
        },
        {
          key: "翁源县",
          value: "440229",
          parent: "440200"
        },
        {
          key: "乳源瑶族自治县",
          value: "440232",
          parent: "440200"
        },
        {
          key: "新丰县",
          value: "440233",
          parent: "440200"
        },
        {
          key: "乐昌市",
          value: "440281",
          parent: "440200"
        },
        {
          key: "南雄市",
          value: "440282",
          parent: "440200"
        }
      ]
    ],
    options2: ["男", "女"],
    options4: [
      { key: "前端开发工程师", value: 0 },
      { key: "后端开发工程师", value: 1 },
      { key: "测试工程师", value: 2 },
      { key: "UI设计师", value: 3 },
      { key: "高级算法工程师", value: 4 }
    ],
    options3: [
      [
        {
          key: "前端",
          value: "0"
        },
        {
          key: "后端",
          value: "1"
        }
      ],
      [
        {
          key: "Javascript",
          value: "2",
          parent: "0"
        },
        {
          key: "css3",
          value: "3",
          parent: "0"
        },
        {
          key: "html5",
          value: "4",
          parent: "0"
        },
        {
          key: "Java",
          value: "5",
          parent: "1"
        },
        {
          key: "PHP",
          value: "6",
          parent: "1"
        },
        {
          key: "Python",
          value: "7",
          parent: "1"
        }
      ]
    ],
    currentValue: null,
  },
  onLoad: function(options) {},
  handleSelect(e) {
    console.log(e);
  },
  setcurrent1() {
    this.setData({
      currentValue: ['1', '6'],
    })
  },
  setcurrent2() {
    this.setData({
      currentValue: [0, 2],
    })
  },
  setcurrent3() {
    this.setData({
      currentValue: ['1', '5'],
    })
  },
};

registerShareEvent(pageOptions);

Page(pageOptions);
