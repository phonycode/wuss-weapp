/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-08-31 15:30:11 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2019-01-26 15:53:34
 */
import WussComponent from '../common/extends/baseComponent';

WussComponent({

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
    },
    desc: {
      type: String,
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
