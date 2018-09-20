/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-08-31 15:30:11 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-19 08:27:04
 */
Component({
  externalClasses: ['wuss-class'],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   * @param {string} title 标题
   * @param {string} desc 描述
   * @param {number} tsize 标题文字大小
   * @param {number} dsize 描述文字大小
   */
  properties: {
    title: {
      type: String,
      value: '',
    },
    desc: {
      type: String,
      value: '',
    },
    tsize: {
      type: Number,
      value: 18,
    },
    dsize: {
      type: Number,
      value: 14,
    },
  },
});
