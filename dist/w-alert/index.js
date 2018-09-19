/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-10 16:03:51 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-19 08:23:24
 */
import Behavior from '../common/behavior/index';

const OPTIONS = {
  title: '',
  content: '',
  maskClose: false,
  buttonColor: '#333333',
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
        ...OPTIONS,
        ...opts,
      });
    },
  },
});
