/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-06 14:22:37 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-07 11:17:56
 */
const PATH = '../w-tabs/index';
Component({
  externalClasses: ['wuss-class'],
  /**
   * 组件的属性列表
   * @param {boolean} disabled 是否禁用
   * @param {string} title  对应标题
   * @param {boolean} icon icon类型
   * @param {string} iconSize icon大小
   * @param {string} iconColor icon颜色
   */
  properties: {
    disabled: Boolean,
    title: {
      type: String,
      observer: function() {
        const tabs = this.getRelationNodes(PATH)[0];
        tabs && tabs.setLine();
      },
    },
    icon: {
      type: String,
      value: '',
    },
    iconSize: {
      type: String,
      value: '',
    },
    iconColor: {
      type: String,
      value: '',
    },
  },
  relations: {
    [PATH]: {
      type: 'ancestor',
    },
  },
  data: {
    show: false,
    mounted: false,
  },
});
