/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-10 16:03:51 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-10-20 12:01:07
 */
import Behavior from '../common/behavior/index';

/**
 * @param {string} title 标题
 * @param {string} content 内容
 * @param {boolean} maskClose 点击遮罩层是否可关闭
 * @param {string} buttonColor 按钮颜色
 * @param {function} confirm 确定按钮回调
 */

const DEFAULT_OPTIONS = {
  title: '',
  content: '',
  maskClose: false,
  buttonColor: '#ff9900',
  confirm: () => {},
};

Component({
  externalClasses: ['wuss-class'],
  options: {
    addGlobalClass: true,
  },
  behaviors: [Behavior],
  data: {
    _visible: false,
  },
  methods: {
    _handleClick() {
      const { confirm } = this.data;
      this.setData({
        _visible: false,
      });
      if (confirm) {
        confirm();
      }
    },
    alert(opts) {
      const { _visible } = this.data;
      if (_visible) return false;
      this.setData({
        _visible: true,
        ...DEFAULT_OPTIONS,
        ...opts,
      });
    },
  },
});
