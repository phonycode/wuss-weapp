/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-08-30 17:12:04 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2019-01-26 15:51:37
 */
import WussComponent from '../common/extends/baseComponent';

WussComponent({
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
      value: '',
    },
    color: {
      type: String,
      value: '',
    },
  },
});
