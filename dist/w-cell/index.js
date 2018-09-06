/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-04 16:36:16 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-06 09:38:12
 */
Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'],

  /**
   * 组件间关系定义
   */
  relations: {
    '../w-cell-group/index': {
      type: 'parent',
    },
  },

  /**
   * 组件选项
   */
  options: {
    multipleSlots: true,
  },

  /**
   * 组件的属性列表
   * @param {string} title  标题
   * @param {string} desc   描述
   * @param {string} link   跳转的url，当存在值时显示右边箭头
   * @param {string} icon   标题图标
   * @param {string} iconSize  图标大小
   * @param {string} iconColor   图标颜色
   * @param {number} delta   当linkType值为 navigateBack 时有效，表示返回页面层数
   * @param {string} linkType  跳转类型，类型有 [navigateTo/redirectTo/switchTab/reLaunch/navigateBack]
   */
  properties: {
    title: {
      type: String,
      valie: '',
    },
    desc: {
      type: String,
      valie: '',
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
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件方法列表
   */
  methods: {
    /**
     * 更新第一个cell是否有虚线
     */
    updateFistCell() {
      this.setData({
        firstCell: true
      });
    },
    /**
     * cell点击跳转事件
     */
    linkTo() {
      const {
        linkType,
        link,
        delta,
      } = this.data;
      const navigateMethods = [
        'navigateTo',
        'redirectTo',
        'switchTab',
        'reLaunch',
      ];
      if (!linkType) throw Error('linkType 不能为空');
      this.triggerEvent('click', {}, {});
      if (navigateMethods.indexOf(linkType) > -1) {
        if (!link) throw Error('link 不能为空');
        wx[linkType].call(wx, {
          url: link,
        });
      } else if (linkType === 'navigateBack') {
        if (isNaN(Number(delta))) throw Error('linkType 类型为 navigateBack 时，delta必须为数字');
        wx[linkType].call(wx, {
          delta,
        });
      } else {
        throw Error('无法匹配当前的 linkType 类型，请检查填写是否正确！');
      }
    },
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function () {},

  /**
   * 组件布局完成后执行
   */
  ready: function () {},

  /**
   * 在组件实例进入页面节点树时执行
   */
  attached: function () {},

  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
  moved: function () {},

})