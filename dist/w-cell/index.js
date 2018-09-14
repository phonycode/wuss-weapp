/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-04 16:36:16 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-14 10:49:02
 */
Component({
  externalClasses: [
    'wuss-class',
    'wuss-class-cell',
    'wuss-class-hd',
    'wuss-class-content',
    'wuss-class-ft',
    'wuss-class-left',
  ],
  relations: {
    '../w-cell-group/index': {
      type: 'ancestor',
    },
  },
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   * @param {string} label  标题
   * @param {string} labelSpan  标题宽度可选值1-5
   * @param {string} content 内容
   * @param {string} desc   附加描述
   * @param {string} isLink 是否是链接 开启后显示右边箭头
   * @param {string} link   isLink为true时,link为跳转的url
   * @param {string} icon   标题图标
   * @param {string} iconSize  图标大小
   * @param {string} iconColor   图标颜色
   * @param {number} delta   当linkType值为 navigateBack 时有效，表示返回页面层数
   * @param {string} linkType  跳转类型，类型有 [navigateTo/redirectTo/switchTab/reLaunch/navigateBack]
   * @param {boolean} disabled  禁用cell
   * @param {boolean} highlight  开启hover class
   */
  properties: {
    label: {
      type: String,
      value: '',
    },
    labelSpan: {
      type: Number,
      value: 2,
    },
    content: {
      type: String,
      valie: '',
    },
    desc: {
      type: String,
      valie: '',
    },
    isLink: {
      type: Boolean,
      value: false,
    },
    link: {
      type: String,
      valie: '',
    },
    icon: {
      type: String,
      valie: '',
    },
    iconSize: {
      type: String,
      valie: '',
    },
    iconColor: {
      type: String,
      valie: '',
    },
    delta: {
      type: Number,
      value: 1,
    },
    linkType: {
      type: String,
      value: 'navigateTo',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    highlight: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    /**
     * cell点击跳转事件
     */
    linkTo() {
      const { isLink, link, linkType, delta, disabled } = this.data;
      const navigateMethods = [
        'navigateTo',
        'redirectTo',
        'switchTab',
        'reLaunch',
      ];
      if (disabled) return false;
      this.triggerEvent('click', {}, {});
      if (!isLink || !link) return false;
      if (!linkType) throw Error('linkType 不能为空');
      if (navigateMethods.indexOf(linkType) > -1) {
        if (!link) throw Error('link 不能为空');
        wx[linkType].call(wx, {
          url: link,
        });
      } else if (linkType === 'navigateBack') {
        if (isNaN(Number(delta)))
          throw Error('linkType 类型为 navigateBack 时，delta必须为数字');
        wx[linkType].call(wx, {
          delta,
        });
      } else {
        throw Error('无法匹配当前的 linkType 类型，请检查填写是否正确！');
      }
    },
  },
});
