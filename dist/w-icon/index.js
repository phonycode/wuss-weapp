/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-08-30 17:12:04 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-19 08:17:19
 */
Component({
  externalClasses: ['wuss-class'],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   * @param {string} type 图标类型
   * @param {string} size 图标大小
   * @param {string} color 图标颜色
   */
  properties: {
    type: {
      type: String,
      value: '',
    },
    size: {
      type: String,
      value: '40',
    },
    color: {
      type: String,
      value: '#333333',
    },
  },
});
